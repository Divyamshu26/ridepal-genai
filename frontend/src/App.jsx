// // React + Flask Chat Starter Template (Frontend - React)

// // src/App.jsx
// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const userMsg = { sender: 'user', text: input };
//     setMessages([...messages, userMsg]);

//     try {
//       const res = await axios.post('http://localhost:5000/chat', { prompt: input });
//       const botMsg = { sender: 'bot', text: res.data.response };
//       setMessages(prev => [...prev, botMsg]);
//     } catch (err) {
//       setMessages(prev => [...prev, { sender: 'bot', text: 'Error fetching response' }]);
//     }

//     setInput('');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow p-4 space-y-4">
//         <div className="h-96 overflow-y-auto space-y-2">
//           {messages.map((msg, idx) => (
//             <div key={idx} className={`p-2 rounded-xl max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-100 self-end ml-auto' : 'bg-gray-200 self-start'}`}>
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-2">
//           <input
//             className="flex-1 p-2 border rounded-xl"
//             value={input}
//             onChange={e => setInput(e.target.value)}
//             placeholder="Ask something..."
//           />
//           <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-2 rounded-xl">Send</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
