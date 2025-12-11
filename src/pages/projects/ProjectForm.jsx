import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProject, createProject, updateProject } from '../../api/projects';
import '../forms.css';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', completion: '' });

  useEffect(() => {
    if (id) {
      getProject(id).then(({ data }) => {
        setForm({
          title: data.title,
          description: data.description,
          completion: data.completion ? data.completion.substring(0, 10) : ''
        });
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
      alert('Authentication required. Please sign in to manage projects.');
      navigate('/login');
      return;
    }
    
    try {
      if (id) {
        await updateProject(id, form);
      } else {
        await createProject(form);
      }
      navigate('/projects');
    } catch (error) {
      console.error('Failed to save project:', error);
      
      // Check for authentication errors
      if (error.response?.status === 401) {
        alert('Authentication required. Please sign in to manage projects.');
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to save project. Please try again.');
      }
    }
  };

  return (
    <div className="form-page">
      <div className="container">
        <div className="form-wrapper">
          <h2>{id ? 'Edit Project' : 'New Project'}</h2>
          <form onSubmit={onSubmit} className="form">
            <div className="form-group">
              <label>Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={onChange}
                placeholder="Enter project description"
                required
              />
            </div>

            <div className="form-group">
              <label>Completion Date *</label>
              <input
                type="date"
                name="completion"
                value={form.completion}
                onChange={onChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {id ? 'Update Project' : 'Create Project'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/projects')}
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