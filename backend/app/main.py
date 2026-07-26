from fastapi import FastAPI

from app.core.config import settings
from app.core.health import router as health_router
from app.core.database import Base, db

from app.questions.router import router as questions_router
from app.questions import models as question_models

from app.study_plan.router import router as studies_router
from app.study_plan import models as study_plan_models

from app.users import models as user_models

from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=db)

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    # cobre localhost/127.0.0.1 em qualquer porta: o Vite pula pra 5174, 5175...
    # se a porta padrão já estiver ocupada, então travar num único valor quebra
    # o CORS toda vez que isso acontece.
    allow_origin_regex=r"^http://(localhost|127\.0\.0\.1):\d+$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(questions_router, prefix="/questions", tags=["Questões"])
app.include_router(studies_router, prefix="/study_plan", tags=["Plano de Estudos"])