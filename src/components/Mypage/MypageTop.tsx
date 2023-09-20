import React, { useEffect, useState } from 'react'
import { UserContextType } from '../models/PropsType'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import PhotoWrap from './PhotoWrap';
import Setting from './Setting';

type MypageTopProps = {
    user: UserContextType;
}

const MypageTop = ({user}: MypageTopProps) => {
    const [ introduce, setIntroduce ] = useState<string | null>(null);

    useEffect(()=>{
        const fetchIntroduce = async () => {
            if(user && user?.uid) {
                const userDocRef = doc(getFirestore(), 'users', user.uid);
                const docSnap = await getDoc(userDocRef);

                if(docSnap.exists()){
                    const userData = docSnap.data();
                    if(userData && userData.introduce){
                        setIntroduce(userData.introduce);
                    }
                }
            }
        };

        fetchIntroduce();
    },[user]);

    return (
        <div className='mypage_top'>
            <PhotoWrap user={user}/>
            <div className='user_infomation'>
                <div className='email_setting_wrap'>
                    <div className='email'>{ user?.email }</div>
                    <Setting />
                </div>
                <div className='introduce_text'>{introduce ? introduce : '당신의 소개 공간입니다.'}</div>
            </div>
        </div>
    )
}

export default MypageTop