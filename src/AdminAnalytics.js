import React, { useEffect, useState, useContext } from 'react';
import { AdminAuthContext } from './AdminAuthContext';
import AdminNav from './AdminNav';
import './AdminAnalytics.css';
import { API_BASE } from './apiConfig';

export default function AdminAnalytics() {
  const { token } = useContext(AdminAuthContext);
  const [totals, setTotals] = useState({
    totalCustomers: 0,
    totalCredit: 0,
    totalDebit: 0,
  });
  const [growth, setGrowth] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}admin/analytics/total-customers`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setTotals(t => ({ ...t, totalCustomers: data.totalCustomers })));

    fetch(`${API_BASE}/admin/analytics/total-transactions`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setTotals(t => ({ ...t, ...data })));

    fetch(`${API_BASE}/admin/analytics/customer-growth`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setGrowth)
      .catch(() => setError('Error loading growth stats'));
  }, [token]);

  return (
    <div className="adminanalytics-container">
      <AdminNav />

      <h1>Admin Analytics</h1>

      {error && <p className="error-message">{error}</p>}

      <section className="totals-summary">
        <div>
          <h3>Total Customers</h3>
          <p>{totals.totalCustomers}</p>
        </div>
        <div>
          <h3>Total Credit</h3>
          <p>₹{totals.totalCredit}</p>
        </div>
        <div>
          <h3>Total Debit</h3>
          <p>₹{totals.totalDebit}</p>
        </div>
      </section>

      <section className="growth-table-section">
        <h2>Customer Growth Data</h2>
        <table className="growth-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {growth.length > 0 ? (
              growth.map(g => (
                <tr key={g._id}>
                  <td>{g._id}</td>
                  <td>{g.count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  No growth data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
