import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider, Outlet } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Login from './pages/connection/Login';
import Register from './pages/connection/Register';
import NotFound from './pages/notFound/NotFound';

export default function App() {

    const user = false;

    const queryClient = new QueryClient();

    const Layout = ({ children }) => {
        return (
            <QueryClientProvider client={queryClient}>
                <>
                    <Header />
                    {children}
                </>
            </QueryClientProvider>
        );
    };

    const PrivateRoute = ({ component }) => {
        if (!user) {
            return <Navigate to='/login' />;
        }
        return component;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout><Outlet /></Layout>,
            children: [
                {
                    path: "/",
                    element: <PrivateRoute component={<Home />} />
                },
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                }
            ]
        },
        {
            path: "*",
            element: <NotFound />
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}