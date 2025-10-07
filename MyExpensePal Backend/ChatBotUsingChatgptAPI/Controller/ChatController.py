from _datetime import datetime

import uvicorn
from fastapi import FastAPI, Header

from Models.ExpenseModel import ExpenseModel
from Models.UserInput import UserInput
from Models.ModelResponse import ModelResponse
from Services.ChatService import extract_data, proceed_for_cud

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow origins (your frontend's URL)
# origins = [
#     "http://localhost:3000",  # your React/Vue/Next frontend port
#     "http://127.0.0.1:3000"
# ]
#
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,          # allow specific origins
#     allow_credentials=True,
#     allow_methods=["*"],            # allow all methods (POST, GET, etc.)
#     allow_headers=["*", "Authorization", "Custom-Header"],  # allow specific headers
# )


@app.post("/chat/input_query")
async def extract_expense_data(expense_query: UserInput, userId: str = Header("userId")):
    # expensemodel: ExpenseModel = ExpenseModel(expenseName="pizza", expense=20, time="16:00:00")
    # expensemodel1: ExpenseModel = ExpenseModel(expenseName="pizza", expense=20, time="16:00:00")
    # expensemodel3: ExpenseModel = ExpenseModel(expenseName="pizza", expense=20, time="16:00:00")
    # l = [expensemodel, expensemodel1, expensemodel3]
    # modelResponse = ModelResponse(intent="deleteExpense", data=expensemodel)
    # modelResponse.data(l)
    # modelResponse.existing_data=l
    # return modelResponse
    expense_query.timestamp = datetime.utcnow().isoformat()
    return extract_data(expense_query, userId)


# No need for this method remove it
@app.get("/chat/user_confirmation/{confirmation}")
async def do_operation_if_user_confirms(confirmation: bool, modelResponse: ModelResponse,
                                        userId: str = Header("userId")):
    if confirmation:
        return proceed_for_cud(modelResponse, userId)
    else:
        # TODO return no changes are made
        return "No Changes made."




# @app.get("/")
# async def test():
#     return "test"
