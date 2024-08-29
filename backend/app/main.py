import os
from typing import Callable

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def create_app() -> FastAPI:
    load_dotenv()

    from notebook.router import router as notebook_router

    app = FastAPI()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=os.getenv("FASTAPI_ALLOW_ORIGINS", "").split(","),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(notebook_router, prefix="/notebook", tags=["notebook"])

    return app


app = create_app()


def run_app(app_factory: Callable[[], FastAPI]) -> None:
    import uvicorn

    uvicorn.run(
        app_factory(),
        host="0.0.0.0",
        port=int(
            os.getenv("FASTAPI_PORT", "8000"),
        ),
        ssl_keyfile=os.getenv("FASTAPI_SSL_KEYFILE"),
        ssl_certfile=os.getenv("FASTAPI_SSL_CERTFILE"),
    )


if __name__ == "__main__":
    run_app(create_app)
