# Task Management API

This module handles task management in the HR Management System.
It allows managers  to create, update, assign, and track tasks.

## Features

Create Task
Get All Tasks
Get Task By ID
Update Task
Update Task Status
Delete Task

## API Endpoints

POST /tasks
Create a new task.

GET /tasks
Get all tasks.

GET /tasks/{task_id}
Get task by ID.

PUT /tasks/{task_id}
Update task details.

PUT /tasks/{task_id}/status
Update task status.

DELETE /tasks/{task_id}
Delete a task.

## Technologies

FastAPI
SQLAlchemy
MySQL
Pydantic
  ## Run the Project

1. Create virtual environment

python -m venv .venv

2. Activate environment

.venv\Scripts\activate

3. Install dependencies

pip install -r requirements.txt

4. Run the server

uvicorn Api.main:app --reload
