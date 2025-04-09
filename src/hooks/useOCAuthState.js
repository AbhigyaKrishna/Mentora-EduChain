import { useOCAuth } from '@opencampus/ocid-connect-js';
import { useEffect, useState } from 'react';

export const useOCAuthState = () => {
  const { isInitialized, authState, ocAuth, OCId, ethAddress } = useOCAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isInitialized) {
      setIsLoading(false);
      if (authState.error) {
        setError(authState.error);
        setIsAuthenticated(false);
      } else if (OCId && ethAddress) {
        setIsAuthenticated(true);
        setError(null);
      }
    }
  }, [isInitialized, authState, OCId, ethAddress]);

  const login = () => {
    ocAuth.signInWithRedirect({ state: 'opencampus', redirectUri: window.location.origin });
  };

  const logout = () => {
    ocAuth.logout(window.location.origin);
  };

  const getAuthState = () => {
    return ocAuth.getAuthState();
  };

  return {
    isInitialized,
    isAuthenticated,
    isLoading,
    error,
    OCId,
    ethAddress,
    login,
    logout,
    getAuthState,
  };
}; 