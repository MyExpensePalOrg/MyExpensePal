from pydantic import BaseModel


class UserInput(BaseModel):
    query: str
    timestamp: str
