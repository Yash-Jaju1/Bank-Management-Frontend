import React, { createContext, useState } from 'react';
import { API_BASE } from './apiConfig';

export const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('adminAuth');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('adminToken'));

  const login = (jwtToken, adminData) => {
    setAdmin(adminData);
    setToken(jwtToken);
    localStorage.setItem('adminAuth', JSON.stringify(adminData));
    localStorage.setItem('adminToken', jwtToken);
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
