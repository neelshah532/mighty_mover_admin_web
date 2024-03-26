import { useLayoutEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Pages from './components/pages';
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen bg-white overflow-hidden">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <Routes>
            {!isLoggedIn ? <Route path="/login" element={<Login />} /> : <Route path="*" element={<Pages />} />}
            {/* Redirect to login if not logged in */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
