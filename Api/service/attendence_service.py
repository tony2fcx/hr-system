from datetime import datetime
from fastapi import HTTPException
from Api.repository.attendence_repository import (
    get_today_attendance,
    create_attendance,
    update_checkin,get_all_attendance,get_team_attendance
)


def check_in_service(db, user_id: int):

    attendance = get_today_attendance(db, user_id)

    if attendance and attendance.check_in:
        raise HTTPException(
            status_code=400,
            detail="Already checked in"
        )

    # If not exists → create default record
    if not attendance:
        attendance = create_attendance(db, user_id)

    # Common logic (single place)
    attendance.check_in = datetime.now()
    attendance.status = "Present"

    attendance = update_checkin(db, attendance)

    return {
        "message": "Check-in successful",
        "status": attendance.status,
        "time": attendance.check_in
    }


def check_out_service(db, user_id: int):

    attendance = get_today_attendance(db, user_id)

    if not attendance:
        raise HTTPException(
            status_code=400,
            detail="You must check-in first"
        )

    if attendance.check_out:
        raise HTTPException(
            status_code=400,
            detail="Already checked out"
        )

    attendance.check_out = datetime.now()

    db.commit()
    db.refresh(attendance)

    return {
        "message": "Check-out successful",
        "status": attendance.status,
        "time": attendance.check_out
    }

#ATTENDANCE REPORT SERVICES

def hr_view_all_attendence(db):
    data = get_all_attendance(db)

    return [
        {
            "user_id": row.id,
            "name": row.name,
            "role": row.role,
            "check-in": row.check_in,
            "check-out": row.check_out,
            "status": row.status
        }
        for row in data
    ]

def manager_team_service(db, manager_id: int):
    data = get_team_attendance(db, manager_id)

    return [
        {
            "user_id": row.id,
            "name": row.name,
            "check-in": row.check_in,
            "check-out": row.check_out,
            "status": row.status
        }
        for row in data
    ]



