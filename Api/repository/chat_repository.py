from Api.models.chat_model import ChatMessage


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

    return db.query(ChatMessage).filter(
        ChatMessage.manager_id == manager_id
    ).all()