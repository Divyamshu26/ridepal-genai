import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSignup.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem('ridepal_user', JSON.stringify({ email }));
    navigate('/chat');
  };

  return (
    <div className="auth-container">
      <h2>Create RidePal Account</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
        <p onClick={() => navigate('/login')}>Already have an account? Login</p>
      </form>
    </div>
  );
};

export default SignupPage;
