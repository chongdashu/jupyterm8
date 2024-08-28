import os

from dotenv import load_dotenv
from fastapi import FastAPI
from notebook.router import router as notebook_router

app = FastAPI()
load_dotenv()

app.include_router(notebook_router, prefix="/notebook", tags=["notebook"])

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("FASTAPI_PORT", 8000)))
