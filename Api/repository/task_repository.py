from sqlalchemy.orm import Session
from Api.models.task_model import Task
from Api.schemas.task_schema import Taskcreate,TaskUpdate,TaskStatusUpdate,TaskStatus
from datetime import datetime


    # CREATE TASK
    
def create_task(db:Session,task_data:Taskcreate):
    print("✅ Repository Hit")
    task = Task(

        title = task_data.title,
        description = task_data.description,
        assigned_to = task_data.assigned_to,
        assigned_by = task_data.assigned_by,
        deadline = task_data.deadline
        )
    print("✅ Before add")
    db.add(task)
    print("✅ Before Commit")
    db.commit()
    print("✅ After Commit")
    db.refresh(task)
    return task
    # UPDATE TASK
def update_task(db:Session,task_id:int,task_data):
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return None
        if task_data.title is not None:
            task.title = task_data.title
        if task_data.description is not None:
            task.description = task_data.description
        if task_data.assigned_to is not None:
            task.assigned_to = task_data.assigned_to
        if task_data.assigned_by is not None:
            task.assigned_by = task_data.assigned_by
        if task_data.deadline is not None:
            task.deadline = task_data.deadline
        if task_data.status is not None:
            task.status = task_data.status

            # always update updated_up
        task.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(task)
        return task
        # DELETE TASK
def delete_task(db:Session,task_id:int):
        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return None
        db.delete(task)
        db.commit()
        return task
    # VIEW TASK
def get_all_tasks(db:Session):
        task = db.query(Task).all()
        return task
    
    # UPDATED STATUS ONLY
def update_task_status(db:Session,task_id:int,status:str):
        task = db.query(Task).filter(Task.id == task_id).first()
        if task is None:
            return None
        task.status = status
        task.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(task)
        return task
def get_tasks_by_status(db: Session, status: TaskStatus):
        tasks = db.query(Task).filter(Task.status == status).all()
        return tasks