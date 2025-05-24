import bcrypt
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from . import models, schemas

async def get_user_by_email(db: AsyncSession, email: str):
    result = await db.execute(select(models.User).where(models.User.email == email))
    return result.scalar_one_or_none()

async def create_user(db: AsyncSession, user: schemas.UserCreate):
    hashed = bcrypt.hashpw(user.password.encode(), bcrypt.gensalt()).decode()
    db_user = models.User(email=user.email, hashed_pw=hashed)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user
