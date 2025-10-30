import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';
import { useCallback } from 'react';

/**
 * Custom hook for making authenticated API requests
 * Automatically includes JWT token in Authorization header
 * Handles token refresh if needed
 */
export const useAuthenticatedRequest = () => {
  const { token, refreshToken, logout } = useAuth();
  const { getEndpoint } = useApi();

  const makeRequest = useCallback(async (
    endpoint: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    // Ensure we have a token
    if (!token) {
      throw new Error('No authentication token available');
    }

    // Prepare headers with authorization
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    // Construct full URL
    const url = endpoint.startsWith('http') ? endpoint : getEndpoint(endpoint);

    try {
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // If token expired (401), try to refresh
      if (response.status === 401) {
        const refreshSuccess = await refreshToken();
        
        if (refreshSuccess) {
          // Retry the request with new token
          const retryHeaders: HeadersInit = {
            ...headers,
            'Authorization': `Bearer ${token}`,
          };
          
          return fetch(url, {
            ...options,
            headers: retryHeaders,
          });
        } else {
          // Refresh failed, logout user
          logout();
          throw new Error('Authentication failed');
        }
      }

      return response;
    } catch (error) {
      console.error('Authenticated request failed:', error);
      throw error;
    }
  }, [token, refreshToken, logout, getEndpoint]);

  return makeRequest;
};