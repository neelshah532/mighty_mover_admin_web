import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../app/store';
// import { userData } from '../assets/userData';

const ProtectedRoutes = () => {
    const user = useSelector((state: RootState) => state.user.user);

    // const user = localStorage.getItem('user');
    //
    // if (user) {
    //     const userObj = JSON.parse(user);
    //     const userExists = userData.find((u) => u.username === userObj.username);
    //     if (userExists?.role === 'admin') {
    //         return <Route path="/dashboard" element={<Admin />} />;
    //     }
    //     return <Navigate to="/login" />;
    // }

    return user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
