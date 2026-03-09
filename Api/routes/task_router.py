from fastapi  import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from Api.database import get_db
from Api.service.task_service import TaskService 

from Api.schemas.task_schema import Taskcreate,Taskresponse,TaskUpdate,TaskStatusUpdate,TaskStatus
from Api.repository.task_repository import create_task,delete_task,get_all_tasks,update_task_status,get_tasks_by_status


task_router = APIRouter(prefix="/tasks",tags=["Tasks"])
@task_router.post("/create",response_model = Taskresponse)
def create_task(
    task_data:Taskcreate,
    db:Session = Depends(get_db),
   
    ):
    
   
    return TaskService .create_task(
        db = db,
        task_data = task_data,
    
    )


@task_router.put("/update/{task_id}")
def update_task(task_id:int,task:TaskUpdate,db:Session = Depends(get_db)):
    updated_task = TaskService.update_task_service(db,task_id,task)
    if not updated_task:
        raise HTTPException(statuscode = 404,detail = "task not found")
    return{
        "message":"task updated successfully",
        "data":updated_task
    }

@task_router.delete("/delete/{task_id}")
def delete_task_route(task_id:int,db:Session = Depends(get_db)):
    deleted_task = delete_task(db,task_id)
    if deleted_task is None:
        raise
    HTTPException(status_code = 404,detail = "task not found")
    return {"message":"Task deleted successfully"}

@task_router.get("/view",response_model = list[Taskresponse])
def get_all_tasks_route(db:Session = Depends(get_db)):
    tasks = get_all_tasks(db)
    return tasks

    

@task_router.put("/status/{task_id}",response_model = Taskresponse)
def update_task_status_route(
    task_id:int,status_update:TaskStatusUpdate,
    db:Session = Depends(get_db)
):
    updated_task = update_task_status(db,task_id,status_update.status)
    if updated_task is None:
        raise HTTPException(status_code = 404,detail = "Task not found")
    return updated_task
@task_router.get("/", response_model=list[Taskresponse])
def get_tasks(
    status: TaskStatus,
    db: Session = Depends(get_db)
):
    tasks = get_tasks_by_status(db, status)
    return tasks
    