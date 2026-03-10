from fastapi import APIRouter, Depends, UploadFile, File, Form,HTTPException
from sqlalchemy.orm import Session
from Api.schemas.users_schema import UserCreate,LoginSchema,AssignEmployees,EmployeeProfileUpdate,RefreshSchema
from Api.database import get_db
from Api.service.users_service import (register_user,authenticate_user,refresh_user_token,
user_logout,get_all_managers_service,get_all_employees_service,assign_employees_service,hr_view_all_teams_service,
update_employee_profile_service,remove_employee_team_service,delete_full_team)

from pydantic import ValidationError
from Api.core.security import require_role,get_current_user
from Api.models.users_model import User


router = APIRouter(prefix="/auth", tags=["Auth"])
@router.post("/register")
async def hr_register(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form(...),
    phone: str = Form(...),
    profile_image: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    try:
        user_data = UserCreate(
            name=name,
            email=email,
            password=password,
            role=role,
            phone=phone,
            profile_image=profile_image.filename
        )
    except ValidationError as e:
        raise HTTPException(status_code=422,detail=e.errors()[0]["msg"]
)

    return register_user(
        db,
        user_data.name,
        user_data.email,
        user_data.password,
        user_data.role,
        user_data.phone,
        profile_image
    )



@router.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    return authenticate_user(
        db=db,
        email=data.email,
        password=data.password
    )    


@router.post("/refresh")
def refresh(data:RefreshSchema,  db: Session = Depends(get_db)):
    return refresh_user_token(db, data.refresh_token)

@router.post("/create-manager")
async def manager_register(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form(...),
    phone: str = Form(...),
    profile_image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(require_role("hr"))
):

   
    try:
        user_data = UserCreate(
            name=name,
            email=email,
            password=password,
            role=role,
            phone=phone,
            profile_image=profile_image.filename
        )
    except ValidationError as e:
        raise HTTPException(status_code=422,detail=e.errors()[0]["msg"]
)

    return register_user(
        db,
        user_data.name,
        user_data.email,
        user_data.password,
        user_data.role,
        user_data.phone,
        profile_image
    )

@router.post("/create-employee")
async def employee_register(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    role: str = Form(...),
    phone: str = Form(...),
    profile_image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(require_role("hr"))
):

    try:
        user_data = UserCreate(
            name=name,
            email=email,
            password=password,
            role=role,
            phone=phone,
            profile_image=profile_image.filename
        )
    except ValidationError as e:
        raise HTTPException(status_code=422,detail=e.errors()[0]["msg"]
)

    return register_user(
        db,
        user_data.name,
        user_data.email,
        user_data.password,
        user_data.role,
        user_data.phone,
        profile_image
    )


@router.get("/managers")
def get_all_managers(
    db: Session = Depends(get_db),
    current_user = Depends(require_role("hr"))
):
    return get_all_managers_service(db)


@router.get("/employees")
def get_all_employees(
    db: Session = Depends(get_db),
    current_user = Depends(require_role("hr"))
):
    return get_all_employees_service(db)


@router.post("/assign-employees")
def assign_employees(
    data: AssignEmployees,
    db: Session = Depends(get_db),
    current_user = Depends(require_role("hr"))
):
    return assign_employees_service(db, data)

@router.get("/hr/all-teams")
def hr_view_all_teams(
    db: Session = Depends(get_db),
    current_user = Depends(require_role("hr"))
):
    return hr_view_all_teams_service(db)


@router.get("/my-employees")
def get_my_employees(
    db: Session = Depends(get_db),
    current_user = Depends(require_role("manager"))
):
    return db.query(User).filter(
        User.manager_id == current_user["user_id"]
    ).all()

@router.get("/own-profiles")
def get_my_profile(
    db: Session = Depends(get_db),
    current_user = Depends(require_role(["employee", "manager", "hr"]))
):
    user = db.query(User).filter(
        User.id == current_user["user_id"]
    ).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@router.delete("/delete-user/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_role("hr"))
):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    
    user.is_active = False
    db.commit()

    return {"message": "User deactivated successfully"}


@router.post("/logout")
def logout(refresh_token: str, db: Session = Depends(get_db)):
    return user_logout(db, refresh_token)


@router.put("/update-profile")
def update_employee_profile(
    name: str = Form(None),
    email:str = Form(None),
    phone: str = Form(None),
    profile_image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user = Depends(require_role(["employee", "manager","hr"]))
):
    profile_data = EmployeeProfileUpdate(
        name=name,
        email=email,
        phone=phone
    )

    return update_employee_profile_service(
        db=db,
        user_id=current_user["user_id"],
        profile_data=profile_data,
        profile_image=profile_image
    )



@router.put("/remove-employee/{employee_id}")
def remove_employee_team_route(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["hr","manager"]))
):
    return remove_employee_team_service(employee_id, db)




@router.put("/delete-team/{manager_id}")
def delete_team(
    manager_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["hr"]))
):
    return delete_full_team(manager_id, db)


@router.get("/me")
def get_current_user_data(current_user = Depends(get_current_user)):
    return current_user