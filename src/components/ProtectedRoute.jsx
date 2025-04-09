// src/components/ProtectedRoute.jsx
// This component is used to protect routes that require authentication

import React from 'react';
import { Component } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useOCAuthState } from '../hooks/useOCAuthState';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useOCAuthState();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/" replace />}
    />
  );
};

export default ProtectedRoute;