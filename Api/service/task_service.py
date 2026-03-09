from fastapi import HTTPException,status
from sqlalchemy.orm import Session
from Api.repository.task_repository import create_task,update_task
from Api.schemas.task_schema import Taskcreate
from Api.database import get_db

class TaskService:
    
   
    def create_task(db:Session,task_data:Taskcreate):
       
        return create_task(
            db = db,
            task_data = task_data
           )


    def update_task_service(db,task_id,task_data):
        return update_task(db,task_id,task_data)
    