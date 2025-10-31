import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { ProtectedRoute, GuestRoute, AnyRoute, AdminAuthRoute, AdminGuestRoute } from './Guard';
import { Loading } from '../components/Tools/Misc';

const Routers = () => {
    const Index = lazy(() => import('../pages/Main/Index'));
    const Dashboard = lazy(() => import('../pages/Advisor/Auth/Dashboard'));

    // Admin
    const AdminLogin = lazy(() => import('../pages/Admin/Auth/Login'));
    const AdminDashboard = lazy(() => import('../pages/Admin/Dashboard'));

    // const { user, loading } = useUser();

    const urls = [
        { path: '/', element: <Index />, type: 'any' },

        { path: '/dashboard', element: <Dashboard />, type: 'auth' },

        { path: '/admin/login', element: <AdminLogin />, type: 'any', admin: true },
        { path: '/admin/dashboard', element: <AdminDashboard />, type: 'auth', admin: true },

        // catch-all 404 route (must be last)
        // { path: '*', element: <NotFound />, type: 'any' },
    ];

    return (
        <HelmetProvider>
            {/* <Router basename="/faeces_ai/public"> */}
            <Router>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {urls.map(({ path, element, type, admin }) => {
                            const Guard = admin
                                ? type === 'auth'
                                    ? AdminAuthRoute
                                    : AdminGuestRoute
                                : type === 'auth'
                                ? ProtectedRoute
                                : type === 'guest'
                                ? GuestRoute
                                : AnyRoute;
                            return (
                                <Route
                                    key={path}
                                    path={path}
                                    element={
                                        <Guard>
                                            {element}
                                        </Guard>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Suspense>
                <ToastContainer />
            </Router>
        </HelmetProvider>
    );
};

export default Routers;