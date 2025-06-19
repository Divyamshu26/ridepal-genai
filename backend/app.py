from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import datetime
import google.generativeai as genai
import re
from models import SessionLocal, ChatHistory

# Load your CSV
df = pd.read_csv('./data/ride.csv')

# Format date and time columns to datetime
df['datetime'] = pd.to_datetime(df['date'] + ' ' + df['time'], dayfirst=True, errors='coerce')
df = df.dropna(subset=['datetime'])

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Gemini API setup
genai.configure(api_key='YOUR_GEMINI_API_KEY')  # Replace with your actual API key
model = genai.GenerativeModel("models/gemini-1.5-flash")

# Utility: Find closest matching ride
def find_matching_ride(date_str, time_str):
    try:
        query_dt = datetime.datetime.strptime(f"{date_str} {time_str}", "%d/%m/%Y %I:%M:%S %p")
    except ValueError:
        return None

    df['time_diff'] = df['datetime'].apply(lambda x: abs((x - query_dt).total_seconds()))
    closest = df.loc[df['time_diff'].idxmin()]

    if closest['time_diff'] <= 300:  # 5 minutes
        return closest
    return None

# Route to handle ride query
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"response": "Please enter a message."}), 400

    matched_ride = None
    assistant_response = ""

    # Extract date and time
    date_match = re.search(r'(\d{2}/\d{2}/\d{4})', user_message)
    time_match = re.search(r'(\d{1,2}:\d{2}:\d{2}\s?(?:am|pm))', user_message, re.IGNORECASE)

    if date_match and time_match:
        date_str = date_match.group(1)
        time_str = time_match.group(1).upper()

        matched_ride = find_matching_ride(date_str, time_str)
        if matched_ride is not None:
            assistant_response = f"""Here's what I found for your ride on {date_str} at {time_str}:

- **Route:** {matched_ride['source']} → {matched_ride['destination']}
- **Distance:** {matched_ride['distance_km']} km
- **Time of Day:** {matched_ride['time_of_day']}
- **Surge Multiplier:** {matched_ride['surge_multiplier']}
- **Fare:** ₹{matched_ride['fare']}
- **Vehicle:** {matched_ride['vehicle_model']} ({matched_ride['vehicle_color']})
"""
        else:
            assistant_response = "I couldn't find a ride at that exact time. Please double-check the time or try a different one."
    else:
        # Fallback to Gemini
        gemini_response = model.generate_content(user_message)
        assistant_response = gemini_response.text.strip()

    # Save to database
    session = SessionLocal()
    history = ChatHistory(
        user_email=None,  # Will be updated with user system later
        user_message=user_message,
        assistant_response=assistant_response,
        matched_ride_id=int(matched_ride['ride_id']) if matched_ride is not None else None
    )
    session.add(history)
    session.commit()
    session.close()

    return jsonify({"response": assistant_response})

# Route to fetch chat history
@app.route("/history", methods=["GET"])
def get_history():
    session = SessionLocal()
    records = session.query(ChatHistory).order_by(ChatHistory.timestamp.desc()).all()
    session.close()

    return jsonify([
        {
            "timestamp": r.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            "message": r.user_message,
            "response": r.assistant_response
        } for r in records
    ])

if __name__ == "__main__":
    app.run(debug=True)
