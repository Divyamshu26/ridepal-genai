// src/components/History.jsx
import React, { useEffect, useState } from 'react';
import '../styles/History.css'; // Custom CSS for styling

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/history")
      .then(res => res.json())
      .then(data => setHistory(data));
  }, []);

  return (
    <div className="history-container">
      <h2>User History</h2>
      {history.length === 0 ? <p>No history found.</p> : (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <strong>{item.timestamp}</strong><br />
              <span>User: {item.message}</span><br />
              <span>Assistant: {item.response}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default History;
