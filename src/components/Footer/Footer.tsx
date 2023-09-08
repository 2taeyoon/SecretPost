import React from 'react'
import './Footer.scss'
import FooterWrap from './FooterWrap'
import { getUser } from '../../App'

const Footer = () => {
    console.log('Footer에서 가져온 getUser', getUser);
    return (
        <div className='Footer'>
            <FooterWrap/>
        </div>
    )
}

export default Footer