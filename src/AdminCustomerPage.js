import React, { useState } from 'react';
import AdminCustomerList from './AdminCustomerList';
import AdminCustomerForm from './AdminCustomerForm';
import CustomerDetailsModal from './CustomerDetailsModal';
import Modal from './Modal';
import './AdminCustomerPage.css';

function AdminCustomerPage() {
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [viewingCustomerId, setViewingCustomerId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleAddNew = () => {
    setEditingCustomerId(null);
    setShowForm(true);
  };

  const handleEdit = (customerId) => {
    setEditingCustomerId(customerId);
    setShowForm(true);
  };

  const handleViewDetails = (customerId) => {
    setViewingCustomerId(customerId);
    setShowDetails(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCustomerId(null);
    setRefreshFlag((f) => !f); // toggle to refresh list
  };

  return (
    <div className="admincustomerpage-container">
      <div className="add-customer-container">
        <button className="add-customer-btn" onClick={handleAddNew}>
          + Add Customer
        </button>
      </div>

      <AdminCustomerList
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
        refreshFlag={refreshFlag}
      />

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <AdminCustomerForm
            customerId={editingCustomerId}
            onSuccess={handleFormSuccess}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {showDetails && (
        <Modal onClose={() => setShowDetails(false)}>
          <CustomerDetailsModal
            customerId={viewingCustomerId}
            onClose={() => setShowDetails(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AdminCustomerPage;