import React from 'react';
import { Navigate } from 'react-router-dom';

const Guest = ({ children }) => {

    const data = JSON.parse(localStorage.getItem("userInfo"));

    if (!data) {
        return children;
    }

    return <Navigate to="/chats" replace />
}

export default Guest;