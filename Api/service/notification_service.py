from Api.models.notification import Notification
from Api.repository.notification_repo import create_notification, get_user_notifications

def create_notification_service(db, user_id, message):
    notification = Notification(
        user_id=user_id,
        message=message
    )

    return create_notification(db, notification)


def get_notifications_service(db, user_id):
    return get_user_notifications(db, user_id)