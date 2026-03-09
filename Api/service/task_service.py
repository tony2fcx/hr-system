from fastapi import HTTPException, UploadFile,status
from datetime import datetime
from sqlalchemy.orm import Session
from Api.models.task_model import Task
from Api.models.task_assignment_model import TaskAssignment
from Api.models.users_model import User
from Api.schemas.task_schema import Taskcreate,TaskUpdate
from Api.repository.task_repository import create_task,get_task_by_id,update_task_fields,delete_task,update_task_status,assign_task_to_employees,get_employees_by_ids

def create_task_service(db: Session, task_data: Taskcreate, current_user: dict):

    if current_user["role"] != "manager":
        raise HTTPException(status_code=403, detail="Only manager can assign tasks")

    employees = get_employees_by_ids(db, task_data.assigned_to)

    if not employees:
        raise HTTPException(status_code=404, detail="Employee not found")

    for emp in employees:
        if emp.manager_id != current_user["user_id"]:
            raise HTTPException(
                status_code=403,
                detail="Employee not under this manager"
            )

    task = Task(
        title=task_data.title,
        description=task_data.description,
        assigned_by=current_user["user_id"],
        deadline=task_data.deadline
    )

    task = create_task(db, task)

    assign_task_to_employees(db, task.id, task_data.assigned_to)

    return {"message": "Task created successfully"}


#update task
def update_task_service(
    db: Session,
    task_id: int,
    task_data: TaskUpdate,
    current_user: dict
):
    task = get_task_by_id(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Only manager who created the task can update
    if task.assigned_by != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    # Update only provided fields
    if task_data.title is not None:
        task.title = task_data.title

    if task_data.description is not None:
        task.description = task_data.description

    if task_data.deadline is not None:
        task.deadline = task_data.deadline

    return update_task_fields(db, task)

#delete task
def delete_task_service(
    db: Session,
    task_id: int,
    current_user: dict
):
    task = get_task_by_id(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Only manager who created task can delete
    if task.assigned_by != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized")

    delete_task(db, task)

    return {"message": "Task deleted successfully"}


def get_tasks_by_role_service(db: Session, current_user: dict):

    role = current_user["role"]
    user_id = current_user["user_id"]

    if role == "employee":

        assignments = db.query(TaskAssignment).filter(
            TaskAssignment.employee_id == user_id
        ).all()

        task_ids = [a.task_id for a in assignments]

        tasks = db.query(Task).filter(Task.id.in_(task_ids)).all()

    elif role == "manager":

        tasks = db.query(Task).filter(Task.assigned_by == user_id).all()

    elif role == "hr":

        tasks = db.query(Task).all()

    response = []

    for task in tasks:

        assignments = db.query(TaskAssignment).filter(
            TaskAssignment.task_id == task.id
        ).all()

        employee_ids = [a.employee_id for a in assignments]

        response.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "assigned_by": task.assigned_by,
            "assigned_to": employee_ids,
            "deadline": task.deadline,
            "status": task.status
        })

    return response



def update_task_status_service(db: Session, task_id: int, status: str):
    task = get_task_by_id(db, task_id)

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Business logic
    task.status = status
    task.updated_at = datetime.utcnow()

    return update_task_status(db, task)

