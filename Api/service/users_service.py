import os
import uuid
import shutil
from fastapi import HTTPException, UploadFile,status
from sqlalchemy.orm import Session
from Api.models.users_model import User
from Api.core.security import hash_password,verify_password,verify_refresh_token,create_access_token,create_refresh_token
from Api.repository.users_repository import (create_user,get_user_by_email,get_refresh_token,update_refresh_token,delete_refresh_token,
save_refresh_token,get_users_by_role,get_manager_by_id,get_employees_by_ids,assign_manager_to_employees,get_managers_by_role,get_employees_by_manager,
get_user_by_id,update_user,remove_employee_team,delete_team)


def register_user(db: Session,name: str,email: str,password: str,role: str,phone: str,profile_image: UploadFile):

        if get_user_by_email(db, email):
            raise HTTPException(status_code=400, detail="Email already exists")
        
        os.makedirs("uploads", exist_ok=True)

        file_extension = profile_image.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = f"uploads/{unique_filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(profile_image.file, buffer)

        user = User(
            name=name,
            email=email,
            password_hash=hash_password(password),
            role=role,
            phone=phone,
            profile_image=file_path
        )
        return create_user(db, user)


def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)

    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "role": user.role
        }
    )

    refresh_token = create_refresh_token(
        data={
            "sub": str(user.id),
            "role": user.role
        }
    )


    save_refresh_token(db, user.id, refresh_token)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "role":user.role,
        "token_type": "bearer"
    }


def refresh_user_token(db: Session, refresh_token: str):

    payload = verify_refresh_token(refresh_token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token"
        )

    db_token = get_refresh_token(db, refresh_token)

    if not db_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session revoked. Please login again."
        )

    user_id = payload.get("sub")
    role = payload.get("role")

    new_access = create_access_token(
        data={
            "sub": user_id,
            "role": role
        }
    )

    new_refresh = create_refresh_token(
        data={
            "sub": user_id,
            "role": role
        }
    )

    update_refresh_token(db, db_token, new_refresh)

    return {
        "access_token": new_access,
        "refresh_token": new_refresh,
        "token_type": "bearer"
    }


def get_all_managers_service(db: Session):
    return get_users_by_role(db, "manager")


def get_all_employees_service(db: Session):
    return get_users_by_role(db, "employee")

def assign_employees_service(db: Session, data):
    manager = get_manager_by_id(db, data.manager_id)

    if not manager:
        raise HTTPException(status_code=404, detail="Manager not found")

    employees = get_employees_by_ids(db, data.employee_ids)

    if not employees:
        raise HTTPException(status_code=404, detail="Employees not found")

    assign_manager_to_employees(db, manager.id, employees)

    return {"message": "Employees assigned successfully"}


def hr_view_all_teams_service(db):
    managers = get_managers_by_role(db)

    result = []

    for manager in managers:
        employees = get_employees_by_manager(db, manager.id)

        result.append({
            "manager_id": manager.id,
            "manager_name": manager.name,
            "team_members": [
                {
                    "employee_id": emp.id,
                    "employee_name": emp.name
                }
                for emp in employees
            ]
        })
    return result


def user_logout(db: Session, refresh_token: str):
    db_token = get_refresh_token(db, refresh_token)
    if not db_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid session or already logged out"
        )
    delete_refresh_token(db, db_token)

    return {"message": "User successfully logged out"}


def update_employee_profile_service(
    db: Session,
    user_id: int,
    profile_data,
    profile_image: UploadFile | None = None
):
    employee = get_user_by_id(db, user_id)

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    if profile_data.name is not None:
        employee.name = profile_data.name

    if profile_data.email is not None:
        employee.email = profile_data.email

    if profile_data.phone is not None:
        employee.phone = profile_data.phone

    if profile_image:

        os.makedirs("uploads", exist_ok=True)

        if employee.profile_image and os.path.exists(employee.profile_image):
            os.remove(employee.profile_image)

        file_extension = profile_image.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = f"uploads/{unique_filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(profile_image.file, buffer)

        employee.profile_image = file_path

    return update_user(db, employee)


def remove_employee_team_service(employee_id: int, db):
    employee = remove_employee_team(db, employee_id)

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Employee removed from team"}


def delete_full_team(manager_id: int, db):
    employees = delete_team(db, manager_id)

    return {
        "message": "Team deleted successfully",
        "employees_updated": len(employees)
    }