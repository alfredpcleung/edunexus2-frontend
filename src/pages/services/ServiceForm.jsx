import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getService, createService, updateService } from '../../api/services';
import '../forms.css';

export default function ServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });

  useEffect(() => {
    if (id) {
      getService(id).then(({ data }) => setForm(data));
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
      alert('Authentication required. Please sign in to manage services.');
      navigate('/login');
      return;
    }
    
    try {
      if (id) {
        await updateService(id, form);
      } else {
        await createService(form);
      }
      navigate('/services');
    } catch (error) {
      console.error('Failed to save service:', error);
      
      // Check for authentication errors
      if (error.response?.status === 401) {
        alert('Authentication required. Please sign in to manage services.');
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to save service. Please try again.');
      }
    }
  };

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-wrapper">
          <h2>{id ? 'Edit Service' : 'New Service'}</h2>
          <form onSubmit={onSubmit} className="form">
            <div className="form-group">
              <label>Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Enter service title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Enter service description"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {id ? 'Update Service' : 'Create Service'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/services')}
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