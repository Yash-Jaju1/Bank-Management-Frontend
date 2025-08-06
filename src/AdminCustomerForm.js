import React, { useState, useEffect } from 'react';
import './AdminCustomerForm.css';
import { API_BASE } from './apiConfig';

function AdminCustomerForm({ customerId, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    address: '',
    mobileNo: '',
    email: '',
    accountType: 'Savings',
    amount: 2000,
    mpin: '',
    securityQuestion: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (customerId) {
      fetch(`${API_BASE}/admin/customers/${customerId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      })
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setForm({ ...data, dob: data.dob ? data.dob.split('T')[0] : '' });
          } else {
            setMessage(data.message || 'Failed to load customer');
          }
        })
        .catch(() => setMessage('Server error'));
    } else {
      setForm({
        name: '',
        dob: '',
        address: '',
        mobileNo: '',
        email: '',
        accountType: 'Savings',
        amount: 2000,
        mpin: '',
        securityQuestion: '',
      });
      setMessage('');
    }
  }, [customerId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMessage('');
    const method = customerId ? 'PUT' : 'POST';
    const url = customerId
      ? `${API_BASE}/admin/customers/${customerId}`
      : `${API_BASE}/admin/customers`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setMessage(customerId ? 'Customer updated' : 'Customer created');
          if (onSuccess) onSuccess();
        } else {
          setMessage(data.message || 'Operation failed');
        }
      })
      .catch(() => setMessage('Server error'));
  };

  return (
    <div className="admincustomerform-container">
      <form className="admincustomerform" onSubmit={handleSubmit} noValidate>
        <h2>{customerId ? 'Edit Customer' : 'Add Customer'}</h2>

        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required placeholder="Full name" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="dob">Date of Birth</label>
          <input id="dob" name="dob" type="date" required value={form.dob} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" required placeholder="Address" value={form.address} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="mobileNo">Mobile Number</label>
          <input id="mobileNo" name="mobileNo" type="tel" required placeholder="Mobile number" value={form.mobileNo} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="Email address" value={form.email} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="accountType">Account Type</label>
          <select id="accountType" name="accountType" value={form.accountType} onChange={handleChange}>
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
          </select>
        </div>

        <div className="form-row">
          <label htmlFor="amount">Initial Amount</label>
          <input id="amount" name="amount" type="number" min="0" required value={form.amount} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="mpin">MPIN</label>
          <input id="mpin" name="mpin" type="password" maxLength={6} placeholder="6-digit MPIN" required={!customerId} value={form.mpin} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label htmlFor="securityQuestion">Security Question</label>
          <input id="securityQuestion" name="securityQuestion" type="text" required placeholder="Security question" value={form.securityQuestion} onChange={handleChange} />
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">{customerId ? 'Update' : 'Create'}</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}

export default AdminCustomerForm;
