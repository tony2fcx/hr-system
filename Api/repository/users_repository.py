from sqlalchemy.orm import Session
from Api.models.users_model import User
from Api.models.refresh_token import UserRefreshToken


def get_user_by_email(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user: User):
        db.add(user)
        db.commit()
        db.refresh(user)
        return user


def save_refresh_token(db: Session, user_id: int, token: str):
    db_token = UserRefreshToken(
        user_id=user_id,
        token=token
    )
    db.add(db_token)
    db.commit()
    return db_token


def get_refresh_token(db: Session, token: str):
    return db.query(UserRefreshToken).filter(
        UserRefreshToken.token == token
    ).first()


def update_refresh_token(db: Session, db_token, new_token: str):
    db_token.token = new_token
    db.commit()
    return db_token


def delete_refresh_token(db: Session, db_token):
    db.delete(db_token)
    db.commit()


def get_users_by_role(db: Session, role: str):
    return db.query(User).filter(User.role == role).all()    


def get_manager_by_id(db: Session, manager_id: int):
    return db.query(User).filter(
        User.id == manager_id,
        User.role == "manager"
    ).first()



def get_employees_by_ids(db: Session, employee_ids: list[int]):
    return db.query(User).filter(
        User.id.in_(employee_ids),
        User.role == "employee"
    ).all()


def assign_manager_to_employees(db: Session, manager_id: int, employees: list[User]):
    for emp in employees:
        emp.manager_id = manager_id

    db.commit()


def get_managers_by_role(db: Session):
    return db.query(User).filter(User.role == "manager").all() 


def get_employees_by_manager(db: Session, manager_id: int):
    return db.query(User).filter(
        User.manager_id == manager_id
    ).all()    