from fastapi import FastAPI
from Api.database import engine,Base
from Api.routes.users_router import router as user_route
from Api.routes.attendence_router import router as attendence_route
from fastapi.middleware.cors import CORSMiddleware
from Api.models import attendence_model
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