from langsmith import traceable
from pydantic import BaseModel, Field
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate


class GrammarFixModel(BaseModel):
    corrected_text: str = Field(
        ...,
        description="The text with all grammar mistakes, typos, and spelling errors fixed while keeping the original phrasing and style intact."
    )

@traceable(name="grammar_fix_pipeline")
async def grammar_fix_ai(model, text: str) -> GrammarFixModel:
    if not text or not text.strip():
        return None

    # 1. Initialize the Pydantic parser
    parser = PydanticOutputParser(pydantic_object=GrammarFixModel)

    # 2. Build template incorporating parser formatting instructions
    template = (
        "You are a precise grammar and spelling correction assistant.\n"
        "Your task is to fix only grammatical errors, typos, and spelling mistakes in the provided text.\n"
        "Keep the original wording, tone, and sentence structure as close to the original as possible. Do not rewrite or paraphrase.\n\n"
        "{format_instructions}"
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", template),
        ("human", "Fix the grammar and spelling of this text:\n\n<content>\n{text}\n</content>")
    ])

    # Partial the format instructions into the prompt template
    prompt_and_parser = prompt.partial(format_instructions=parser.get_format_instructions())
    chain = prompt_and_parser | model | parser

    try:
        result = await chain.ainvoke({"text": text})
        return result
        
    except Exception:
        return None