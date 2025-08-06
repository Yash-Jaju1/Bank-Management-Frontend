import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from './AdminAuthContext';
import './AdminLogin.css';
import { API_BASE } from './apiConfig';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AdminAuthContext);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
<<<<<<< HEAD
      const res = await fetch(`${API_BASE}/admin/login`, {
=======
      const res = await fetch('https://bank-management-6r4z.onrender.com/api/admin/login', {
>>>>>>> 88ebaeb296649f175d676b75ca496f147bf7d3f6
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, { adminId: data.adminId, username: data.username });
        setMessage('Login successful!');
        setTimeout(() => navigate('/admin/dashboard'), 600);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch {
      setMessage('Server error');
    }
  };

  return (
    <div className="adminlogin-container">
      <form className="adminlogin-form" onSubmit={handleSubmit} noValidate>
        <h2>Admin Login</h2>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          required
          placeholder="Your admin username"
          value={form.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Your password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="adminlogin-btn">
          Login
        </button>
        {message && <p className="adminlogin-message">{message}</p>}
      </form>
    </div>
  );
}
