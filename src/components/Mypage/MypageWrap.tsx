import React from 'react'
import MypageTop from './MypageTop'
import { useUser } from '../models/UserProviderContext'

const MypageWrap = () => {
    const user = useUser();
    return (
        <div className='mypage_wrap'>
            <MypageTop user={user}/>
        </div>
    )
}

export default MypageWrap