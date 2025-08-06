import React, { useEffect, useState, useContext } from 'react';
import { AdminAuthContext } from './AdminAuthContext';

function TransactionHistory({ customerId }) {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { token } = useContext(AdminAuthContext);

  const fetchTransactions = () => {
    setLoading(true);
    let url = `http://localhost:5000/api/transactions/history/${customerId}?page=${page}&limit=10`;
    if (startDate) url += `&startDate=${startDate}`;
    if (endDate) url += `&endDate=${endDate}`;

    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setTransactions(data.transactions || []);
          setTotalPages(data.totalPages || 1);
          setError('');
        } else {
          setError('Failed to load transactions');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Server error');
        setLoading(false);
      });
  };

useEffect(() => {
  console.log('Fetching transactions for customer ', customerId);
  fetchTransactions();
}, [customerId, page]);
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchTransactions();
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <h3>Transaction History</h3>

      <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label style={{ marginLeft: 10 }}>
          End Date:
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
        <button type="submit" style={{ marginLeft: 10 }}>Filter</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? <p>Loading...</p> : (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
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
              <tr><td colSpan="5" align="center">No transactions found</td></tr>
            ) : (
              transactions.map(tx => (
                <tr key={tx._id}>
                  <td>{new Date(tx.transactionDate).toLocaleString()}</td>
                  <td>{tx.remarks}</td>
                  <td>{tx.creditAmount || '-'}</td>
                  <td>{tx.debitAmount || '-'}</td>
                  <td>{tx.totalAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
        <span style={{ margin: '0 10px' }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default TransactionHistory;