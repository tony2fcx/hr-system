from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Api.database import get_db
from Api.core.security import require_role
from Api.schemas.task_schema import Taskcreate,TaskUpdate,Taskresponse,TaskStatusUpdate
from Api.service.task_service import create_task_service,update_task_service,delete_task_service,get_tasks_by_role_service,update_task_status_service


router = APIRouter(
    prefix="/tasks",
    tags=["Task Management"]
)


@router.post("/create")
def create_task(
    task_data: Taskcreate,
    db: Session = Depends(get_db),
    current_user = Depends(require_role("manager"))
):
    return create_task_service(db, task_data, current_user)



@router.put("/update/{task_id}")
def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(require_role("manager"))
):
    return update_task_service(db, task_id, task_data, current_user)


@router.delete("/delete/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_role("manager"))
):
    return delete_task_service(db, task_id, current_user)


@router.get("/view", response_model=list[Taskresponse])
def get_tasks(
    db: Session = Depends(get_db),
    current_user = Depends(require_role(["employee", "manager", "hr"]))
):
    return get_tasks_by_role_service(db, current_user)


@router.put("/update-status/{task_id}")
def update_task_status_route(
    task_id: int,
    request: TaskStatusUpdate,
    db: Session = Depends(get_db)
):
    return update_task_status_service(db, task_id, request.status)