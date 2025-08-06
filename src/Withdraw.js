import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './TransactionForm.css';
import { useParams } from 'react-router-dom';


export default function Withdraw() {
  const { customerId } = useParams();
  const { token } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const amtNum = Number(amount);
    if (isNaN(amtNum) || amtNum <= 0) {
      setMessage('Please enter a valid amount greater than 0.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/transactions/withdraw/${customerId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ amount: amtNum, remarks }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Withdrawal successful! New balance: ₹${data.newBalance || data.balance}`);
        setAmount('');
        setRemarks('');
      } else {
        setMessage(data.message || 'Withdrawal failed');
      }
    } catch {
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="transaction-container">
      <h2>Withdraw Funds</h2>
      <form className="transaction-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="amount">Amount (₹):</label>
        <input
          id="amount"
          type="number"
          min="1"
          step="any"
          aria-label="Withdraw amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
        />

        <label htmlFor="remarks">Remarks:</label>
        <input
          id="remarks"
          type="text"
          maxLength={100}
          placeholder="Remarks"
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
        />

        <button type="submit" className="submit-btn">Withdraw</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}
