import React from 'react';
import './index.css'
import './App.css'
import HomePage from './pages/home.page/index.tsx'
import { ChartProvider } from './components/templates/provider.tsx'
import { Route, Routes } from 'react-router-dom';

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
                <ChartProvider>
                    <Routes>
                        {routes.map((route, index) => (
                            <Route
                                key={`route-${index.toString()}`}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                </ChartProvider>
            </React.StrictMode>
        </div>
    )
}

export default Home;
