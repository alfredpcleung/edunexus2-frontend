import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects, deleteProject } from '../../api/projects';
import '../lists.css';

export default function ProjectsList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getProjects();
        setItems(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage projects.');
      navigate('/login');
      return;
    }

    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      setItems((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  const handleNewClick = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage projects.');
      navigate('/login');
      return;
    }
    navigate('/projects/new');
  };

  const handleEditClick = (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage projects.');
      navigate('/login');
      return;
    }
    navigate(`/projects/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="projects-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h2>Projects</h2>
            <p className="text-muted">Manage your projects</p>
          </div>
          <button 
            onClick={handleNewClick}
            className="btn btn-primary"
          >
            + New Project
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <p>No projects found.</p>
            <button 
              onClick={handleNewClick}
              className="btn btn-primary"
            >
              Create First Project
            </button>
          </div>
        ) : (
          <div className="table-container card">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Completion</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr key={p._id}>
                    <td>{p.title}</td>
                    <td>{p.description}</td>
                    <td>{new Date(p.completion).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => handleEditClick(p._id)}
                        className="btn btn-sm btn-secondary"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDelete(p._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}