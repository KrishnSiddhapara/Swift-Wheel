import React from 'react';
import { Navigate } from 'react-router-dom';
import { useData } from '../context/DataProvider';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useData();

    if (loading) {
        return null; // Or a loading spinner if preferred
    }

    const storedRole = localStorage.getItem('role');
    const role = user?.role || storedRole;

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
