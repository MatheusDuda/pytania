from fastapi import APIRouter

router = APIRouter()

@router.get("/ping")
def questions_ping():
    return {"status": "ok"}