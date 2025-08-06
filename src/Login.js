import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Login.css'; // Import the styles below
import { API_BASE } from './apiConfig';

function Login() {
  const [form, setForm] = useState({ email: '', mpin: '' });
  const [message, setMessage] = useState('');
  const [showForgotLink, setShowForgotLink] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setShowForgotLink(false);
    try {
      const res = await fetch(`${API_BASE}/customers/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Login successful! Welcome ' + data.name);
        login({ customerId: data.customerId, name: data.name });
        setTimeout(() => {
          navigate(`/dashboard/${data.customerId}`);
        }, 1000);
      } else {
        setMessage(data.message || 'Login failed');
        if (res.status === 401) setShowForgotLink(true);
      }
    } catch {
      setMessage('Server error');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2>Customer Login</h2>
        

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <label htmlFor="mpin">MPIN</label>
        <input
          type="password"
          id="mpin"
          name="mpin"
          placeholder="Enter your 6-digit MPIN"
          required
          maxLength={6}
          value={form.mpin}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <button type="submit" className="submit-btn">
          Login
        </button>

        {message && <p className="form-message">{message}</p>}

        {showForgotLink && (
          <p className="forgot-link">
            Forgot MPIN?&nbsp;
            <button
              type="button"
              onClick={() => navigate('/forgot-mpin')}
            >
              Click here
            </button>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;