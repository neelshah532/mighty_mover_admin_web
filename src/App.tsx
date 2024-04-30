import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Loader from './components/Loader';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './app/store';
import { RootState } from './assets/dto/data.type';
import { resetState } from './redux/roleSlice';
import AddNotification from './components/AddNotification';
import AddNotificationDetails from './components/AddNotificationDetails';

const Login = lazy(() => import('./pages/Login'));
const ProtectedRoutes = lazy(() => import('./utils/ProtectedRoutes'));
const PublicRoute = lazy(() => import('./utils/PublicRoute'));
const Settings = lazy(() => import('./components/Settings'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Order_page = lazy(() => import('./components/Order_page'));
const Payment_page = lazy(() => import('./components/Payment_page'));
const Blog = lazy(() => import('./components/Blog'));
const Delivery_partner = lazy(() => import('./components/Delivery_partner'));
const FixedLayout = lazy(() => import('./components/Layout'));
const UserPage = lazy(() => import('./components/UserTable'));
const CategoriePage = lazy(() => import('./components/CategoriePage'));
const SubCategory = lazy(() => import('./components/SubCategory'));
const City = lazy(() => import('./components/City'));
const Coupon = lazy(() => import('./components/Coupon'));
const Show_blog = lazy(() => import('./components/Show_blog'));
const Vehicle = lazy(() => import('./components/Vehicle'));
const StaffManagement = lazy(() => import('./components/Staff'));
const AdminAdd = lazy(() => import('./components/AdminAdd'));
const Role_management = lazy(() => import('./components/Role_management'));
const DriverTable = lazy(() => import('./components/DriverTable'))
const Notifications = lazy(() => import('./components/Notifications'))
const IndividualNotificationDetails = lazy(() => import('./components/IndividualNotificationDetails'))
const Role_data = lazy(() => import('./components/Role_data'));
const PaymentDisplay = lazy(() => import('./components/paymentDisplay'));
// import Staff from './components/Staff';
// import Role_management from './components/Role_management';
function App() {
    // const user = useSelector((state: RootState) => state.user.user);
    const rolePermission = useSelector((state: RootState) => state.rolePermission.permission);
    console.log('rolePermission', rolePermission);

    // console.log(user);
    // const sectionPermission = user.map((role: any) => role.section);
    // const sectionPermission = user.permission ? user.permission.map((role) => role.sectionName) : [];
    const sectionPermission = rolePermission?.map((role) => role.section);

    console.log('sectionPermission', sectionPermission);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<FixedLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/paymentsDisplay" element={<PaymentDisplay />} />
                        {sectionPermission?.includes('order') && <Route path="/orders" element={<Order_page />} />}
                        {sectionPermission?.includes('payment') && (
                            <Route path="/payments" element={<Payment_page />} />
                        )}
                        <Route path="/settings/order-settings" element={<Settings />} />
                        {sectionPermission?.includes('blog') && <Route path="/blog/add" element={<Blog />} />}
                        {sectionPermission?.includes('user managment') && (
                            <Route path="/user-management" element={<UserPage />} />
                        )}
                        {sectionPermission?.includes('delivery partner') && (
                            <Route path="/delivery-partner" element={<Delivery_partner />} />
                        )}
                        {sectionPermission?.includes('categories') && (
                            <Route path="/categories" element={<CategoriePage />} />
                        )}
                        {sectionPermission?.includes('subcategory') && (
                            <Route path="/categories/:id" element={<SubCategory />} />
                        )}
                        {sectionPermission?.includes('city') && <Route path="/city" element={<City />} />}
                        {sectionPermission?.includes('coupon') && <Route path="/coupon" element={<Coupon />} />}
                        {sectionPermission?.includes('blog') && (
                            <Route path="/show_edit_delete" element={<Show_blog />} />
                        )}
                        {sectionPermission?.includes('vehicle') && <Route path="/vehicle" element={<Vehicle />} />}
                        {sectionPermission?.includes('staff management') && (
                            <Route path="/staff-management" element={<StaffManagement />} />
                        )}
                        {sectionPermission?.includes('role-managemnet') && (
                            <Route path="/staff-management/role-management" element={<Role_management />} />
                        )}
                        {sectionPermission?.includes('staff management') && (
                            <Route path="/staff-management/add" element={<AdminAdd />}></Route>
                        )}
                        {sectionPermission?.includes('addAdmin') && (
                            <Route path="/staff-management/role-management/add" element={<Role_data />}></Route>
                        )}

                        <Route path='/drivers' element={<DriverTable />}></Route>
                        {sectionPermission?.includes('notification') && <Route path='/notifications' element={<Notifications />}></Route>}
                        {sectionPermission?.includes('notification') && <Route path='/notifications/:id' element={<IndividualNotificationDetails />}></Route>}
                        <Route path='/add-notification' element={<AddNotificationDetails/>}></Route>
                    </Route>
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
