from fastapi import APIRouter, Depends, UploadFile, File, Form,HTTPException
from sqlalchemy.orm import Session
from Api.schemas.users_schema import UserCreate,LoginSchema,AssignEmployees
from Api.database import get_db
from Api.service.users_service import (register_user,authenticate_user,refresh_user_token,
                        user_logout,get_all_managers_service,get_all_employees_service,assign_employees_service,hr_view_all_teams)


from pydantic import ValidationError
from Api.core.security import require_role
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
def refresh(refresh_token: str, db: Session = Depends(get_db)):
    return refresh_user_token(db, refresh_token)


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
def hr_view_all_teams_members(
    db: Session = Depends(get_db),
    current_user = Depends(require_role("hr"))
):
    return hr_view_all_teams(db)



@router.get("/my-employees")
def get_my_employees(
    db: Session = Depends(get_db),
    current_user = Depends(require_role("manager"))
):
    return db.query(User).filter(
        User.manager_id == current_user["user_id"]
    ).all()


@router.get("/me-employee")#to see prfile own each employee
def get_me_employee(
    db: Session = Depends(get_db),
    current_user = Depends(require_role("employee"))
):
    employee = db.query(User).filter(
        User.id == current_user["user_id"],
        User.role == "employee"
    ).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return employee



@router.get("/me-manager")#view own in each manager profile
def get_me_manager(
    db: Session = Depends(get_db),
    current_user = Depends(require_role("manager"))
):
    manager = db.query(User).filter(
        User.id == current_user["user_id"],
        User.role == "manager"
    ).first()

    if not manager:
        raise HTTPException(status_code=404, detail="Manager not found")

    return manager


@router.delete("/delete-user/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(require_role("hr"))
):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}


@router.post("/logout")
def logout(refresh_token: str, db: Session = Depends(get_db)):
    return user_logout(db, refresh_token)

