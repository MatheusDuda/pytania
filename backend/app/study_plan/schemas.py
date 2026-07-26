from pydantic import BaseModel, ConfigDict


class StudyCycleCreate(BaseModel):
    weekly_hours: float
    daily_hours: float
    total_exam_questions: int


class StudyCycleRead(BaseModel):
    id: int
    weekly_hours: float
    daily_hours: float
    total_exam_questions: int

    model_config = ConfigDict(from_attributes=True)


class SubjectCreate(BaseModel):
    name: str
    is_active: bool = True
    question_count: int
    study_cycle_id: int


class SubjectRead(BaseModel):
    id: int
    name: str
    is_active: bool
    question_count: int
    study_cycle_id: int

    model_config = ConfigDict(from_attributes=True)
