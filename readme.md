## project title 
 - HR Management System (HRMS)

## Project Overview
- This project is a full-stack HR Management System built using FastAPI (backend) and Angular (frontend).  
- It helps manage employees, tasks, attendance, and communication in an organization.
- The frontend and backend are integrated and run on a single port for simplicity.


## Features

- User login (HR, Manager, Employee)
- Role-based dashboard
- Task assignment (Manager → Employees)
- Attendance tracking (Check-in / Check-out)
- Real-time chat using WebSocket
- Notification system
- Secure authentication using JWT

## Technologies
- Backend: FastAPI, SQLAlchemy, MySQL
- Frontend: Angular
- Other: WebSocket, JWT Authentication
- Tools: VS Code, Git


## Project Structure (Simple)
HRMS_Project/
│
├── Api/ # FastAPI backend
├── web/ # Angular frontend
│ └── dist/ # Built Angular files
├── main.py # Entry point
├── requirements.txt # Python dependencies
└── README.md

## Setup

1. Clone the project

git clone <your-repo-url>
cd HRMS_Project

2. Install backend dependencies
pip install -r requirements.txt

3. Setup database
Create a MySQL database
Update database credentials in your backend config

## Run
1. Build Angular frontend
cd web
ng build
2. Run FastAPI server
uvicorn Api.main:app --reload
3. Open browser
http://127.0.0.1:8000


## API

All APIs use /api prefix.

Examples:

/api/auth/login → User login
/api/tasks/ → Task management
/api/attendance/ → Attendance
/api/chat/ → Chat system
/api/notifications/ → Notifications

* Important:

1. Use correct HTTP methods (GET, POST, PUT, DELETE)
2. URL and prefix must match frontend


## Modules
1. Authentication
Login with email and password
JWT token-based authentication
Role-based access control

2. Task Management
Manager can create and assign tasks
Multiple employees per task
Task tracking

3. Attendance
Daily check-in and check-out
View present and absent users

4. Chat System
Real-time messaging using WebSocket
Team communication

5. Notification System
Notifications for tasks and messages
Mark as read feature

## Status
Backend: Completed and working
Frontend: Integrated and running
Chat and notifications: Working
Minor UI improvements pending

