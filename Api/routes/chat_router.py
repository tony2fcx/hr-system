from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends,Query
from sqlalchemy.orm import Session
from Api.database import get_db
from Api.models.users_model import User
from Api.models.chat_model import ChatMessage
from Api.core.connection_manager import manager
from Api.core.security import get_current_user
from Api.service.chat_service import store_message_service, get_team_chat_service
from Api.service.notification_service import create_notification_service
from datetime import datetime

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.websocket("/ws")
async def chat_socket(
    websocket: WebSocket,
    token: str = Query(...), 
    db: Session = Depends(get_db)
):

    user_data = get_current_user(token)

    user_id = user_data['user_id']
    role = user_data['role']

    if role == "manager":
        manager_id = user_id
    else:
        user = db.query(User).filter(User.id == user_id).first()
        manager_id = user.manager_id

    await manager.connect(manager_id, websocket)
    try:
        while True:

            data = await websocket.receive_json()
            if data["type"] == "typing":

                await manager.broadcast(
                    manager_id,
                    {
                        "type": "typing",
                        "user_id": user_id
                    }
                )
           
            if data["type"] == "chat":

                message = data["message"]

                saved_message = store_message_service(db, manager_id, user_id, message)

                sender = db.query(User).filter(User.id == user_id).first()
                sender_name = sender.name

                employees = db.query(User).filter(
                    User.manager_id == manager_id
                ).all()

                for emp in employees:
                    if emp.id != user_id:
                        create_notification_service(
                            db,
                            emp.id,
                            f"New message from {sender_name}"
                        )

        
                await manager.broadcast(
                    manager_id,
                    {
                        "type": "chat",
                        "sender_id": user_id,
                        "sender_name": sender_name,
                        "message": message,
                        "created_at": saved_message.created_at.isoformat()
                    }
                )

    except WebSocketDisconnect:
        manager.disconnect(manager_id, websocket)


@router.get("/history")
def get_team_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = current_user['user_id']
    role = current_user['role']

    if role == 'manager':
        manager_id = user_id
    else:
        user = db.query(User).filter(User.id == user_id).first()
        manager_id = user.manager_id


    messages = get_team_chat_service(db, manager_id)

    result = []

    for msg in messages:
        result.append({
            "sender_id": msg.sender_id,
            "sender_name": msg.sender_name,
            "message": msg.message,
            "created_at": msg.created_at.isoformat()
        })

    return result