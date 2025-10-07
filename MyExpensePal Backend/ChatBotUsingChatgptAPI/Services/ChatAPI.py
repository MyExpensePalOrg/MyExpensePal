from openai import OpenAI
import json

from Models.ModelResponse import ModelResponse

# Set your OpenAI API key
client = OpenAI(
    api_key="")


def detect_intent_and_extract_data(query, timestamp):
    with open('../Prompts/prompt2.txt', 'r') as file:
        prompt_template = file.read()
    prompt = prompt_template.format(query=query, timestamp=timestamp)
    response = client.responses.create(
        model="gpt-4o",  # Change this to the appropriate model name if needed
        input=prompt
    )
    modelResponse = json.loads(response.output_text.strip("```json").strip("```"))
    return ModelResponse.model_validate_json(json.dumps(modelResponse))


def answer_general_query(expense_list, query, timestamp):
    with open('../Prompts/general_query_prompt.txt', 'r') as file:
        prompt_template = file.read()
    prompt = prompt_template.format(expense_list=expense_list, query=query, timestamp=timestamp)
    response = client.responses.create(
        model="gpt-4o",  # Change this to the appropriate model name if needed
        input=prompt
    )
    return response.output_text
    # modelResponse = json.loads(response.output_text.strip("```json").strip("```"))
    # return ModelResponse.model_validate_json(json.dumps(modelResponse))


# query = "I realized I paid $20 for the pizza last week, but I think I actually spent $25, can you change that?"
# query = "I ate pizza yesterday, it cost 20 dollars"
# timestamp = "2025-03-16T12:00:00Z"
#
# response = detect_intent_and_extract_data(query, timestamp)
# print("Response:", response)
