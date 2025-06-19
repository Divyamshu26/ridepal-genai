import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/HomePage.css';

const HomePage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! How can I assist you with your fare today?',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/chat', {
        message: input
      });

      const botReply = {
        role: 'assistant',
        text: res.data.response || "I didn’t quite understand that.",
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error("Fetch failed", err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "Something went wrong. Please try again.",
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="homepage">
      <div className="homepage-chat">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="bubble">
              <div className="meta">
                <strong>{msg.role === 'user' ? 'You' : 'RidePal'}</strong>
              </div>
              <div className="text">{msg.text}</div>
              <div className="timestamp">{msg.timestamp}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            <div className="bubble">
              <div className="meta"><strong>RidePal</strong></div>
              <div className="text typing">
                Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
              </div>
              <div className="timestamp">{new Date().toLocaleTimeString()}</div>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div className="homepage-input">
        <input
          type="text"
          value={input}
          placeholder="Ask about your fare, trip, or anything..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend}>Send</button>
        <button className="clear-btn" onClick={clearChat}>Clear Chat</button>
      </div>
    </div>
  );
};

export default HomePage;
