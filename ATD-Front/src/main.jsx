import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import {ToastContextProvider} from './components/Toast/ToastContex'
import AuthProvider from "./AuthProvider.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <ToastContextProvider>
            <App/>
        </ToastContextProvider>
    </AuthProvider>
)
