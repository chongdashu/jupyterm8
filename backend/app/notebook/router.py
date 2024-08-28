from typing import Annotated

from fastapi import APIRouter, Query
from fastapi.responses import JSONResponse, PlainTextResponse
from starlette.concurrency import run_in_threadpool

from .processor import process_and_store_notebook, process_notebook

router = APIRouter()


@router.get("/parse-notebook", response_class=PlainTextResponse)
async def parse_notebook(url: Annotated[str, Query(description="URL of the Jupyter notebook")]) -> str:
    result = await run_in_threadpool(process_notebook, url)
    return result


@router.get("/store-notebook", response_class=JSONResponse)
async def store_notebook(url: Annotated[str, Query(description="URL of the Jupyter notebook")]) -> JSONResponse:
    file_name, download_url = await run_in_threadpool(process_and_store_notebook, url)
    return JSONResponse(
        {
            "file_name": file_name,
            "download_url": download_url,
        }
    )
