from typing import Optional
from sqlalchemy import select, func
from sqlalchemy.orm import aliased, selectinload
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from Python_backend.all_schemas.schemas import PostCreateSchema
from Python_backend.db_related.db_tables import CommentTable, PostTable
from sqlalchemy.orm import joinedload #eager loader instead of lazyload


async def create_post_service(user_id: int, db: AsyncSession, new_post: PostCreateSchema) -> dict:
    try:
        post = PostTable(user_id=user_id, **new_post.model_dump()) #Adding data to db's this table btw!
        #you may ask dont u trust? the incoming data? how u litrally unpack to db?
        #ans) well bro, PostCreateSchema makes sure that data is of the time i mentiouined! ctrl+click it ;)
        
        db.add(post)

        await db.commit()
        await db.refresh(post)
        result = await db.execute(
            select(PostTable)
            .options(joinedload(PostTable.owner))
            .where(PostTable.post_id == post.post_id))


        post_with_owner = result.scalar_one()
        

        return {
            "success": True,
            "data": post_with_owner,
            "error_code": None,
            "error_message": None
        }

    except SQLAlchemyError as e:
        await db.rollback()
        
        return {
            "success": False,
            "data": None,
            "error_code": "DATABASE_ERROR",
            "error_message": "Database operational failure. Verify data formats and sizes."
        }

    except Exception as e:
        await db.rollback()
        

        return {
            "success": False,
            "data": None,
            "error_code": "UNKNOWN_ERROR",
            "error_message": "Unexpected server error."
        }
    
async def fetch_post_by_id_service(db: AsyncSession, post_id: int) -> dict:

    try:
        stmt = (
            select(PostTable)
            .options(selectinload(PostTable.owner))
            .where(PostTable.post_id == post_id)
        )

        result = await db.execute(stmt)
        post = result.scalar_one_or_none()

        if post is None:
            return {
                "success": False,
                "data": None,
                "error_code": "RESOURCE_NOT_FOUND",
                "error_message": "Post not found."
            }

        return {
            "success": True,
            "data": post,
            "error_code": None,
            "error_message": None
        }

    except SQLAlchemyError:
        return {
            "success": False,
            "data": None,
            "error_code": "DATABASE_ERROR",
            "error_message": "Database query failed."
        }

    except Exception:
        return {
            "success": False,
            "data": None,
            "error_code": "UNKNOWN_ERROR",
            "error_message": "Unexpected server error."
        }


async def fetch_random_posts_service(db: AsyncSession) -> dict:
    try:
        stmt = (
            select(PostTable)
            .order_by(func.random())
            .limit(10)
        )

        result = await db.execute(stmt)
        posts = result.scalars().all()

        return {
            "success": True,
            "data": posts,
            "error_code": None,
            "error_message": None
        }

    except Exception:
        return {
            "success": False,
            "data": None,
            "error_code": "DATABASE_ERROR",
            "error_message": "Failed to fetch posts."
        }
