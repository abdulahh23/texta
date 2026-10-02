from fastapi import Request, Response, status, Depends, APIRouter
from Python_backend.Posting.posting_services import create_post_service, fetch_post_by_id_service, fetch_random_posts_service
from Python_backend.all_schemas.schemas import PostCreateSchema
from Python_backend.db_related.db import get_db
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession



router = APIRouter(prefix="/posts", tags=["Posts"])
@router.post("/create_new_post") 
async def create_post(new_post: PostCreateSchema,  user_id: int, db: AsyncSession = Depends(get_db)) -> dict:
    result: dict = await create_post_service(user_id=user_id, db=db, new_post=new_post)
    
    #i feel like i should give result to u since if error comes u should know what kind of.
    return result


@router.get("/get_post_by_id/{id}")
async def get_post_by_id(id: int, user_id: int, db: AsyncSession = Depends(get_db)) -> dict:  
    result: dict = await fetch_post_by_id_service(user_id=user_id, db=db, id=id)
    return result


@router.get("/get_random_posts")
async def get_random_posts(db: AsyncSession = Depends(get_db)):
    return await fetch_random_posts_service(db)