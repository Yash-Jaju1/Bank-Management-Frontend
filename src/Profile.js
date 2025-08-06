import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { ThemeContext } from './ThemeContext';
import './TransactionForm.css';
import { useParams } from 'react-router-dom';

export default function Profile() {
  const { customerId } = useParams();
  const { token } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [form, setForm] = useState({
    name: '',
    dob: '',
    address: '',
    mobileNo: '',
    email: '',
    // Add more profile fields here if needed
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data on mount
    fetch(`http://localhost:5000/api/customers/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setForm(prev => ({
            ...prev,
            ...data,
            dob: data.dob ? data.dob.split('T')[0] : '', // format date yyyy-mm-dd
          }));
        } else {
          setMessage(data.message || 'Failed to load profile');
        }
        setLoading(false);
      })
      .catch(() => {
        setMessage('Server error. Please try later.');
        setLoading(false);
      });
  }, [customerId, token]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch(`http://localhost:5000/api/customers/profile/${customerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage(data.message || 'Failed to update profile');
      }
    } catch {
      setMessage('Server error. Please try later.');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading profile...</p>;

  return (
    // Apply theme class to container based on current theme from context
    <div className={`transaction-container ${theme}`}>
      <h2>Your Profile</h2>
      <form className="transaction-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />

        <label htmlFor="dob">Date of Birth</label>
        <input
          id="dob"
          name="dob"
          type="date"
          value={form.dob}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          rows="3"
          placeholder="Enter your address"
        />

        <label htmlFor="mobileNo">Mobile Number</label>
        <input
          id="mobileNo"
          name="mobileNo"
          type="tel"
          value={form.mobileNo}
          onChange={handleChange}
          required
          placeholder="Enter your mobile number"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Enter your email address"
          disabled // Usually email is not editable, adjust if needed
        />

        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}
