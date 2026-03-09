from sqlalchemy import Column,Integer,String,Text,Date,DateTime,ForeignKey,Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from Api.database import  Base

class TaskStatus(str,enum.Enum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer,primary_key = True,index = True)
    title = Column(String(255),nullable = False)
    description = Column(Text,nullable = True)
    assigned_to = Column(Integer)
    assigned_by = Column(Integer)
    deadline = Column(Date,nullable = False)
    status = Column(Enum(TaskStatus),default = TaskStatus.PENDING)
    created_at = Column(DateTime,default = datetime.utcnow)
    updated_at = Column(DateTime,default = datetime.utcnow,onupdate = datetime.utcnow)
    