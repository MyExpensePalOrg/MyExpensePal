import requests

from Services.ChatAPI import detect_intent_and_extract_data, answer_general_query
from Models.ModelResponse import ModelResponse


def get_response_for_general_query(query, timestamp, userId):
    headers = {
        "userId": userId
    }
    # TODO Write an API which is can bring most data with min size.
    all_expenses = requests.get(url="http://localhost:8082/expense/tenLatestTransactions", headers=headers)
    return answer_general_query(all_expenses.content, query, timestamp)


def save_the_expense(modelResponse, userId):
    headers = {
        "userId": userId
    }
    out = requests.post(url="http://localhost:8082/expense/saveExpense", json=modelResponse.data.__dict__,
                        headers=headers)
    return out.content


def get_matching_data(modelResponse, userId):
    headers = {
        "userId": userId
    }
    try:
        out = requests.get(url="lb://MY-EXPENSE-PAL/expense/getMatchingEntities", json=modelResponse.__dict__,
                       headers=headers)
    except:
        return "Failed to get matching data"
    return out.content


def extract_data(expense_query, userId):
    response: ModelResponse = detect_intent_and_extract_data(expense_query.query, expense_query.timestamp)
    if response.intent == "generalQuery":
        general_query_response = get_response_for_general_query(expense_query.query, expense_query.timestamp,
                                                                userId)
        response.data = general_query_response
    elif response.intent == "updateExpense":
        # TODO call API and get matching data
        matching_list = get_matching_data(response.existing_data, userId)
        response.existing_data = matching_list
    elif response.intent == "deleteExpense":
        # TODO call APi get matching data
        matching_list = get_matching_data(response.data, userId)
        response.data = matching_list
    elif response.intent == "OutOfContext":
        response.data = "Your question is out of context. Please ask chat related to your expense."
    return response


def proceed_for_cud(modelResponse, userId):
    if modelResponse.intent == "addExpense":
        return save_the_expense(modelResponse, userId)
    elif modelResponse.intent == "updateExpense":
        # TODO update the expense
        # return update_the_model(modelResponse.data, userId)
        pass
    elif modelResponse.intent == "deleteExpense":
        # TODO delete expense
        # delete_the_expense(modelResponse.data.)
        return "TODO: Delete Expense"
    else:
        return "unable to process the request."
