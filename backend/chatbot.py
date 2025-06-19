# # chatbot.py

# from llm.prompts import ride_fare_prompt
# import pandas as pd
# import os
# from openai import OpenAI
# from dotenv import load_dotenv

# load_dotenv()
# openai_key = os.getenv("OPENAI_API_KEY")

# def answer_fare_question(user_question, df):
#     from openai import OpenAI
#     import openai

#     openai.api_key = openai_key

#     context = df.to_string(index=False)
#     full_prompt = ride_fare_prompt.format(user_question=user_question) + f"\n\nRide History:\n{context}"

#     response = openai.ChatCompletion.create(
#         model="gpt-4",
#         messages=[{"role": "user", "content": full_prompt}],
#         max_tokens=300
#     )

#     return response['choices'][0]['message']['content']

# chatbot.py (Gemini version)
# chatbot.py

# chatbot.py (Gemini API v1 fix)

import os
import google.generativeai as genai
from dotenv import load_dotenv
import pandas as pd
from llm.prompts import ride_fare_prompt

load_dotenv()

# Set up Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel(model_name="gemini-1.5-flash-001")  # NO 'models/' prefix needed in v1

def answer_fare_question(user_question, df):
    context = df.to_string(index=False)
    full_prompt = ride_fare_prompt.format(user_question=user_question) + f"\n\nRide History:\n{context}"

    try:
        response = model.generate_content(full_prompt)
        return response.text.strip()
    except Exception as e:
        return f"Gemini error: {e}"
