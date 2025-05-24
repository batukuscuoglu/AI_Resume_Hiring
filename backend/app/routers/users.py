from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from .. import crud, schemas, database

router = APIRouter()

@router.post("/", response_model=schemas.UserOut)
async def signup(
    user: schemas.UserCreate,
    db: AsyncSession = Depends(database.get_db)
):
    if await crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    return await crud.create_user(db, user)
