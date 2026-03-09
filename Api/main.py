from fastapi import FastAPI
from Api.database import engine,Base
from Api.routes.users_router import router as user_route
from Api.routes.attendence_router import router as attendence_route
from Api.routes.task_router import router as task_route
from Api.routes.chat_router import router as chat_route
from Api.routes.notification_router import router as notify_route
from fastapi.middleware.cors import CORSMiddleware
from Api.models import attendence_model
from Api.models import task_model
from Api.models import chat_model
from Api.models import notification
from fastapi.staticfiles import StaticFiles


app=FastAPI()

Base.metadata.create_all(bind=engine)  #for automatic table creation
# print(Base.metadata.tables.keys())

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

app.include_router(user_route)
app.include_router(attendence_route)
app.include_router(task_route)
app.include_router(chat_route)
app.include_router(notify_route)