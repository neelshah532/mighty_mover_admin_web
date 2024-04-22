import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loader from './components/Loader';
import "./App.css"
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
const VIewAdmin = lazy(() => import('./components/VIewAdmin'));

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<FixedLayout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/orders" element={<Order_page />} />
                        <Route path="/payments" element={<Payment_page />} />
                        <Route path="/settings/order-settings" element={<Settings />} />
                        <Route path="/settings/blog-settings" element={<Blog />} />
                        <Route path="/settings/user-settings" element={<UserPage />} />
                        <Route path="/delivery-partner" element={<Delivery_partner />} />

                        <Route path="/categories" element={<CategoriePage />} />
                        <Route path="/categories/:id" element={<SubCategory />} />
                        <Route path="/city" element={<City />} />
                        <Route path="/coupon" element={<Coupon />} />
                        <Route path="/show_edit_delete" element={<Show_blog />} />
                        <Route path="/vehicle" element={<Vehicle />} />
                        <Route path="/admin" element={<VIewAdmin />} />
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
