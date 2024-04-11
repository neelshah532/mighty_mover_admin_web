import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const { user } = useSelector((state) => state);
    

    return !user.user.token ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
