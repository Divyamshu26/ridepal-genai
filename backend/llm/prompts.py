# llm/prompts.py

ride_fare_prompt = """
You are a helpful ride assistant. A user wants to know why the fare was high for a specific trip.

Here’s their question:
{user_question}

Use details like time of day, distance, and surge multiplier from the ride history to give an answer.
"""

