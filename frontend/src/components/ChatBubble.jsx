import React from 'react';
import '../styles/ChatBubble.css';

const ChatBubble = ({ sender, message, time }) => {
  const bubbleClass = sender === 'user' ? 'chat-bubble user' : 'chat-bubble assistant';

  return (
    <div className={bubbleClass}>
      <div className="bubble-header">
        <span>{sender === 'user' ? 'You' : 'RidePal'}</span>
      </div>
      <span className="timestamp">{time}</span>
      <div className="bubble-message">{message}</div>
    </div>
  );
};

export default ChatBubble;
