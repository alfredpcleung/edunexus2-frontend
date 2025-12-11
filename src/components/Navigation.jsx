import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../utils/auth';
import './Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const token = localStorage.getItem('authToken');

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="Alfred Leung's Portfolio" className="logo-icon" />
          Alfred Leung's Portfolio
        </Link>

        <button 
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/')}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/contacts" 
            className={`nav-link ${isActive('/contacts')}`}
            onClick={() => setIsOpen(false)}
          >
            Contacts
          </Link>
          <Link 
            to="/users" 
            className={`nav-link ${isActive('/users')}`}
            onClick={() => setIsOpen(false)}
          >
            Users
          </Link>
          <Link 
            to="/projects" 
            className={`nav-link ${isActive('/projects')}`}
            onClick={() => setIsOpen(false)}
          >
            Projects
          </Link>
          <Link 
            to="/services" 
            className={`nav-link ${isActive('/services')}`}
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>

          <div className="nav-divider"></div>

          {token ? (
            <button 
              className="nav-link btn-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link 
                to="/login" 
                className="nav-link btn-secondary"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="nav-link btn-primary"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
