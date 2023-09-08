import React, {useEffect} from 'react';
import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Post from './pages/Post/Post';
import Upload from './pages/Upload/Upload';
import Mypage from './pages/Mypage/Mypage';
import NotFound from './pages/NotFound';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';

const stringUser: string | null = localStorage.getItem('user');
export const getUser = stringUser ? JSON.parse(stringUser) : null;

const App = () => {
    const location = useLocation();
    const showFooter = location.pathname === '/home' || location.pathname === '/post' || location.pathname === '/upload' || location.pathname === '/mypage';

    const navigate = useNavigate();
    useEffect(()=>{
        if(!getUser){
            navigate('/');
        }
    },[navigate])

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/post" element={<Post />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            { showFooter && <Footer/> }
        </div>
    );
}

export default App