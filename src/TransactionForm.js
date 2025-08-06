import React, { useState } from 'react';
import { API_BASE } from './apiConfig';

function TransactionForm({ customerId, type }) {
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [transferAccountId, setTransferAccountId] = useState('');
  const [message, setMessage] = useState('');
  

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');

    let url = '';
    let body = { amount: Number(amount), remarks };

    if (type === 'deposit') {
      url = `${API_BASE}/transactions/deposit/${customerId}`;
    } else if (type === 'withdraw') {
      url = `${API_BASE}/transactions/withdraw/${customerId}`;
    } else if (type === 'transfer') {
      url = `${API_BASE}/transactions/transfer`;
      body = {
        fromCustomerId: customerId,
        toCustomerId: transferAccountId,
        amount: Number(amount),
        remarks
      };
      if (!transferAccountId) {
        setMessage('Please enter the account ID to transfer to.');
        return;
      }
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} successful.`);
        setAmount('');
        setRemarks('');
        if (type === 'transfer') setTransferAccountId('');
      } else {
        setMessage(data.message || 'Transaction failed.');
      }
    } catch {
      setMessage('Server error');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '30px auto', textAlign: 'left' }}>
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          min="1"
          step="any"
        />
        {type === 'transfer' && (
          <input
            type="text"
            placeholder="Transfer to Account ID"
            value={transferAccountId}
            onChange={e => setTransferAccountId(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Remarks"
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />
        <button type="submit" style={{ marginTop: '12px' }}>
          Submit
        </button>
      </form>
      <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>
    </div>
  );
}

export default TransactionForm;