import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../src/Component/Context/AuthContext';

const ProtectedRoute = ({ requiredRole, children }) => {
  const { auth } = useAuth();

  if (!auth.isAuthenticated) {
    // Not logged in, redirect to login page
    return <Navigate to="/admin" />;
  }

  if (requiredRole && auth.user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  // User is authenticated and authorized, render the child component
  return children;
};

export default ProtectedRoute;
