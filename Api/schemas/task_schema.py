from pydantic import BaseModel
from datetime import date
from datetime import datetime
from enum import Enum
from typing import Optional
from Api.models.task_model import TaskStatus
        #   CREATE TASK

class TaskStatusUpdate(BaseModel):
    status:TaskStatus

class Taskcreate(BaseModel):
    title:str
    description:str
    assigned_to:int
    assigned_by: int
    deadline:date

class Taskresponse(BaseModel):
    id:int
    title:str
    description:str
    assigned_to:int
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

