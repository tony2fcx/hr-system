from sqlalchemy import Column, Integer, String, DateTime,func,ForeignKey,Boolean
from sqlalchemy.orm import relationship
from Api.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(20), nullable=False)  
    phone = Column(String(20), nullable=True)
    profile_image = Column(String(255), nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    manager_id = Column(Integer, ForeignKey("users.id"), nullable=True) 
    is_active = Column(Boolean, default=True)
    
    user_refresh_token = relationship("UserRefreshToken", back_populates="user") 
    manager = relationship("User", remote_side=[id], backref="employees")