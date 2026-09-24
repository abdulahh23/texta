from fastapi import FastAPI, Response, status 
import os
import time 
import ai_route
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
load_dotenv()  





@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup actions run here BEFORE the app starts taking requests
    print("Application is booting up...")
    
    try:
        yield
    finally:
        # Tear down actions run here AFTER the app stops taking requests
        print("Application is shutting down...")

app = FastAPI(
    title="Social Network Aggregator API", 
    lifespan=lifespan
)







origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    "http://localhost:3000",
    "http://127.0.0.1:3000",

    "http://localhost:8080",
    "http://127.0.0.1:8080",

    "http://localhost:4200",
    "http://127.0.0.1:4200",

    "http://10.0.2.2:8000",  

    "https://www.yourdomain.com",
    "https://yourdomain.com",
    "https://staging.yourdomain.com",
]






app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"], #origins if only selected ones
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"], 
)


app.include_router(router=ai_route.router)
@app.get("/", status_code=status.HTTP_200_OK)
def root():
    return {"message": "Hello World"}



