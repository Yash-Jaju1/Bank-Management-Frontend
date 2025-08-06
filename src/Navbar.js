import React from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import './Navbar.css';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-brand">
          Bank Management
        </Link></div>
      <ThemeToggleButton />
    </nav>
  );
}
