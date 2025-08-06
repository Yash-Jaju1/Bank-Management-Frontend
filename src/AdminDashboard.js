import React, { useEffect, useState, useContext } from 'react';
import { AdminAuthContext } from './AdminAuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { Link } from 'react-router-dom'; 
import AdminNav from './AdminNav';
import { API_BASE } from './apiConfig';


export default function AdminDashboard() {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState('');
  const { token, logout } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/admin/customers`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.customers) setCustomers(data.customers);
        else if (Array.isArray(data)) setCustomers(data);
        else setMessage('Failed to load customers.');
      })
      .catch(() => setMessage('Server error'));
  }, [token]);

  const handleDelete = async (customerId) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/customers/${customerId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setCustomers(customers.filter(c => c._id !== customerId));
        setMessage('Customer deleted.');
      } else {
        setMessage(data.message || 'Delete failed');
      }
    } catch {
      setMessage('Server error');
    }
  };

  return (
    <div className="admindashboard-container">
      <header className="admindashboard-header">
        
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={() => { logout(); navigate('/admin/login'); }}>
          Logout
        </button>
      </header>
      <nav className="admindashboard-nav">
        <AdminNav />
    </nav>

      {message && <p className="admindashboard-message">{message}</p>}

      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Account Type</th>
            <th>Balance (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-customers">No customers found.</td>
            </tr>
          ) : (
            customers.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.mobileNo}</td>
                <td>{c.accountType}</td>
                <td>{c.amount}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(c._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}