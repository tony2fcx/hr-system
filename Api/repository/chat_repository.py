from Api.models.chat_model import ChatMessage
from Api.models.users_model import User



def save_message(db, manager_id, sender_id, message):

    chat = ChatMessage(
        manager_id=manager_id,
        sender_id=sender_id,
        message=message
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat


def get_team_messages(db, manager_id):

    return db.query(
        ChatMessage.id,
        ChatMessage.message,
        ChatMessage.created_at,
        ChatMessage.sender_id,
        User.name.label("sender_name")
    ).join(
        User,
        ChatMessage.sender_id == User.id
    ).filter(
        ChatMessage.manager_id == manager_id
    ).order_by(ChatMessage.created_at.asc()).all()
