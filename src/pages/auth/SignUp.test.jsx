import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../../pages/auth/SignUp';
import * as api from '../../api/client';

vi.mock('../../api/client', () => ({
  default: {
    post: vi.fn(),
  },
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SignUp Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders signup form with all fields', () => {
    renderWithRouter(<SignUp />);
    
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password (min 6 characters)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows password validation error for short password', async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignUp />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password (min 6 characters)'), 'short');

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data and stores token', async () => {
    const user = userEvent.setup();
    const mockToken = 'mock-jwt-token';
    
    api.default.post.mockResolvedValueOnce({
      data: { token: mockToken },
    });

    renderWithRouter(<SignUp />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password (min 6 characters)'), 'password123');

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.default.post).toHaveBeenCalledWith('/api/auth/signup', {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      });
      expect(localStorage.getItem('authToken')).toBe(mockToken);
    });
  });

  it('displays success message after signup', async () => {
    const user = userEvent.setup();
    api.default.post.mockResolvedValueOnce({
      data: { token: 'mock-token' },
    });

    renderWithRouter(<SignUp />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password (min 6 characters)'), 'password123');

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Signup successful/i)).toBeInTheDocument();
    });
  });

  it('displays error message on signup failure', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Email already exists';
    
    api.default.post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    renderWithRouter(<SignUp />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password (min 6 characters)'), 'password123');

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('disables form fields while loading', async () => {
    const user = userEvent.setup();
    
    api.default.post.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({ data: { token: 'mock' } }), 100))
    );

    renderWithRouter(<SignUp />);

    await user.type(screen.getByPlaceholderText('First Name'), 'John');
    await user.type(screen.getByPlaceholderText('Last Name'), 'Doe');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password (min 6 characters)'), 'password123');

    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    expect(screen.getByPlaceholderText('First Name')).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
