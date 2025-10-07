from typing import Optional
from uuid import UUID
from pydantic import BaseModel


class ExpenseModel(BaseModel):
    expenseId: Optional[UUID] = None
    expenseName: Optional[str] = None
    expense: Optional[int] = None
    expenseType: Optional[str] = None
    location: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    transactionType: Optional[str] = None
