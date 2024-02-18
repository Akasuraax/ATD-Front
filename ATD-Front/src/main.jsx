import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx'
import './index.css'
import { ToastContextProvider } from './components/Toast/ToastContex'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ToastContextProvider>
            <App/>
        </ToastContextProvider>
    </React.StrictMode>,
)
