from sqlalchemy.orm import Session
from sqlalchemy import func,and_
from datetime import date
from Api.models.users_model import User
from Api.models.attendence_model import Attendance


def get_today_attendance(db: Session, user_id: int):
    today = date.today()

    return db.query(Attendance).filter(
        Attendance.user_id == user_id,
        func.date(Attendance.check_in) == today
    ).first()


def create_attendance(db: Session, user_id: int):
    attendance = Attendance(
        user_id=user_id
    )
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance


def update_checkin(db: Session, attendance: Attendance):
    db.commit()
    db.refresh(attendance)
    return attendance


def get_all_attendance(db: Session, selected_date=None):
    if not selected_date:
        selected_date = date.today()

    return (
        db.query(
            User.id,
            User.name,
            User.role,
            Attendance.check_in,
            Attendance.check_out
        )
        .join(
            Attendance,
            and_(
                Attendance.user_id == User.id,
                func.date(Attendance.check_in) == selected_date   
            )
        )
        .filter(
            User.role.in_(["employee", "manager"]),
            User.is_active == True
        )
        .all()
    )


def get_team_attendance(db, manager_id):
    today = date.today()

    data = (
        db.query(
            User.id,
            User.name,
            User.role,
            Attendance.check_in,
            Attendance.check_out
        )
        .outerjoin( 
            Attendance,
            and_(
                Attendance.user_id == User.id,
                func.date(Attendance.check_in) == today
            )
        )
        .filter(User.manager_id == manager_id, User.is_active == True)
        .all()
    )

    return data

