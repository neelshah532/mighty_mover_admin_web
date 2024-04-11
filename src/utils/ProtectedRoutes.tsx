import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
// import { userData } from '../assets/userData';

const ProtectedRoutes = () => {
    const { user } = useSelector((state) => state);

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

    return user.user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
