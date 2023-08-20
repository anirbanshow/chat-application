import React from 'react';
import { Navigate } from 'react-router-dom';

const Private = ({ children }) => {

    const data = JSON.parse(localStorage.getItem("userInfo"));

    if (!data) {
        return <Navigate to="/" replace />
    }

    return children;
}

export default Private;