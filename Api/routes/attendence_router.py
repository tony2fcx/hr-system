from Api.core.security import require_role
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from Api.database import get_db
from Api.service.attendence_service import check_in_service,check_out_service,hr_view_all_attendence,manager_team_service

router = APIRouter(prefix="/attendance", tags=["Auth"])
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
  
  
#ATTENDANCE REPORT 
# HR → View all
@router.get("/hr/all")
def hr_view_all(
    db: Session = Depends(get_db),
    current_user = Depends(require_role(["hr"]))
):
    return hr_view_all_attendence(db)

#view team attendenc only for managers  
# Manager → Team
@router.get("/manager/team")
def manager_team(
    db: Session = Depends(get_db),
    current_user = Depends(require_role(["manager"]))
):
    return manager_team_service(db, current_user["user_id"])

