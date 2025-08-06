import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';

import CustomerRegister from './CustomerRegister';
import Login from './Login';
import Dashboard from './Dashboard';
import TransactionForm from './TransactionForm';
import TransactionDetail from './TransactionDetail';

import { AuthContext } from './AuthContext';

import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminCustomerPage from './AdminCustomerPage';
import AdminAnalytics from './AdminAnalytics';
import { AdminAuthContext } from './AdminAuthContext';

import CustomerProfile from './CustomerProfile';

import ForgotMPIN from './ForgotMPIN';

import Navbar from './Navbar';
import './App.css';

import Deposit from './Deposit';        // adjust the path as needed
import Withdraw from './Withdraw';
import Transfer from './Transfer';
import Profile from './Profile';

import HomePage from './HomePage';

function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Bank Management Home</h1>
      <p>Please use the navigation to Register or Login.</p>
    </div>
  );
}

// Dashboard and Transaction wrapper to extract params
function DashboardWrapper() {
  const { customerId } = useParams();
  return <Dashboard customerId={customerId} />;
}

function TransactionFormWrapper({ type }) {
  const { customerId } = useParams();
  return <TransactionForm customerId={customerId} type={type} />;
}

// Route protection for customers
function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
}

// Route protection for admins
function AdminProtectedRoute({ children }) {
  const { admin } = useContext(AdminAuthContext);
  if (!admin) {
    return <Navigate to="/admin/login" />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-mpin" element={<ForgotMPIN />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<CustomerRegister />} />

        <Route path="/deposit/:customerId" element={<Deposit />} />
        <Route path="/withdraw/:customerId" element={<Withdraw />} />
        <Route path="/transfer/:customerId" element={<Transfer />} />
        <Route path="/profile/:customerId" element={<Profile />} />

        <Route path="/" element={<HomePage />} />



        <Route
          path="/dashboard/:customerId"
          element={
            <ProtectedRoute>
              <DashboardWrapper />
            </ProtectedRoute>
          }
        />

        <Route
          path="/deposit/:customerId"
          element={
            <ProtectedRoute>
              <TransactionFormWrapper type="deposit" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/withdraw/:customerId"
          element={
            <ProtectedRoute>
              <TransactionFormWrapper type="withdraw" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transfer/:customerId"
          element={
            <ProtectedRoute>
              <TransactionFormWrapper type="transfer" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <CustomerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transaction/:transactionId"
          element={
            <ProtectedRoute>
              <TransactionDetail />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <AdminProtectedRoute>
              <AdminCustomerPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <AdminProtectedRoute>
              <AdminAnalytics />
            </AdminProtectedRoute>
          }
        />

        {/* Optionally add a Not Found route */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
