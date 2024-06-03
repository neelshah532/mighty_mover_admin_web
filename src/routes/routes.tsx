import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../assets/dto/data.type';
import { Route, Routes } from 'react-router-dom';

const VehiclePrices = lazy(() => import('../components/VehiclePrices'));
const AddNotificationDetails = lazy(() => import('../components/AddNotificationDetails'));
const Login = lazy(() => import('../pages/Login'));
const ProtectedRoutes = lazy(() => import('../utils/ProtectedRoutes'));
const PublicRoute = lazy(() => import('../utils/PublicRoute'));
const Settings = lazy(() => import('../components/Settings'));
const Dashboard = lazy(() => import('../components/Dashboard'));
const Order_page = lazy(() => import('../components/Order_page'));
const Payment_page = lazy(() => import('../components/Payment_page'));
const Blog = lazy(() => import('../components/Blog'));
const FixedLayout = lazy(() => import('../components/Layout'));
const UserPage = lazy(() => import('../components/UserTable'));
const CategoriePage = lazy(() => import('../components/CategoriePage'));
const SubCategory = lazy(() => import('../components/SubCategory'));
const City = lazy(() => import('../components/City'));
const Coupon = lazy(() => import('../components/Coupon'));
const Show_blog = lazy(() => import('../components/Show_blog'));
const Vehicle = lazy(() => import('../components/Vehicle'));
const StaffManagement = lazy(() => import('../components/Staff'));
const AdminAdd = lazy(() => import('../components/AdminAdd'));
const Role_management = lazy(() => import('../components/Role_management'));
const DriverTable = lazy(() => import('../components/DriverTable'));
const Notifications = lazy(() => import('../components/Notifications'));
const IndividualNotificationDetails = lazy(() => import('../components/IndividualNotificationDetails'));
const Role_data = lazy(() => import('../components/Role_data'));
const PaymentDisplay = lazy(() => import('../components/paymentDisplay'));

function PageRoutes() {
    const rolePermission = useSelector((state: RootState) => state.rolePermission.permission);
    const superadminPermission = useSelector((state: any) => state.user);
    console.log(superadminPermission);
    const routeFunc = ({ path, element, permission, isAdmin }: any) => {
        // console.log('permission', permission);
        return (rolePermission?.includes(permission) || isAdmin) && <Route path={path} element={element} />;
    };
    // console.log('rolePermission', rolePermission);
    // console.log('superadminPermission', superadminPermission);
    return (
        <>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<FixedLayout />}>
                        {routeFunc({
                            path: '/',
                            element: <Dashboard />,
                            permission: 'dashboard',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/categories',
                            element: <CategoriePage />,
                            permission: 'categories',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/orders',
                            element: <Order_page />,
                            permission: 'order',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/payments',
                            element: <Payment_page />,
                            permission: 'payment',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/settings/order-settings',
                            element: <Settings />,
                            permission: 'settings',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/blog/add',
                            element: <Blog />,
                            permission: 'blog',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/user-management',
                            element: <UserPage />,
                            permission: 'user management',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/categories/:id',
                            element: <SubCategory />,
                            permission: 'subcategory',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/city',
                            element: <City />,
                            permission: 'city',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/coupon',
                            element: <Coupon />,
                            permission: 'coupon',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/blog',
                            element: <Show_blog />,
                            permission: 'blog',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/vehicle',
                            element: <Vehicle />,
                            permission: 'vehicle',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/staff-management',
                            element: <StaffManagement />,
                            permission: 'staff management',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/staff-management/role-management/add',
                            element: <Role_management />,
                            permission: 'role management',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/staff-management/add',
                            element: <AdminAdd />,
                            permission: 'staff management',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/staff-management/role-management',
                            element: <Role_data />,
                            permission: 'addAdmin',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/drivers',
                            element: <DriverTable />,
                            permission: 'drivers',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/notifications',
                            element: <Notifications />,
                            permission: 'notification',
                            isAdmin: superadminPermission,
                        })}
                        {routeFunc({
                            path: '/notifications/:id',
                            element: <IndividualNotificationDetails />,
                            permission: 'notification',
                            isAdmin: superadminPermission,
                        })}
                        <Route path="/add-notification/details" element={<AddNotificationDetails />} />
                        <Route path="/vehicle-prices" element={<VehiclePrices />} />
                        <Route path="/paymentsDisplay" element={<PaymentDisplay />} />
                    </Route>
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </>
    );
}

export default PageRoutes;
