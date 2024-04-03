import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const user = localStorage.getItem('user');

    return !user ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
