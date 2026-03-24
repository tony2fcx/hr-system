from Api.models.notification import Notification

def create_notification(db, notification):
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification


def get_user_notifications(db, user_id):
    return db.query(Notification).filter(
        Notification.user_id == user_id
    ).order_by(Notification.created_at.desc()).all()