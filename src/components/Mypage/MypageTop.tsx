import React, { useEffect, useState } from 'react'
import { UserContextType } from '../models/PropsType'
import { doc, getDoc, getFirestore } from 'firebase/firestore';

type MypageTopProps = {
    user: UserContextType;
}

const MypageTop = ({user}: MypageTopProps) => {
    const [ introduce, setIntroduce ] = useState<string | null>(null);
    const [ editedIntroduce, setEditedIntroduce ] = useState<string | null>(null);
    const [ isEditing, setIsEditing ] = useState<boolean>(false);

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

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleCancelClick = () => {
        setIsEditing(false);
    }

    return (
        <div className='mypage_top'>
            <div className='photo'>
                <img
                    src={user?.photoURL || undefined}
                    alt={user?.photoURL || undefined}
                />
            </div>
            <div className='email'>{ user?.email }</div>
            <div className='logout'>
                <button>로그아웃</button>
            </div>
            <div className='introduce'>
                {isEditing ? (
                    <textarea
                        className='introduce_edit introduce_text'
                        value={editedIntroduce || ''}
                        onChange={(e) => setEditedIntroduce(e.target.value)}
                        rows={4}
                    />
                ) : (
                    <div className='introduce_content introduce_text'>{introduce ? introduce : '당신의 소개 공간입니다.'}</div>
                )}
            </div>
            { isEditing ? (
                <div className='introduce_modify'>
                    <button>저장</button>
                    <button onClick={handleCancelClick}>취소</button>
                </div>
            ) : (
                <div className='introduce_modify'>
                    <button onClick={handleEditClick}>수정</button>
                </div>
            )}
        </div>
    )
}

export default MypageTop