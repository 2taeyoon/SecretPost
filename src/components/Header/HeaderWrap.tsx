import React from 'react'
import { Link } from 'react-router-dom'

const HeaderWrap = () => {
    return (
        <div className='header_wrap'>
            <Link to='/home'>
                <div className='header_logo' style={{ backgroundImage: 'url(./image/secret_post_text_logo.png)' }}></div>
            </Link>
        </div>
    )
}

export default HeaderWrap