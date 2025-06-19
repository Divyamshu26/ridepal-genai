import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSignup.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('ridepal_user', JSON.stringify({ email }));
      navigate('/chat');
    }
  };

  return (
    <div className="auth-container">
      <h2>RidePal Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p onClick={() => navigate('/signup')}>Don't have an account? Sign up</p>
      </form>
    </div>
  );
};

export default LoginPage;
