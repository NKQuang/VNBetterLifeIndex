import React from 'react';
import './index.css'
import './App.css'
import HomePage from './pages/home.page/index.tsx'
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
    const routes = [
        {
            path: '/',
            element: <HomePage />, // home
        },
    ];

    return (
        <div id='app'>
            <React.StrictMode>
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={`route-${index.toString()}`}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </React.StrictMode>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Home;
