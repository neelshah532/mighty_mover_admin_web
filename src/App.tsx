import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './components/Loader';
import './App.css';
import { useDispatch } from 'react-redux';
// import { RootState } from './assets/dto/data.type';
import { resetState } from './redux/roleSlice';
import PageRoutes from './routes/routes';

function App() {
    // const rolePermission = useSelector((state: RootState) => state.rolePermission.permission);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const superadminPermission = useSelector((state: RootState) => state.user.user.is_super_admin);

    // const routeFunc = ({ path, element, permission, isAdmin }: any) => {
    //     return (rolePermission.includes(permission) || isAdmin) && <Route path={path} element={element} />;
    // };

    useEffect(() => {
        console.log('localState');
        const localState = localStorage.getItem('user');
        if (!localState) {
            dispatch(resetState());
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return (
        <Suspense fallback={<Loader />}>
            <PageRoutes />
        </Suspense>
    );
}

export default App;

