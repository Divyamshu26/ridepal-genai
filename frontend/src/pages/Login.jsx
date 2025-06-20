import React, { useState } from 'react';
import '../styles/Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // fake login
    alert(`Logged in as ${email}`);
  };

  return (
    <div className="login-container">
      <h1>Login to RidePal</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
