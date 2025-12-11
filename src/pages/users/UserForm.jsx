import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, createUser, updateUser } from '../../api/users';

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
      alert("Save failed");
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit User' : 'New User'}</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 400 }}>
        <input
          name="firstname"
          value={form.firstname}
          onChange={onChange}
          placeholder="First Name"
          required
        />
        <input
          name="lastname"
          value={form.lastname}
          onChange={onChange}
          placeholder="Last Name"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Email"
          required
        />
        {!id && (
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            required
          />
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}