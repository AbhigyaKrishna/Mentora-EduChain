import { useState, useEffect } from 'react';
import walletConnection from '../utils/walletConnection';

export const useWalletConnection = (expectedAddress = null) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkConnection = async () => {
    setIsLoading(true);
    try {
      const result = await walletConnection.checkConnection(expectedAddress);
      setIsConnected(result.isConnected);
      setConnectedAddress(result.address);
      setError(result.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const connect = async () => {
    setIsLoading(true);
    try {
      const result = await walletConnection.connect(expectedAddress);
      setIsConnected(result.isConnected);
      setConnectedAddress(result.address);
      setError(result.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getProvider = () => walletConnection.getProvider();
  const getSigner = () => walletConnection.getSigner();

  // Check connection on mount and when expectedAddress changes
  useEffect(() => {
    checkConnection();
  }, [expectedAddress]);

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          setIsConnected(false);
          setConnectedAddress(null);
        } else {
          checkConnection();
        }
      };

      const handleChainChanged = () => {
        checkConnection();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [expectedAddress]);

  return {
    isConnected,
    connectedAddress,
    error,
    isLoading,
    checkConnection,
    connect,
    getProvider,
    getSigner
  };
}; 