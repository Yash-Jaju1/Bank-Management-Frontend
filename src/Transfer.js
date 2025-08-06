// Transfer.js
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './TransactionForm.css';
import { useParams } from 'react-router-dom';

export default function Transfer() {
  const { customerId: fromCustomerId } = useParams();
  const { token } = useContext(AuthContext);

  const [amount, setAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
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
    if (!recipientAccount.trim()) {
      setMessage('Please enter a recipient account number or identifier.');
      return;
    }

    try {
      // Step 1: Lookup recipient by account number (you must implement this backend route)
      const resRecipient = await fetch(`http://localhost:5000/api/customers/by-account/${encodeURIComponent(recipientAccount.trim())}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!resRecipient.ok) {
        const errData = await resRecipient.json();
        setMessage(errData.message || 'Recipient not found');
        return;
      }

      const recipientData = await resRecipient.json();
      const toCustomerId = recipientData._id;

      if (fromCustomerId === toCustomerId) {
        setMessage('Cannot transfer to the same account.');
        return;
      }

      // Step 2: Do the transfer with the actual customer IDs
      const resTransfer = await fetch('http://localhost:5000/api/transactions/transfer', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          fromCustomerId,
          toCustomerId,
          amount: amtNum,
          remarks,
        }),
      });

      const data = await resTransfer.json();

      if (resTransfer.ok) {
        setMessage(`Transfer successful!`);
        setAmount('');
        setRecipientAccount('');
        setRemarks('');
      } else {
        setMessage(data.message || 'Transfer failed');
      }
    } catch (error) {
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="transaction-container">
      <h2>Transfer Funds</h2>
      <form className="transaction-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="recipientAccount">Recipient Account</label>
        <input
          id="recipientAccount"
          type="text"
          aria-label="Recipient account"
          value={recipientAccount}
          onChange={e => setRecipientAccount(e.target.value)}
          required
          placeholder="Account Number"
        />

        <label htmlFor="amount">Amount (₹):</label>
        <input
          id="amount"
          type="number"
          min="1"
          step="any"
          aria-label="Transfer amount"
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

        <button type="submit" className="submit-btn">Transfer</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
}
