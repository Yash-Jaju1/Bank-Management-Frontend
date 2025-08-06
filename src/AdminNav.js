import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminNav.css';
import { API_BASE } from './apiConfig';

function normalizePathname(pathname) {
  return pathname.endsWith('/') && pathname.length > 1
    ? pathname.slice(0, -1)
    : pathname;
}

export default function AdminNav() {
  const location = useLocation();
  const currentPath = normalizePathname(location.pathname);

  return (
    <nav className="admindashboard-nav">
      <Link
        to="/admin/dashboard"
        className={`admin-nav-btn ${
          currentPath === '/admin/dashboard' || currentPath.startsWith('/admin/dashboard/')
            ? 'active'
            : ''
        }`}
      >
        Dashboard
      </Link>
      <Link
        to="/admin/analytics"
        className={`admin-nav-btn ${
          currentPath === '/admin/analytics' ? 'active' : ''
        }`}
      >
        Analytics
      </Link>
      <Link
        to="/admin/customers"
        className={`admin-nav-btn ${
          currentPath === '/admin/customers' ? 'active' : ''
        }`}
      >
        Manage Customers
      </Link>
    </nav>
  );
}
