from sqlalchemy.orm import Session
from sqlalchemy import func
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

#ATTENDANCE REPORT

# HR → Get all attendance
def get_all_attendance(db: Session):
    return db.query(
        User.id,
        User.name,
        User.role,
        Attendance.check_in,
        Attendance.check_out,
        Attendance.status
    ).join(Attendance, Attendance.user_id == User.id).all()


# Manager → Team attendance
def get_team_attendance(db: Session, manager_id: int):
    return db.query(
        User.id,
        User.name,
        Attendance.check_in,
        Attendance.check_out,
        Attendance.status
    ).join(Attendance, Attendance.user_id == User.id)\
     .filter(User.manager_id == manager_id)\
     .all()

