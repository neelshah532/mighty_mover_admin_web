import React from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user session
        sessionStorage.removeItem('user');
        // Redirect to login page
        navigate('/login');
        message.success('You have been logged out');
    };

    return (
        <div>
            <h2>Welcome to Home</h2>
            <Button type="primary" onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
};

export default Home;
