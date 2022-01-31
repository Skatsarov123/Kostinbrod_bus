import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import React from "react";

const GuardedRoute = () => {
    const { isAuthenticated } = useAuthContext();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default GuardedRoute;