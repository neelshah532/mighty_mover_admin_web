// import { useLayoutEffect, useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Pages from './components/pages';
// function App() {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     useLayoutEffect(() => {
//         const user = sessionStorage.getItem('user');
//         if (user) {
//             setIsLoggedIn(true);
//         }
//         setIsLoading(false);
//     }, []);

//     if (isLoading) {
//         return (
//             <div className="h-screen bg-white overflow-hidden">
//                 <h1>Loading...</h1>
//             </div>
//         );
//     }

//     return (
//         <Routes>
//             {!isLoggedIn ? <Route path="/login" element={<Login />} /> : <Route path="*" element={<Pages />} />}
//             {/* Redirect to login if not logged in */}
//             <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//     );
// }

// export default App;

import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './utils/ProtectedRoutes';
// import Admin from './pages/admin';
import PublicRoute from './utils/PublicRoute';
import '.././src/App.css';
import Settings from './components/Settings';
import Dashboard from './components/Dashboard';
import Order_page from './components/Order_page';
import Payment_page from './components/Payment_page';
import Blog from './components/Blog';
import Delivery_partner from './components/Delivery_partner';
import FixedLayout from './components/Layout';
import UserPage from './components/UserTable';
import { LineChart } from './components/linechart';
import CategoriePage from './components/CategoriePage';
import SubCategory from './components/SubCategory';
import City from './components/City';
import Coupon from './components/Coupon';
import Show_blog from './components/Show_blog';
import Vehicle from './components/Vehicle';
import VIewAdmin from './components/VIewAdmin';
function App() {
    return (
        <>
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
                        <Route path="/linechart" element={<LineChart />} />
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
                {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            </Routes>
        </>
    );
}

export default App;
