import enum

from pydantic import BaseModel, Field, EmailStr, StringConstraints
from datetime import datetime
from typing import Annotated, Any, Optional, Literal, List, Union


class PostCreateSchema(BaseModel):
    title: str = Field(..., description="Title of the post", max_length=200)
    content: str = Field(..., description="Content of the post", max_length=5000)
    published: bool = Field(True, description="Public visibility status")




class UserCreateSchema(BaseModel):
    pass


class UserResponseSchema(BaseModel):
    email: EmailStr
    user_id: int 
    created_at: datetime
    model_config = {"from_attributes": True}
    


