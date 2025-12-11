import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ContactsList from './pages/contacts/ContactsList';
import ContactForm from './pages/contacts/ContactForm';
import UsersList from './pages/users/UsersList';
import UserForm from './pages/users/UserForm';
import ProjectsList from './pages/projects/ProjectsList';
import ProjectForm from './pages/projects/ProjectForm';
import ServicesList from './pages/services/ServicesList';
import ServiceForm from './pages/services/ServiceForm';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        {/* Default route goes to home */}
        <Route path="/" element={<Home />} />

        {/* Auth routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Contacts routes */}
        <Route path="/contacts" element={<ContactsList />} />
        <Route path="/contacts/new" element={<ContactForm />} />
        <Route path="/contacts/:id" element={<ContactForm />} />

        {/* Users */}
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/:id" element={<UserForm />} />

        {/* Projects */}
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/projects/new" element={<ProjectForm />} />
        <Route path="/projects/:id" element={<ProjectForm />} />

        {/* Services */}
        <Route path="/services" element={<ServicesList />} />
        <Route path="/services/new" element={<ServiceForm />} />
        <Route path="/services/:id" element={<ServiceForm />} />
      </Routes>
    </BrowserRouter>
  );
}