from fastapi import FastAPI

from app.core.config import settings
from app.core.health import router as health_router
from app.questions.router import router as questions_router
from app.study_plan.router import router as studies_router

app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(health_router)
app.include_router(questions_router, prefix="/questions", tags=["Questões"])
app.include_router(studies_router, prefix="/studies", tags=["Estudos"])