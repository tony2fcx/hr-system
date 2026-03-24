from typing import Optional
from datetime import date
from Api.core.security import require_role
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Api.database import get_db
from Api.service.attendence_service import check_in_service,check_out_service,hr_view_all_attendence,manager_team_service
from Api.repository.attendence_repository import get_today_attendance as get_today_attendance_repo


router = APIRouter(prefix="/attendance", tags=["Attendance"])
@router.post("/check-in")
def check_in(
    db: Session = Depends(get_db),
    current_user = Depends(require_role(["employee", "manager"]))
):
    return check_in_service(db, current_user["user_id"])


@router.post("/check-out")
def check_out(
    db: Session = Depends(get_db),
    current_user = Depends(require_role(["employee", "manager"]))
):
    
      return check_out_service(db, current_user["user_id"])
  
  
@router.get("/hr/all")
def hr_view_all(
    selected_date: Optional[date] = None,
    role: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user = Depends(require_role(["hr"]))
):
    return hr_view_all_attendence(db,selected_date,role)


@router.get("/manager/team")
def manager_team(
    db: Session = Depends(get_db),
    current_user = Depends(require_role(["manager"]))
):
    return manager_team_service(db, current_user["user_id"])


@router.get("/today")
def get_today_attendance(
    db: Session = Depends(get_db),
    current_user = Depends(require_role(["employee", "manager"]))
):

    attendance = get_today_attendance_repo(db, current_user["user_id"])

    if not attendance:
        return {
            "check_in": None,
            "check_out": None,
            "status": "Absent"
        }

    return {
        "check_in": attendance.check_in,
        "check_out": attendance.check_out,
        "status": attendance.status
    }