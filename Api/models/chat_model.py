from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime
from Api.database import Base

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)

    manager_id = Column(Integer, ForeignKey("users.id"))   
    sender_id = Column(Integer, ForeignKey("users.id"))    
    message = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)