from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

class User(Base):
    __tablename__ = "users"

    id        = Column(Integer, primary_key=True, index=True)
    email     = Column(String, unique=True, index=True, nullable=False)
    hashed_pw = Column(String, nullable=False)
    is_admin  = Column(Boolean, default=False)
