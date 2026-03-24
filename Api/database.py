from sqlalchemy import create_engine   
from sqlalchemy.orm import sessionmaker,declarative_base

DATABASE_URL = "mysql+pymysql://root:my_mysql@localhost:3306/hr_db"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine      
)

Base = declarative_base()  

def get_db():
    db = SessionLocal()
    print("DB OPENED")
    try:
        yield db
    finally:
        print("DB CLOSED")
        db.close()    
