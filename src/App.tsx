import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import './App.css';
import { useSelector } from 'react-redux';
import { RootState } from './assets/dto/data.type';

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
// import Staff from './components/Staff';
// import Role_management from './components/Role_management';
function App() {
    const rolePermission = useSelector((state: RootState) => state.rolePermission.roles[0].permission);
    // console.log(rolePermission);
    // const sectionName = [
    //     'order',
    //     'payment',
    //     'settings',
    //     'blog',
    //     'delivery-partner',
    //     'categories',
    //     'city',
    //     'coupon',
    //     'show_edit_delete',
    //     'vehicle',
    //     'staff-management',
    //     'staff-management/role-management',
    //     'staff-management/add',
    //     'staff-management',
    // ];
    // // const section = rolePermission[0].section.includes(sectionName.join(','));

    // const sectionPermission = sectionName.filter((name) => rolePermission[0].section.includes(name));
    // console.log(sectionPermission);
    console.log(rolePermission);
    const sectionPermission = rolePermission.map((role) => role.section);

    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<FixedLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        {sectionPermission.includes('order') && <Route path="/orders" element={<Order_page />} />}
                        {sectionPermission.includes('payment') && <Route path="/payments" element={<Payment_page />} />}
                        <Route path="/settings/order-settings" element={<Settings />} />
                        <Route path="/settings/blog-settings" element={<Blog />} />
                        <Route path="/settings/user-settings" element={<UserPage />} />
                        {sectionPermission.includes('delivery partner') && (
                            <Route path="/delivery-partner" element={<Delivery_partner />} />
                        )}
                        {sectionPermission.includes('categories') && (
                            <Route path="/categories" element={<CategoriePage />} />
                        )}
                        {sectionPermission.includes('subcategory') && (
                            <Route path="/categories/:id" element={<SubCategory />} />
                        )}
                        {sectionPermission.includes('city') && <Route path="/city" element={<City />} />}
                        {sectionPermission.includes('coupon') && <Route path="/coupon" element={<Coupon />} />}
                        {sectionPermission.includes('blog') && (
                            <Route path="/show_edit_delete" element={<Show_blog />} />
                        )}{' '}
                        {sectionPermission.includes('vehicle') && <Route path="/vehicle" element={<Vehicle />} />}
                        {sectionPermission.includes('staff management') && (
                            <Route path="/staff-management" element={<StaffManagement />} />
                        )}
                        {sectionPermission.includes('role-managemnet') && (
                            <Route path="/staff-management/role-management" element={<Role_management />} />
                        )}
                        {sectionPermission.includes('addAdmin') && (
                            <Route path="/staff-management/add" element={<AdminAdd />}></Route>
                        )}
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
