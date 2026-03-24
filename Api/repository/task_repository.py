from sqlalchemy.orm import Session
from Api.models.task_model import Task
from Api.models.users_model import User
from Api.models.task_assignment_model import TaskAssignment



def create_task(db: Session, task_data: Task):
        db.add(task_data)
        db.commit()
        db.refresh(task_data)
        return task_data

def get_employees_by_ids(db: Session, employee_ids: list):
    return db.query(User).filter(User.id.in_(employee_ids)).all()


def assign_task_to_employees(db: Session, task_id: int, employee_ids: list):
    for emp_id in employee_ids:
        assignment = TaskAssignment(
            task_id=task_id,
            employee_id=emp_id
        )
        db.add(assignment)

    db.commit()


def get_task_by_id(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()


def get_manager_employees(db: Session, manager_id: int):
    return db.query(User).filter(
        User.manager_id == manager_id
    ).all()

def update_task_fields(db: Session, task: Task):
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task: Task):
    db.query(TaskAssignment).filter(
        TaskAssignment.task_id == task.id
    ).delete()

    
    db.delete(task)
    db.commit()
    return True


def update_task_status(db: Session, task: Task):
    db.commit()
    db.refresh(task) 
    return task   