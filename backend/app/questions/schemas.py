from pydantic import BaseModel, ConfigDict

class QuestionCreate(BaseModel):
    statement: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str

class QuestionRead(BaseModel):
    id: int
    statement: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str

    model_config = ConfigDict(from_attributes=True)