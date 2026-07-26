from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
def study_plan_ping():
    return {"status": "ok"}

