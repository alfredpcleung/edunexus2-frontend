import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/client';
import '../forms.css';

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password
    if (!validatePassword(form.password)) {
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.post('/api/auth/signup', form);
      
      // Store JWT token
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      setMessage({ type: 'success', text: 'Signup successful! Redirecting to login...' });
      
      // Redirect to login after 1 second
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-wrapper">
          <h2>Create Account</h2>
          <form onSubmit={onSubmit} className="form">
            <div className="form-group">
              <label>First Name *</label>
              <input
                name="firstname"
                value={form.firstname}
                onChange={onChange}
                placeholder="Enter first name"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input
                name="lastname"
                value={form.lastname}
                onChange={onChange}
                placeholder="Enter last name"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Enter email address"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Password * (min 6 characters)</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Enter password"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {message.text && (
              <div className={`alert alert-${message.type}`}>
                {message.text}
              </div>
            )}

            <p className="text-center text-muted">
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
