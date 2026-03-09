from jose import JWTError,jwt
from datetime import datetime,timedelta
from fastapi import HTTPException,status,Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import get_db
from repository.users_repository import UserRepository

SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_schema = OAuth2PasswordBearer(tokenUrl = "auth/login")

def create_access_token(data:dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes = ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode,SECRET_KEY,algorithm = ALGORITHM)

def get_current_user(token:str = Depends(oauth2_schema),db:Session = Depends(get_db)):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms = [ALGORITHM])
        user_id:int = payload.get("tasks.id")
        user = UserRepository.get_user_by_id(db,user_id)
        if not user:
            raise
        HTTPException(status_code = 401,detail = "user not found" )
        return user
    except JWTError:
        raise
        HTTPException(status_code = 401,detail = "invalid token")