from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.study_plan import models, schemas

router = APIRouter()


# ---------- Study Cycles ----------

@router.post("/cycles", response_model=schemas.StudyCycleRead)
def create_study_cycle(study_cycle: schemas.StudyCycleCreate, db: Session = Depends(get_db)):
    new_study_cycle = models.StudyCycle(**study_cycle.model_dump())
    db.add(new_study_cycle)
    db.commit()
    db.refresh(new_study_cycle)
    return new_study_cycle


@router.get("/cycles", response_model=list[schemas.StudyCycleRead])
def list_study_cycles(db: Session = Depends(get_db)):
    return db.query(models.StudyCycle).all()


@router.get("/cycles/{study_cycle_id}", response_model=schemas.StudyCycleRead)
def get_study_cycle(study_cycle_id: int, db: Session = Depends(get_db)):
    study_cycle = db.query(models.StudyCycle).filter(models.StudyCycle.id == study_cycle_id).first()
    if study_cycle is None:
        raise HTTPException(status_code=404, detail="Ciclo de estudos não encontrado")
    return study_cycle


# ---------- Subjects ----------

@router.post("/subjects", response_model=schemas.SubjectRead)
def create_subject(subject: schemas.SubjectCreate, db: Session = Depends(get_db)):
    study_cycle = db.query(models.StudyCycle).filter(models.StudyCycle.id == subject.study_cycle_id).first()
    if study_cycle is None:
        raise HTTPException(status_code=404, detail="Ciclo de estudos não encontrado")

    new_subject = models.Subject(**subject.model_dump())
    db.add(new_subject)
    db.commit()
    db.refresh(new_subject)
    return new_subject


@router.get("/subjects", response_model=list[schemas.SubjectRead])
def list_subjects(study_cycle_id: int | None = None, db: Session = Depends(get_db)):
    query = db.query(models.Subject)
    if study_cycle_id is not None:
        query = query.filter(models.Subject.study_cycle_id == study_cycle_id)
    return query.all()


@router.get("/subjects/{subject_id}", response_model=schemas.SubjectRead)
def get_subject(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
    if subject is None:
        raise HTTPException(status_code=404, detail="Matéria não encontrada")
    return subject
