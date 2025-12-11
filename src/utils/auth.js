/**
 * Logout function - removes auth token and redirects to login
 */
export const logout = () => {
  // Remove token from localStorage
  localStorage.removeItem('authToken');
  
  // Redirect to login page
  window.location.href = '/login';
};
