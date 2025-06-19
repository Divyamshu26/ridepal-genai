import React from 'react';
import MessageBubble from './MessageBubble';
import Loader from './Loader';

const ChatContainer = ({ messages, isLoading }) => {
  return (
    <main className="chat-container">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} {...msg} />
      ))}
      {isLoading && <Loader />}
      
    </main>
  );
};

export default ChatContainer;
