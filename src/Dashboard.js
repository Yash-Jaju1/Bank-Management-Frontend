import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Dashboard.css';

export default function Dashboard({ customerId }) {
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch customer info
    fetch(`http://localhost:5000/api/customers/${customerId}`)
      .then(res => res.json())
      .then(data => setCustomer(data));

    // Fetch transaction history
    fetch(`http://localhost:5000/api/transactions/history/${customerId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTransactions(data);
        else if (Array.isArray(data.transactions)) setTransactions(data.transactions);
        else setTransactions([]);
      })
      .catch(() => setTransactions([]));
  }, [customerId]);

  if (!customer) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {customer.name}</h1>
        <button className="logout-btn" onClick={() => { logout(); navigate('/login'); }}>
          Logout
        </button>
      </header>

      <section className="account-info">
        <p>
          <strong>Account Type:</strong> {customer.accountType}
        </p>
        <p>
          <strong>Balance:</strong> ₹{customer.amount}
        </p>
      </section>

      <section className="transaction-history">
        <h2>Transaction History</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date &amp; Time</th>
              <th>Remarks</th>
              <th>Credit (₹)</th>
              <th>Debit (₹)</th>
              <th>Balance (₹)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-transactions">No transactions found</td>
              </tr>
            ) : (
              transactions.map(tx => (
                <tr key={tx._id}>
                  <td>
  <Link to={`/transaction/${tx._id}`} className="transaction-link">
    {new Date(tx.transactionDate).toLocaleString()}
  </Link>
</td>

                  <td>{tx.remarks}</td>
                  <td>{tx.creditAmount || '-'}</td>
                  <td>{tx.debitAmount || '-'}</td>
                  <td>{tx.totalAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <nav className="dashboard-nav">
  <Link to={`/deposit/${customerId}`} className="nav-btn">Deposit</Link>
  <Link to={`/withdraw/${customerId}`} className="nav-btn">Withdraw</Link>
  <Link to={`/transfer/${customerId}`} className="nav-btn">Transfer</Link>
  <Link to={`/profile`} className="nav-btn">Profile</Link>  {/* Keep as is if Profile uses auth context */}
</nav>
    </div>
  );
}
