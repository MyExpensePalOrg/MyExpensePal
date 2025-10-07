from pydantic import BaseModel

from Models.ExpenseModel import ExpenseModel


class ModelResponse(BaseModel):
    intent: str
    data: ExpenseModel
    existing_data: ExpenseModel = None
