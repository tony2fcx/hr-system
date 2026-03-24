import os

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
from fastapi.responses import FileResponse


app=FastAPI()



Base.metadata.create_all(bind=engine)  

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)
FRONTEND_PATH = "web/dist/web/browser"


app.include_router(user_route, prefix="/api")
app.include_router(attendence_route, prefix="/api")
app.include_router(task_route, prefix="/api")
app.include_router(chat_route, prefix="/api")
app.include_router(notify_route, prefix="/api")


@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):

    file_path = os.path.join(FRONTEND_PATH, full_path)

    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)
    return FileResponse(os.path.join(FRONTEND_PATH, "index.html"))