from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from Api.models.users_model import User
from Api.database import get_db
from Api.service.chat_service import store_message_service,get_team_chat_service
from Api.service.notification_service import create_notification_service
from Api.core.connection_manager import manager

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.websocket("/ws/{manager_id}/{user_id}")
async def chat_socket(
    websocket: WebSocket,
    manager_id: int,
    user_id: int,
    db: Session = Depends(get_db)
):

    await manager.connect(manager_id, websocket)

    try:
        while True:

            data = await websocket.receive_text()

            # 1️⃣ Save chat message
            store_message_service(db, manager_id, user_id, data)

            # 2️⃣ Create notification in DB
            employees = db.query(User).filter(
                User.manager_id == manager_id
            ).all()

            for emp in employees:
                if emp.id != user_id:  # don't notify sender
                    create_notification_service(
                        db,
                        emp.id,
                        f"New message from user {user_id}"
                    )

            # 3️⃣ Send chat message to sender
            await manager.send_to_sender(
                websocket,
                {
                    "type": "chat",
                    "sender": user_id,
                    "message": data
                }
            )

            # 4️⃣ Send chat message to others
            await manager.broadcast(
                manager_id,
                {
                    "type": "chat",
                    "sender": user_id,
                    "message": data
                },
                exclude=websocket
            )

            # 5️⃣ Send notification only to others
            await manager.broadcast(
                manager_id,
                {
                    "type": "notification",
                    "message": f"New message from user {user_id}"
                },
                exclude=websocket
            )

    except WebSocketDisconnect:
        manager.disconnect(manager_id, websocket)
        

@router.get("/history/{manager_id}")
def get_team_history(
    manager_id: int,
    db: Session = Depends(get_db)
):
    return get_team_chat_service(db, manager_id)        