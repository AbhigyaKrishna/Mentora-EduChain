// src/context/CoinsContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const CoinsContext = createContext();

// Provider component
export const CoinsProvider = ({ children }) => {
  const [coins, setCoins] = useState(() => {
    // Load from localStorage on initial render
    const savedCoins = localStorage.getItem('userCoins');
    return savedCoins !== null ? parseInt(savedCoins, 10) : 0;
  });
  
  const [coinHistory, setCoinHistory] = useState(() => {
    const savedHistory = localStorage.getItem('coinHistory');
    return savedHistory !== null ? JSON.parse(savedHistory) : [];
  });

  // Save to localStorage whenever coins change
  useEffect(() => {
    localStorage.setItem('userCoins', coins.toString());
  }, [coins]);
  
  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('coinHistory', JSON.stringify(coinHistory));
  }, [coinHistory]);

  // Add coins with transaction record
  const addCoins = (amount, source) => {
    if (amount <= 0) return;
    
    setCoins(prevCoins => prevCoins + amount);
    
    // Record transaction
    const transaction = {
      type: 'earned',
      amount,
      source,
      timestamp: new Date().toISOString()
    };
    
    setCoinHistory(prev => [transaction, ...prev].slice(0, 50)); // Keep last 50 transactions
  };

  // Spend coins with transaction record
  const spendCoins = (amount, reason) => {
    if (amount <= 0) return false;
    if (coins < amount) return false;
    
    setCoins(prevCoins => prevCoins - amount);
    
    // Record transaction
    const transaction = {
      type: 'spent',
      amount,
      reason,
      timestamp: new Date().toISOString()
    };
    
    setCoinHistory(prev => [transaction, ...prev].slice(0, 50));
    return true;
  };

  return (
    <CoinsContext.Provider value={{ coins, addCoins, spendCoins, coinHistory }}>
      {children}
    </CoinsContext.Provider>
  );
};

// Custom hook to use the coins context
export const useCoins = () => {
  const context = useContext(CoinsContext);
  if (context === undefined) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
};