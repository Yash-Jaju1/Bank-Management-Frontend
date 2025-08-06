import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext'; // import your ThemeContext
import './TransactionDetail.css'; // create this for styling

function TransactionDetail() {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState('');
  const { theme } = useContext(ThemeContext); // get current theme

  useEffect(() => {
    fetch(`http://localhost:5000/api/transactions/${transactionId}`)
      .then(res => {
        if (!res.ok) throw new Error('Transaction not found');
        return res.json();
      })
      .then(data => setTransaction(data))
      .catch(err => setError(err.message));
  }, [transactionId]);

  if (error) {
    return <div className={`error-message ${theme}`}>{error}</div>;
  }

  if (!transaction) {
    return <div className={`loading-message ${theme}`}>Loading transaction details...</div>;
  }

  return (
    <div className={`transaction-detail-container ${theme}`}>
      <h2>Transaction Details</h2>
      <p><strong>Transaction ID:</strong> {transaction._id}</p>
      <p><strong>Date & Time:</strong> {new Date(transaction.transactionDate).toLocaleString()}</p>
      <p><strong>Remarks:</strong> {transaction.remarks}</p>
      <p><strong>Credit (₹):</strong> {transaction.creditAmount || '-'}</p>
      <p><strong>Debit (₹):</strong> {transaction.debitAmount || '-'}</p>
      <p><strong>Balance After:</strong> {transaction.totalAmount}</p>
      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>
    </div>
  );
}

export default TransactionDetail;
