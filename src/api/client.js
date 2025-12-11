import axios from 'axios';

// This sets up a reusable Axios client for your backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://comp229-portfolio-backend-etmg.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

// List of endpoints that don't require authentication
const publicEndpoints = ['/api/auth/signup', '/api/auth/login'];

// Request interceptor: Add Authorization header for protected routes
api.interceptors.request.use(
  (config) => {
    // Check if the endpoint is public
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    // Add token to headers if not a public endpoint
    if (!isPublicEndpoint) {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 errors (expired/missing token)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token is missing or expired
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;