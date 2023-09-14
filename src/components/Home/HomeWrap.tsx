import React, { useEffect, useState } from "react";
import { auth } from '../api/firebase';
import { UserProps } from '../models/PropsType';


const HomeWrap = () => {
    const [user, setUser] = useState<UserProps | null>(null); // 사용자 정보를 저장할 상태 변수

    useEffect(() => {
        // Firebase에서 현재 로그인된 사용자 정보 가져오기
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // 사용자가 로그인되어 있으면 사용자 정보를 상태에 저장
                setUser(authUser);
                console.log('로그인한user',user)
            } else {
                // 사용자가 로그아웃되어 있으면 사용자 정보를 초기화
                setUser(null);
            }
        });

        // 컴포넌트 언마운트 시에 구독 해제
        return () => {
            unsubscribe();
        };
    }, [user]);

    return (
        <div className='home_wrap'>
            {user ? (
                <div>
                    <h2>현재 로그인된 사용자 정보:</h2>
                    <p>이름: {user.displayName}</p>
                    <p>이메일: {user.email}</p>
                    <img src={user.photoURL || undefined} alt={user.displayName || undefined} />
                </div>
            ) : (
                <p>로그인되지 않았습니다.</p>
            )}
        </div>
    )
}

export default HomeWrap;