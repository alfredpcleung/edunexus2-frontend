import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getServices, deleteService } from '../../api/services';
import '../lists.css';

export default function ServicesList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getServices();
        setItems(data);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage courses.');
      navigate('/login');
      return;
    }

    if (!confirm("Delete this course?")) return;
    try {
      await deleteService(id);
      setItems((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  const handleNewClick = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage courses.');
      navigate('/login');
      return;
    }
    navigate('/services/new');
  };

  const handleEditClick = (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage courses.');
      navigate('/login');
      return;
    }
    navigate(`/services/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="courses-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h2>Courses</h2>
            <p className="text-muted">Manage your courses</p>
          </div>
          <button 
            onClick={handleNewClick}
            className="btn btn-primary"
          >
            + New Course
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛠️</div>
            <p>No courses found. Start by adding your first course to review and track your academic journey!</p>
            <button 
              onClick={handleNewClick}
              className="btn btn-primary"
            >
              Create First Course
            </button>
          </div>
        ) : (
          <div className="table-container card">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Review</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s._id}>
                    <td>{s.title}</td>
                    <td>{s.description}</td>
                    <td>{s.review || <span className="text-muted">No review</span>}</td>
                    <td>
                      <button 
                        onClick={() => handleEditClick(s._id)}
                        className="btn btn-sm btn-secondary"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDelete(s._id)}
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