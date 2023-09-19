import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts/pretendard.css'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserProviderContext from './components/models/UserProviderContext';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProviderContext>
                <App/>
            </UserProviderContext>
        </BrowserRouter>
    </React.StrictMode>
);