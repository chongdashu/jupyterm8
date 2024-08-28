from typing import Annotated

from fastapi import APIRouter, Query
from fastapi.responses import PlainTextResponse
from starlette.concurrency import run_in_threadpool

from .processor import process_notebook

router = APIRouter()


@router.get("/parse-notebook", response_class=PlainTextResponse)
async def parse_notebook(url: Annotated[str, Query(description="URL of the Jupyter notebook")]) -> str:
    result = await run_in_threadpool(process_notebook, url)
    return result
