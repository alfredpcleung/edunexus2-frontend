import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, createUser, updateUser } from '../../api/users';
import '../forms.css';

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', password: '' });

  useEffect(() => {
    if (id) {
      getUser(id).then(({ data }) => {
        // Don’t prefill password for security reasons
        setForm({ firstname: data.firstname, lastname: data.lastname, email: data.email, password: '' });
      });
    }
  }, [id]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage users.');
      navigate('/login');
      return;
    }
    
    try {
      if (id) {
        // When updating, don't send empty password field
        const { password, ...updateData } = form;
        await updateUser(id, updateData);
      } else {
        await createUser(form);
      }
      navigate('/users');
    } catch (error) {
      console.error('Failed to save user:', error);
      
      // Check for authentication errors
      if (error.response?.status === 401) {
        alert('Authentication required. Please sign in to manage users.');
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to save user. Please try again.');
      }
    }
  };

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-wrapper">
          <h2>{id ? 'Edit User' : 'New User'}</h2>
          <form onSubmit={onSubmit} className="form">
            <div className="form-group">
              <label>First Name *</label>
              <input
                name="firstname"
                value={form.firstname}
                onChange={onChange}
                placeholder="Enter first name"
                required
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
              />
            </div>

            {!id && (
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Enter password"
                  required
                />
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {id ? 'Update User' : 'Create User'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/users')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}