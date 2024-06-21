import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/home.page/index.tsx'
import HomePage from './pages/home.page/index.tsx'
import './index.css'
import { ChartProvider } from './components/templates/provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChartProvider>
      <App />
    </ChartProvider>
  </React.StrictMode>,
)
