import React, { useEffect, useState } from 'react';
import './AdminCustomerForm.css'; // To reuse button styles, etc.
import { API_BASE } from './apiConfig';

function CustomerDetailsModal({ customerId, onClose }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!customerId) return;

    setLoading(true);
    fetch(`${API_BASE}/admin/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
    })
      .then(res => res.json())
      .then(data => {
        setCustomer(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [customerId]);

  if (loading) return <div style={{ padding: "1.5rem" }}>Loading...</div>;
  if (!customer) return <div style={{ padding: "1.5rem" }}>Customer data not found.</div>;

  return (
    <div style={{ minWidth: "320px", maxWidth: "400px", padding: "0 10px" }}>
      <h2 style={{ color: 'var(--primary-color)', textAlign: 'center' }}>Customer Details</h2>
      <div style={{ marginTop: "1rem", color: 'var(--text-color)' }}>
        <div><b>Name:</b> {customer.name}</div>
        <div><b>Date of Birth:</b> {customer.dob ? customer.dob.substring(0, 10) : ''}</div>
        <div><b>Address:</b> {customer.address}</div>
        <div><b>Mobile No:</b> {customer.mobileNo}</div>
        <div><b>Email:</b> {customer.email}</div>
        <div><b>Account Type:</b> {customer.accountType}</div>
        <div><b>Balance:</b> ₹{customer.amount}</div>
        <div><b>Security Question:</b> {customer.securityQuestion}</div>
      </div>
      <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
        <button className="cancel-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CustomerDetailsModal;
