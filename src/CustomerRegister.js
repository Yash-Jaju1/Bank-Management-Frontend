import React, { useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { API_BASE } from './apiConfig';

function CustomerRegister() {
  const { theme } = useContext(ThemeContext);

  const [form, setForm] = useState({
    name: '',
    dob: '',
    address: '',
    mobileNo: '',
    email: '',
    accountType: '',
    amount: '',
    mpin: '',
    securityQuestion: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch(`${API_BASE}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (response.ok) setMessage('Registration successful! Customer ID: ' + data._id);
      else setMessage(data.error || 'Error registering. Please try again.');
    } catch (err) {
      setMessage('Server error. Try again.');
    }
  };

  return (
    <div className={`customer-register-container ${theme}`} style={{ maxWidth: '400px', margin: '30px auto', textAlign: 'left' }}>
      <h2>Register as Customer</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" required onChange={handleChange} value={form.name} />
        <input name="dob" type="date" placeholder="Date of Birth" required onChange={handleChange} value={form.dob} />
        <input name="address" placeholder="Address" required onChange={handleChange} value={form.address} />
        <input name="mobileNo" placeholder="Mobile Number" required onChange={handleChange} value={form.mobileNo} />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} value={form.email} />
        <select name="accountType" required onChange={handleChange} value={form.accountType}>
          <option value="">Select Account Type</option>
          <option value="S">Savings</option>
          <option value="C">Current</option>
        </select>
        <input name="amount" type="number" placeholder="Opening Amount (min 2000)" required onChange={handleChange} value={form.amount} min="2000" />
        <input name="mpin" placeholder="MPIN (6 digits)" required onChange={handleChange} value={form.mpin} maxLength="6" />
        <input name="securityQuestion" placeholder="Security Question" required onChange={handleChange} value={form.securityQuestion} />
        <button type="submit" style={{ marginTop: '12px' }}>Register</button>
      </form>
      <p style={{ color: message.startsWith('Registration') ? 'green' : 'red' }}>{message}</p>
    </div>
  );
}

export default CustomerRegister;
