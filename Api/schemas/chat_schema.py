from pydantic import BaseModel
from datetime import datetime


class ChatMessageCreate(BaseModel):
    manager_id: int
    sender_id: int
    message: str


class ChatMessageResponse(BaseModel):
    id: int
    manager_id: int
    sender_id: int
    message: str
    created_at: datetime

    class Config:
        from_attributes = True