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
    const [ nickname, setNickname ] = useState<string | null>(null);

    useEffect(()=>{
        const fetchIntroduce = async () => {
            if(user && user?.uid) {
                const userDocRef = doc(getFirestore(), 'users', user.uid);
                const docSnap = await getDoc(userDocRef);
                const userData = docSnap.data();

                if(docSnap.exists()){
                    if(userData && userData.nickname){
                        setNickname(userData.nickname);
                    }
                }

                if(docSnap.exists()){
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
                    <div className='email'>{ nickname ? nickname : user?.email }</div>
                    <Setting user={user}/>
                </div>
                <div className='post_count'>
                    <div>게시글 0</div>
                    <div>공유 0</div>
                </div>
                <div className='introduce_text'>{introduce ? introduce : '당신의 소개 공간입니다.'}</div>
            </div>
        </div>
    )
}

export default MypageTop