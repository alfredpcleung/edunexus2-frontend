import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getContact, createContact, updateContact } from '../../api/contacts';
import '../forms.css';

export default function ContactForm() {
  const { id } = useParams(); // if editing, we get the contact id
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', review: '' });

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

    // Debug: log form data before sending
    console.log('Submitting peer feedback:', form);

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
          <h2>{id ? 'Edit Peer Feedback' : 'New Peer Feedback'}</h2>
          <form onSubmit={onSubmit} className="form">
            <div className="form-group">
              <label>Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Enter feedback title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <input
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Enter description"
                required
              />
            </div>

            <div className="form-group">
              <label>Review *</label>
              <textarea
                name="review"
                value={form.review}
                onChange={onChange}
                placeholder="Enter your review"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {id ? 'Update Peer Feedback' : 'Create Peer Feedback'}
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