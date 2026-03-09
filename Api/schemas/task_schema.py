from pydantic import BaseModel
from datetime import date,datetime
from typing import Optional
from enum import Enum


#   CREATE TASK
class TaskStatus(str,Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class Taskcreate(BaseModel):
    title:str
    description:str
    assigned_to:list[int]
    deadline:date

class Taskresponse(BaseModel):
    id:int
    title:str
    description:str
    assigned_to:list[int]
    assigned_by:int
    deadline:date
    status:TaskStatus
    
    class Config:
        from_attributes = True


# UPDATED TASK

class TaskUpdate(BaseModel):
    title : Optional[str] = None
    description : Optional[str] = None
    assigned_to : Optional[str] = None
    assigned_by : Optional[str] = None
    deadline : Optional[datetime] = None
    status : Optional[str] = None

class TaskStatusUpdate(BaseModel):
    status:TaskStatus    
    