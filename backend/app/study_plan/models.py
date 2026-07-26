from app.core.database import Base
from sqlalchemy import Column, Integer, Float, String, Boolean, ForeignKey


class StudyCycle(Base):
    __tablename__ = "study_cycles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    weekly_hours = Column(Float)
    daily_hours = Column(Float)
    total_exam_questions = Column(Integer)


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    is_active = Column(Boolean, default=True)
    question_count = Column(Integer)
    study_cycle_id = Column(Integer, ForeignKey("study_cycles.id"))
