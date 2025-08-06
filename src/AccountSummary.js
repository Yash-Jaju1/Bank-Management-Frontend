import React, { useEffect, useState } from 'react';
import { API_BASE } from './apiConfig';

function AccountSummary({ customerId }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/transactions/summary/${customerId}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSummary(data);
        else setError('Failed to load account summary.');
      })
      .catch(() => setError('Server error'));
  }, [customerId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!summary) return <p>Loading account summary...</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: 15, marginBottom: 20, maxWidth: 400 }}>
      <h3>Account Summary</h3>
      <p><strong>Current Balance:</strong> ₹{summary.currentBalance}</p>
      <p><strong>Total Credit:</strong> ₹{summary.totalCredit}</p>
      <p><strong>Total Debit:</strong> ₹{summary.totalDebit}</p>
    </div>
  );
}

export default AccountSummary;