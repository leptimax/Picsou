"""Main module"""
import os

import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import (
    get_redoc_html,
    get_swagger_ui_html,
    get_swagger_ui_oauth2_redirect_html,
)
from fastapi.responses import Response
from fastapi.staticfiles import StaticFiles

from app.api.api import api_router

ENV = os.environ.get("API_ENV")

if ENV == "DEV":
    app = FastAPI(
        docs_url=None,
        redoc_url=None,
        openapi_url="/api/openapi.json",
        title="Picsou",
        description="Picsou",
        version=os.environ.get("API_VERSION", "1.0.0"),
    )
    app.mount("/api/static", StaticFiles(directory="static"), name="static")


    @app.get("/api/docs", include_in_schema=False)
    async def custom_swagger_ui_html():
        """
        Get Swagger doc
        :return: HTML Page
        """
        return get_swagger_ui_html(
            openapi_url=app.openapi_url,
            title=app.title + " - Swagger UI",
            oauth2_redirect_url="/api" + app.swagger_ui_oauth2_redirect_url,
            swagger_js_url="/api/static/swagger-ui-bundle.js",
            swagger_css_url="/api/static/swagger-ui.css",
            swagger_favicon_url="#",
        )


    @app.get(app.swagger_ui_oauth2_redirect_url, include_in_schema=False)  # type:ignore
    async def swagger_ui_redirect():
        """
        Redirect to Swagger HTML page
        :return: HTML Page
        """
        return get_swagger_ui_oauth2_redirect_html()


    @app.get("/api/redoc", include_in_schema=False)
    async def redoc_html():
        """
        Redoc Swagger page
        :return: HTML Page
        """
        return get_redoc_html(
            openapi_url=app.openapi_url,
            title=app.title + " - Redoc",
            redoc_js_url="/api/static/redoc.standalone.js",
            redoc_favicon_url="#",
        )


else:
    app = FastAPI(
        docs_url=None,
        redoc_url=None,
        openapi_url=None,
        title="Babar",
        description="Babar",
        version=os.environ.get("API_VERSION", "1.0.0"),
    )

origins = ["http://localhost", "http://frontend:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def exception_handler(_: Request, exc: Exception) -> Response:
    """
    Handle default exceptions
    :param _: Request data
    :param exc: exception that occurred
    :return: HTTP 500 Internal Server Error
    """
    return Response(status_code=500)


@app.get("/api")
async def root() -> Response:
    """
    Health check
    :return: HTTP Response with app status
    """
    return Response(status_code=200)


app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",  # nosec
        reload=ENV == "DEV",
        port=842,
    )
