import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { userInfo } = useSelector((state) => state.auth); // Get user info from Redux state
    const token = document.cookie; // Check for token in cookies
    const location = useLocation(); // Current location

    // Check if user is logged in
    if (userInfo && token) {
        return children; // Render the protected component
    }

    // Redirect to login page with state for redirection after login
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
