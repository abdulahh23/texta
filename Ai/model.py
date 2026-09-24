from langchain_groq import ChatGroq
from config import settings
from langchain_groq import ChatGroq
from config import settings

# Initialize Model
model = ChatGroq(
    api_key=settings.api_key,   
    model=settings.model
)