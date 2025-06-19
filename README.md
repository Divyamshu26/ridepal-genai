# 🚕 RidePal – Your AI-Powered Ride Assistant

RidePal is an AI-integrated ride assistant web application designed to help users check their past ride information, get fare estimates, and interact with a conversational chatbot powered by the Gemini API. Built with a sleek ChatGPT-style UI and backed by a powerful Flask API and Gemini integration, RidePal delivers a smart, intuitive experience.

---

## ✨ Features

- 🔍 **Natural Language Ride Query**
- 📊 **Fetch fare, car, route, and surge info from CSV**
- 🧠 **Powered by Gemini AI**
- 💬 **Chat-style user interface**
- 👤 **User authentication (Login/Logout)**
- 💾 **Stores user query history**
- 🌐 **Responsive pages: Home, About, Contact Us**
- 🎨 **Custom dark mode UI inspired by ChatGPT**

---

## 🛠️ Tech Stack

| Frontend | Backend | AI & Data | Styling |
|----------|---------|-----------|---------|
| React.js | Flask   | Gemini API, Pandas | Custom CSS (Dark Mode) |

---

## 📂 Project Structure

ridepal-genai/
│
├── backend/
│ ├── app.py # Flask backend
│ ├── data/ride.csv # Ride data (used for lookup)
│ ├── database/ # User history database
│ └── ...
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/ # Navbar, Chat, etc.
│ │ ├── pages/ # Home, About, Contact, Login
│ │ ├── styles/ # Custom dark mode CSS
│ │ └── App.jsx
│ └── ...
│
└── README.md # Project description


---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Divyamshu26/ridepal-genai.git
cd ridepal-genai

2. Backend Setup
cd backend
pip install -r requirements.txt
python app.py

3. Frontend Setup
cd frontend
npm install
npm start
```

Gemini Integration
The Gemini AI handles fallback queries where no match is found in the ride data.

import google.generativeai as genai
genai.configure(api_key="YOUR_GEMINI_API_KEY")
model = genai.GenerativeModel("models/gemini-1.5-flash")


