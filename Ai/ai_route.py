from fastapi import APIRouter, Depends, status
from pydantic import BaseModel, Field


# Import your AI pipeline functions
from ai_service.summary_pipeline import summry_ai, SummaryModel
from ai_service.grammar_pipeline import grammar_fix_ai, GrammarFixModel
from model import model 

router = APIRouter(prefix="/api/ai", tags=["AI Services"])

# Incoming Request Schemas for the endpoints
class TextPayload(BaseModel):
    text: str = Field(..., description="The raw text content to be processed by the AI pipeline.")


@router.post(
    "/summarize", 
    response_model=SummaryModel, 
    status_code=status.HTTP_200_OK,
    summary="Summarize Blog/Content"
) 
async def summarize_endpoint(payload: TextPayload) -> SummaryModel | dict:    
    try:
        result: SummaryModel | None = await summry_ai(model=model, text=payload.text)
        if result:
            return result
        else:
            return {
                "Error_Type": "error at model invokcation or empty input",
                "suggeston": "retry"
            }
    except Exception as e:
        return {
            "Error_Type": str(e),
            "suggeston": "retry bro"
        }
    

@router.post(
    "/grammar-fix", 
    response_model=GrammarFixModel, 
    status_code=status.HTTP_200_OK,
    summary="Fix Grammar and Spelling"
)
async def grammar_fix_endpoint(payload: TextPayload) -> GrammarFixModel | dict:
    try:
        result = await grammar_fix_ai(model=model, text=payload.text)
        if result:
            return result
        else:
            return {
                "Error_Type": "error at model invokcation or empty input",
                "suggeston": "retry"
            }
    except Exception as e:
        return {
            "Error_Type": str(e),
            "suggeston": "retry bro"
        }