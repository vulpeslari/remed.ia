import React from 'react';
import { Navigate } from 'react-router-dom';

const DoctorRoute = ({ children }) => {
    const access = localStorage.getItem('access'); 

    if (!access || access !== 'doctor') {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default DoctorRoute;
