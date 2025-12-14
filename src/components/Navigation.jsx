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
        <Link to="/" className="navbar-brand" style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <span style={{display: 'inline-flex', alignItems: 'center'}}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="10" height="20" rx="2" fill="#5b7cff"/>
              <rect x="18" y="6" width="10" height="20" rx="2" fill="#b06ab3"/>
              <rect x="7" y="9" width="4" height="14" rx="1" fill="#fff"/>
              <rect x="21" y="9" width="4" height="14" rx="1" fill="#fff"/>
            </svg>
          </span>
          <span>EduNexus</span>
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
            Peer Feedback
          </Link>
          <Link 
            to="/users" 
            className={`nav-link ${isActive('/users')}`}
            onClick={() => setIsOpen(false)}
          >
            Students
          </Link>
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard')}`}
            onClick={() => setIsOpen(false)}
          >
            Dashboard
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
            Courses
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
