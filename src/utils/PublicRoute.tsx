import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';

const PublicRoute = () => {
    const user  = useSelector((state: RootState) => state.user.user);
    

    return !user.token ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
