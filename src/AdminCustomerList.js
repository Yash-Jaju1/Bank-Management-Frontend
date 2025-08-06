import React, { useEffect, useState, useContext } from 'react';
import { AdminAuthContext } from './AdminAuthContext';
import AdminNav from './AdminNav';
import './AdminCustomerList.css';
import { API_BASE } from './apiConfig';

function AdminCustomerList({ onEdit, onViewDetails, refreshFlag }) {
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useContext(AdminAuthContext);

  const fetchCustomers = () => {
    let url = `${API_BASE}/admin/customers?page=${page}&limit=${pageSize}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;

    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.customers) {
          setCustomers(data.customers);
          setTotalPages(data.totalPages);
          setMessage('');
        } else {
          setMessage('Failed to load customers.');
          setCustomers([]);
        }
      })
      .catch(() => {
        setMessage('Server error');
        setCustomers([]);
      });
  };

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line
  }, [page, search, token, refreshFlag]);

  const handleDelete = (customerId) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) return;

    fetch(`${API_BASE}/admin/customers/${customerId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message || 'Customer deleted');
        fetchCustomers();
      })
      .catch(() => setMessage('Server error'));
  };

  return (
    <div className="admincustomerlist-container">
      <AdminNav />

      <h1>Manage Customers</h1>

      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />

      {message && <p className="message">{message}</p>}

      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Account Type</th>
            <th>Balance (₹)</th>
            <th>Edit</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="8" className="no-customers">No customers found.</td>
            </tr>
          ) : (
            customers.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.mobileNo}</td>
                <td>{c.email}</td>
                <td>{c.accountType}</td>
                <td>{c.amount}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit && onEdit(c._id)}>Edit</button>
                </td>
                <td>
                  <button className="details-btn" onClick={() => onViewDetails && onViewDetails(c._id)}>View</button>
                </td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
}

export default AdminCustomerList;
