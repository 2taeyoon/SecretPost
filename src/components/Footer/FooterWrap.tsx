import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../models/UserProviderContext';


const FooterWrap = () => {
    const location = useLocation();
    const user = useUser();
    const mypageImgStyle = {
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        border: '2px solid #eee',
    }
    const mypageImgBoderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '43px',
        height: '43px',
        borderRadius: '50%'
    }
    return (
        <div className='footer_wrap'>
            <Link to='/home'>
                <svg className={location.pathname === '/home' ? 'emphasis' : ''} viewBox="0 0 114.63 119.5">
                    <path
                        d="M57.82,6.89a9.56,9.56,0,0,1,12.36,0l47.76,40.52a9.56,9.56,0,0,1,3.37,7.29v59.88a9.55,9.55,0,0,1-9.55,9.55H75.14a4.78,4.78,0,0,1-4.77-4.78V79.55H57.63v39.8a4.78,4.78,0,0,1-4.77,4.78H16.24a9.55,9.55,0,0,1-9.55-9.55V54.7a9.56,9.56,0,0,1,3.37-7.29ZM64,14.18,16.24,54.7v59.88H48.08V74.78A4.78,4.78,0,0,1,52.86,70H75.14a4.78,4.78,0,0,1,4.78,4.78v39.8h31.84V54.7Z"
                        transform="translate(-6.69 -4.63)" />
                </svg>
            </Link>
            <Link to='/post'>
                <svg className={location.pathname === '/post' ? 'emphasis' : ''} viewBox="0 0 116.69 121">
                    <path
                        d="M110.72,124.5H17.28A11.64,11.64,0,0,1,5.66,112.87V15.13A11.64,11.64,0,0,1,17.28,3.5h93.44a11.64,11.64,0,0,1,11.62,11.63v97.74A11.64,11.64,0,0,1,110.72,124.5ZM17.28,13.5a1.63,1.63,0,0,0-1.62,1.63v97.74a1.63,1.63,0,0,0,1.62,1.63h93.44a1.62,1.62,0,0,0,1.62-1.63V15.13a1.62,1.62,0,0,0-1.62-1.63Z"
                        transform="translate(-5.66 -3.5)" />
                    <line x1="24.59" y1="33.25" x2="91.59" y2="33.25" />
                    <rect x="24.59" y="28.25" width="67" height="10" />
                    <line x1="25.09" y1="60.75" x2="92.09" y2="60.75" />
                    <rect x="25.09" y="55.75" width="67" height="10" />
                    <line x1="25.09" y1="87.75" x2="92.09" y2="87.75" />
                    <rect x="25.09" y="82.75" width="67" height="10" />
                </svg>
            </Link>
            <Link to='/upload'>
                <svg className={location.pathname === '/upload' ? 'emphasis' : ''} viewBox="0 0 120 120">
                    <path
                        d="M63.5,123.88a60,60,0,1,1,60-60A60.07,60.07,0,0,1,63.5,123.88Zm0-110a50,50,0,1,0,50,50A50.05,50.05,0,0,0,63.5,13.88Z"
                        transform="translate(-3.5 -3.88)" />
                    <rect x="30" y="55" width="60" height="10" />
                    <rect x="55" y="30" width="10" height="60" />
                </svg>
            </Link>
            <Link to='/mypage'>
                <div
                    className={location.pathname === '/mypage' ? 'emphasis_img' : ''}
                    style={mypageImgBoderStyle}>
                    { user && <img
                        className='mypage_img'
                        src={user.photoURL || undefined}
                        alt={user.photoURL || undefined}
                        style={mypageImgStyle}/>
                    }
                </div>
            </Link>
        </div>
    )
}

export default FooterWrap