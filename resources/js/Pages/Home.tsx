import React from 'react';
import './index.css'
import './App.css'
import HomePage from './pages/home.page/index.tsx'
import { ChartProvider } from './components/templates/provider.tsx'

function Home() {
    return (
        <div id='app'>
            <React.StrictMode>
                <ChartProvider>
                    <HomePage />
                </ChartProvider>
            </React.StrictMode>
        </div>
    )
}

export default Home;
