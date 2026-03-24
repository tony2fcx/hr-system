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

    if not attendance:
        attendance = create_attendance(db, user_id)

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


def hr_view_all_attendence(db, selected_date=None, role=None):
    data = get_all_attendance(db, selected_date)   

    result = []

    for row in data:

        if role and role != "all":
            if row.role.lower() != role.lower():
                continue

        status = "Present" if row.check_in else "Absent"

        result.append({
            "user_id": row.id,
            "name": row.name,
            "role": row.role,
            "check_in": row.check_in,
            "check_out": row.check_out,
            "status": status
        })

    return result

def manager_team_service(db, manager_id: int):
    data = get_team_attendance(db, manager_id)

    result = []

    for row in data:

        if row.check_in:
            status = "Present"
        else:
            status = "Absent"

        result.append({
            "user_id": row.id,
            "name": row.name,
            "role":row.role,
            "check_in": row.check_in,
            "check_out": row.check_out,
            "status": status
        })

    return result



