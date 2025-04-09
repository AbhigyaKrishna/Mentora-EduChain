import { useState, useEffect, useCallback } from 'react';
import { MentoraClient } from '../utils/mentoraBlockchain';
import { useOCAuthState } from './useOCAuthState';
/**
 * Custom hook for managing the MentoraClient client
 * @returns {Object} Client instance and utility functions
 */
export const useMentoraContract = () => {
  const [client, setClient] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const { ethAddress } = useOCAuthState();

  // Initialize the client
  const initialize = useCallback((provider = window.ethereum, account = ethAddress ? ethAddress : window.ethereum.selectedAddress) => {
    try {
      if (!client) {
        const newClient = new MentoraClient(provider, import.meta.env.VITE_COURSE_CONTRACT_ADDRESS);
        newClient.setDefaultAccount(account);
        setClient(newClient);
        setIsInitialized(true);
        return newClient;
      }
      return client;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [client, ethAddress]);

  // Get the client instance, initializing if needed
  const getClient = useCallback(() => {
    if (!client) {
      try {
        return initialize();
      } catch (err) {
        setError(err.message);
        throw new Error('Failed to initialize MentoraClient client: ' + err.message);
      }
    }
    return client;
  }, [client, ethAddress, initialize]);

  // Reset the client (useful for testing or when switching accounts)
  const reset = useCallback(() => {
    setClient(null);
    setIsInitialized(false);
    setError(null);
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Optionally reset the client when the component unmounts
      // Uncomment the line below if you want this behavior
      // reset();
    };
  }, [reset]);

  return {
    client,
    isInitialized,
    error,
    initialize,
    getClient,
    reset
  };
};