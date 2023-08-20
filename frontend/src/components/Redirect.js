import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, []);

    return (
        <h1 className='text-center'>Redirecting to you in login page</h1>
    )
}

export default Redirect;