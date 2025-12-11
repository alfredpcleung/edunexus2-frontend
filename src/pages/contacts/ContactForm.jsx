import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getContact, createContact, updateContact } from '../../api/contacts';
import '../forms.css';

export default function ContactForm() {
  const { id } = useParams(); // if editing, we get the contact id
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '' });

  // Load existing contact if editing
  useEffect(() => {
    if (id) {
      getContact(id).then(({ data }) => setForm(data));
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
      alert('Authentication required. Please sign in to manage contacts.');
      navigate('/login');
      return;
    }
    
    try {
      if (id) {
        await updateContact(id, form);
      } else {
        await createContact(form);
      }
      navigate('/contacts'); // go back to list
    } catch (error) {
      console.error('Failed to save contact:', error);
      
      // Check for authentication errors
      if (error.response?.status === 401) {
        alert('Authentication required. Please sign in to manage contacts.');
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to save contact. Please try again.');
      }
    }
  };

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-wrapper">
          <h2>{id ? 'Edit Contact' : 'New Contact'}</h2>
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

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {id ? 'Update Contact' : 'Create Contact'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/contacts')}
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