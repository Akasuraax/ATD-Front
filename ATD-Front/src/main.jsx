import React from 'react'
import ReactDOM from 'react-dom';
import App from './App.jsx'
import './index.css'
import {ToastContextProvider} from './components/Toast/ToastContex'
import AuthProvider from "./AuthProvider.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
        <ToastContextProvider>
                <App/>
        </ToastContextProvider>
        </AuthProvider>
    </React.StrictMode>,
)
