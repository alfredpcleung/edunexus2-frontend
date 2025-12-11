import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/auth/Login';
import * as api from '../../api/client';

vi.mock('../../api/client', () => ({
  default: {
    post: vi.fn(),
  },
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form with email and password fields', () => {
    renderWithRouter(<Login />);
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    const mockToken = 'mock-jwt-token';
    
    api.default.post.mockResolvedValueOnce({
      data: { token: mockToken },
    });

    renderWithRouter(<Login />);

    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalledWith('/api/auth/login', {
        email: 'john@example.com',
        password: 'password123',
      });
      expect(localStorage.getItem('authToken')).toBe(mockToken);
    });
  });

  it('displays success message after login', async () => {
    const user = userEvent.setup();
    api.default.post.mockResolvedValueOnce({
      data: { token: 'mock-token' },
    });

    renderWithRouter(<Login />);

    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
    });
  });

  it('displays error message on login failure', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Invalid email or password';
    
    api.default.post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    renderWithRouter(<Login />);

    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'wrongpassword');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('displays generic error when no error message from server', async () => {
    const user = userEvent.setup();
    
    api.default.post.mockRejectedValueOnce({
      response: {},
    });

    renderWithRouter(<Login />);

    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
    });
  });

  it('disables form fields while loading', async () => {
    const user = userEvent.setup();
    
    api.default.post.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({ data: { token: 'mock' } }), 100))
    );

    renderWithRouter(<Login />);

    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);

    expect(screen.getByPlaceholderText('Email')).toBeDisabled();
    expect(screen.getByPlaceholderText('Password')).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it('shows loading text on button while submitting', async () => {
    const user = userEvent.setup();
    
    api.default.post.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({ data: { token: 'mock' } }), 100))
    );

    renderWithRouter(<Login />);

    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);

    expect(screen.getByRole('button', { name: /Logging in/i })).toBeInTheDocument();
  });
});
