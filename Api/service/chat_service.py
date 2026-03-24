from Api.repository.chat_repository import save_message, get_team_messages

def store_message_service(db, manager_id, sender_id, message):

    return save_message(db, manager_id, sender_id, message)


def get_team_chat_service(db, manager_id):
    return get_team_messages(db, manager_id)