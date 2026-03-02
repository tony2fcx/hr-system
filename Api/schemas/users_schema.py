from pydantic import BaseModel, EmailStr,field_validator
import re

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: str  # only HR can set manager/employee
    phone: str
    profile_image: str

    @field_validator("password")
    @classmethod
    def validate_passwords(cls,value):
        
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")

        if not any(c.isdigit() for c in value):
            raise ValueError("Password must contain at least one number")

        if not any(c.isupper() for c in value):
            raise ValueError("Password must contain one uppercase letter")
        
        if not any(c.islower() for c in value):
            raise ValueError("Password must contain one lowercase letter")
        
         #Special character check
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise ValueError("Password must contain at least one special character")


        return value
    

    #phn validation
    @field_validator("phone")
    @classmethod 
    def validate_phone(cls, value): 
        pattern = r"^[0-9]{10}$" 
        if not re.match(pattern, value): 
            raise ValueError("Phone number must be 10 digits")
        return value
         
         
    #image validation
    @field_validator("profile_image") 
    @classmethod #Required decorator for Pydantic v2 validators.
    def validate_image(cls, value): 
        allowed_extensions = (".jpg", ".jpeg", ".png")
        if not value.lower().endswith(allowed_extensions): 
            raise ValueError("Profile image must be .jpg, .jpeg, or .png")
        return value
    

class LoginSchema(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    phone: str
    profile_image: str
    created_at: str

    class Config:    #it convert object to json
        from_attributes = True
      
 
class AssignEmployees(BaseModel):
    manager_id: int
    employee_ids: list[int]
    