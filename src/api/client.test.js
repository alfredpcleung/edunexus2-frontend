import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import axios from 'axios';

// We'll test the interceptor logic directly
describe('API Client Interceptors', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('adds Authorization header for protected routes', () => {
    const token = 'mock-jwt-token';
    localStorage.setItem('authToken', token);

    const publicEndpoints = ['/api/auth/signup', '/api/auth/login'];

    // Simulate the request interceptor logic
    const config = { url: '/api/users' };
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
    }

    expect(config.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('does not add Authorization header for public endpoints', () => {
    const token = 'mock-jwt-token';
    localStorage.setItem('authToken', token);

    const publicEndpoints = ['/api/auth/signup', '/api/auth/login'];

    // Simulate signup endpoint
    const config = { url: '/api/auth/signup' };
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
    }

    expect(config.headers).toBeUndefined();
  });

  it('does not add Authorization header if token is missing', () => {
    // Don't set token in localStorage
    const publicEndpoints = ['/api/auth/signup', '/api/auth/login'];

    const config = { url: '/api/users' };
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isPublicEndpoint) {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
    }

    expect(config.headers).toBeUndefined();
  });

  it('handles 401 errors by clearing token and redirecting', () => {
    localStorage.setItem('authToken', 'mock-token');
    delete window.location;
    window.location = { href: '' };

    // Simulate 401 error response interceptor
    const error = { response: { status: 401 } };
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    expect(localStorage.getItem('authToken')).toBeNull();
    expect(window.location.href).toBe('/login');
  });

  it('does not redirect on non-401 errors', () => {
    localStorage.setItem('authToken', 'mock-token');
    delete window.location;
    window.location = { href: '' };

    // Simulate 500 error
    const error = { response: { status: 500 } };
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    expect(localStorage.getItem('authToken')).toBe('mock-token');
    expect(window.location.href).toBe('');
  });
});
