import React from 'react';
import { Navigate } from 'react-router-dom';

const ReceptionRoute = ({ children }) => {
    const access = localStorage.getItem('access'); 

    if (!access || access !== 'reception') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ReceptionRoute;
