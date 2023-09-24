import React from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import Upload from './pages/Upload/Upload';
import Mypage from './pages/Mypage/Mypage';
import NotFound from './pages/NotFound';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import { useUser } from './components/models/UserProviderContext';
import Header from './components/Header/Header';


const App = () => {
    const location = useLocation();
    const user = useUser();
    const allowedPaths: string[] = ['/home', '/post', '/upload', '/mypage'];

    if(user == null && !allowedPaths.includes(location.pathname)){
        return <Navigate to='/'/>;
    }

    return (
        <div className="App">
            { allowedPaths.includes(location.pathname) && <Header/> }
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/post" element={<Post />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            { allowedPaths.includes(location.pathname) && <Footer/> }
        </div>
    );
}

export default App