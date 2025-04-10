// src/components/CoinsDisplay.jsx

import React from 'react';
import { FaCoins } from 'react-icons/fa';
import PropTypes from 'prop-types';

const CoinsDisplay = ({ coins, size = 'md', showText = true, className = '' }) => {
  // Size configurations
  const sizeClasses = {
    xs: {
      container: 'px-2 py-1',
      icon: 'text-sm',
      coinsText: 'text-sm',
      label: 'text-xs'
    },
    sm: {
      container: 'px-3 py-1.5',
      icon: 'text-base',
      coinsText: 'text-base',
      label: 'text-xs'
    },
    md: {
      container: 'px-4 py-2',
      icon: 'text-lg',
      coinsText: 'text-lg',
      label: 'text-sm'
    },
    lg: {
      container: 'px-6 py-3',
      icon: 'text-xl',
      coinsText: 'text-xl',
      label: 'text-base'
    },
    xl: {
      container: 'px-8 py-4',
      icon: 'text-2xl',
      coinsText: 'text-2xl',
      label: 'text-lg'
    }
  };

  const { container, icon, coinsText, label } = sizeClasses[size] || sizeClasses.md;

  // Format large numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div 
      className={`flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg shadow ${container} ${className}`}
    >
      <FaCoins className={`${icon} text-amber-100`} />
      <span className={`${coinsText} font-bold`}>{formatNumber(coins)}</span>
      {showText && <span className={`font-medium ${label}`}>Coins</span>}
    </div>
  );
};

CoinsDisplay.propTypes = {
  coins: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  showText: PropTypes.bool,
  className: PropTypes.string
};

export default CoinsDisplay;