from langsmith import traceable
from pydantic import BaseModel, Field
from langchain_core.output_parsers import PydanticOutputParser
from langchain_core.prompts import ChatPromptTemplate

class SummaryModel(BaseModel):
    summary: str = Field(
        ...,
        description="A concise summary capturing the main ideas and overall meaning of the content."
    )

@traceable(name="blog_summarization_pipeline")
async def summry_ai(model, text: str) -> SummaryModel | None:
    if not text or not text.strip():
        return None

    # 1. Initialize the Pydantic parser
    parser = PydanticOutputParser(pydantic_object=SummaryModel)

    # 2. Build template incorporating parser formatting instructions
    template = (
        "You are a professional content summarization engine.\n"
        "Provide a concise summary of the provided content inside <content>.\n\n"
        "{format_instructions}"
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", template),
        ("human", "Summarize this content:\n\n<content>\n{text}\n</content>")
    ])

    # Partial the format instructions into the prompt template
    prompt_and_parser = prompt.partial(format_instructions=parser.get_format_instructions())
    chain = prompt_and_parser | model | parser

    try:
        # Invokes model and automatically parses the output into SummaryModel via parser
        result = await chain.ainvoke({"text": text})
        return result
    except Exception:
        return None