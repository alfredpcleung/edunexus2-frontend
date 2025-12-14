import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../../api/users';
import '../lists.css';

export default function UsersList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getUsers();
        setItems(data);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onDelete = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage users.');
      navigate('/login');
      return;
    }

    if (!confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      setItems((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  const handleNewClick = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage users.');
      navigate('/login');
      return;
    }
    navigate('/users/new');
  };

  const handleEditClick = (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Authentication required. Please sign in to manage users.');
      navigate('/login');
      return;
    }
    navigate(`/users/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="users-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h2>Students</h2>
            <p className="text-muted">Manage your student information</p>
          </div>
          <button 
            onClick={handleNewClick}
            className="btn btn-primary"
          >
            + New Student
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p>No students found. Add your classmates or yourself to start building your EdNexus community!</p>
            <button 
              onClick={handleNewClick}
              className="btn btn-primary"
            >
              Create First Student
            </button>
          </div>
        ) : (
          <div className="table-container card">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Major</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((u) => (
                  <tr key={u._id}>
                    <td>{u.firstname}</td>
                    <td>{u.lastname}</td>
                    <td>{u.email}</td>
                    <td>{u.major || <span className="text-muted">N/A</span>}</td>
                    <td>{u.year || <span className="text-muted">N/A</span>}</td>
                    <td>
                      <button 
                        onClick={() => handleEditClick(u._id)}
                        className="btn btn-sm btn-secondary"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => onDelete(u._id)}
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