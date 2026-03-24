from fastapi import APIRouter, Depends,HTTPException
from sqlalchemy.orm import Session
from Api.database import get_db
from Api.models.notification import Notification
from Api.core.security import get_current_user
from Api.service.notification_service import get_notifications_service,create_notification_service


router = APIRouter(prefix="/notify",tags=["Task Management"])

@router.post("/create")
def create_notification(user_id: int, message: str, db: Session = Depends(get_db)):
    return create_notification_service(db, user_id, message)


@router.get("/my-notifications")
def my_notifications(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    return get_notifications_service(db, current_user["user_id"])


@router.put("/read/{notification_id}")
def mark_read(
    notification_id: int,
    db: Session = Depends(get_db)
):
    notification = db.query(Notification).filter(
        Notification.id == notification_id
    ).first()

    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    notification.is_read = True
    db.commit()

    return {"message": "Notification marked as read"}