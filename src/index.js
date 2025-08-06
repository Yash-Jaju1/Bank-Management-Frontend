import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './AuthContext';
import { AdminAuthProvider } from './AdminAuthContext';
import { ThemeProvider } from './ThemeContext';
import { API_BASE } from './apiConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <App />
        </AdminAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
