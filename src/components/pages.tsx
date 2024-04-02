import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
// import Home from '../pages/Home';
import Admin from '../pages/admin';

function Pages() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Admin />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default Pages;
