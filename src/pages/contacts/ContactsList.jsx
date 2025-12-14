import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getContacts, deleteContact } from '../../api/contacts';
import '../lists.css';

export default function ContactsList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getContacts();
        setItems(data);
      } catch (err) {
        console.error("Failed to load contacts", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage contacts.');
      navigate('/login');
      return;
    }

    if (!confirm("Delete this contact?")) return;
    try {
      await deleteContact(id);
      setItems((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  const handleNewClick = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage contacts.');
      navigate('/login');
      return;
    }
    navigate('/contacts/new');
  };

  const handleEditClick = (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage contacts.');
      navigate('/login');
      return;
    }
    navigate(`/contacts/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="contacts-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h2>Peer Feedback</h2>
            <p className="text-muted">View and manage peer feedback</p>
          </div>
          <button 
            onClick={handleNewClick}
            className="btn btn-primary"
          >
            + New Feedback
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <p>No feedback found.</p>
            <button 
              onClick={handleNewClick}
              className="btn btn-primary"
            >
              Create First Feedback
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
                {items.map((c) => (
                  <tr key={c._id}>
                    <td>{c.title}</td>
                    <td>{c.description}</td>
                    <td>{c.review}</td>
                    <td>
                      <button 
                        onClick={() => handleEditClick(c._id)}
                        className="btn btn-sm btn-secondary"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDelete(c._id)}
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