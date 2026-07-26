from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.questions import models, schemas


router = APIRouter()


@router.post("", response_model=schemas.QuestionRead)
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    new_question = models.Question(**question.model_dump())
    db.add(new_question)
    db.commit()
    db.refresh(new_question)
    return new_question

@router.get("", response_model=list[schemas.QuestionRead])
def list_questions(db: Session = Depends(get_db)):
    return db.query(models.Question).all()
