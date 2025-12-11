import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { logout } from './auth';

describe('Auth Utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('logout function', () => {
    it('removes authToken from localStorage', () => {
      // Setup
      localStorage.setItem('authToken', 'mock-token');
      expect(localStorage.getItem('authToken')).toBe('mock-token');

      // Mock window.location.href
      delete window.location;
      window.location = { href: '' };

      // Execute
      logout();

      // Assert
      expect(localStorage.getItem('authToken')).toBeNull();
    });

    it('redirects to login page', () => {
      // Mock window.location.href
      delete window.location;
      window.location = { href: '' };

      // Execute
      logout();

      // Assert
      expect(window.location.href).toBe('/login');
    });

    it('removes token and redirects in one call', () => {
      // Setup
      localStorage.setItem('authToken', 'mock-token');
      delete window.location;
      window.location = { href: '' };

      // Execute
      logout();

      // Assert
      expect(localStorage.getItem('authToken')).toBeNull();
      expect(window.location.href).toBe('/login');
    });
  });
});
