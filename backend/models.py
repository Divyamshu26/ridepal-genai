from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime

Base = declarative_base()

class ChatHistory(Base):
    __tablename__ = 'chat_history'
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    user_email = Column(String, nullable=True)
    user_message = Column(Text)
    assistant_response = Column(Text)
    matched_ride_id = Column(Integer, nullable=True)

# Initialize the database
engine = create_engine('sqlite:///ridepal.db')  # stores db in backend folder
Base.metadata.create_all(engine)

SessionLocal = sessionmaker(bind=engine)
