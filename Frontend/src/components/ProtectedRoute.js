// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        // Redirect to login page if token is not present
        return <Navigate to="/login" replace />;
    }

    // Render the protected component if token exists
    return children;
};

export default ProtectedRoute;
