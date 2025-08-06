import React, { createContext, useState } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap app and provide auth state
export function AuthProvider({ children }) {
  // Initialize user state from localStorage if available
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bankUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Login function saves user state and localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('bankUser', JSON.stringify(userData));
  };

  // Logout function clears user state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('bankUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}