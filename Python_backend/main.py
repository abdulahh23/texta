from fastapi import FastAPI
from Posting.posting_routes import router as posting_router
app = FastAPI()


app.include_router(posting_router)