import React, { useReducer } from 'react'
import SettingPopUp from './SettingPopUp'
import { UserContextType } from '../models/PropsType'
import { InputNickname, PopUpLogout, TextareaIntroduce } from './NicknameIntroduceLogout';
import PopUpBtn from './PopUpBtn';
import { settingInitialState, settingReducer } from '../models/Reducer';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { LogoutHandler } from '../api/firebase';

type SettingUser = {
    user: UserContextType;
}

const Setting = ({user}: SettingUser) => {
    const [state, dispatch] = useReducer(settingReducer, settingInitialState);
    const { isSetting, popUp, popUpContent, nicknameText, introduceText } = state;

    // 설정 토글 버튼
    const handleSettingClick = () => {
        dispatch({ type: 'SET_IS_SETTING' });
    }

    // 설정 토글에서 '닉네임', '소개', '로그아웃' 버튼
    const handlePopUpClick = (content: string | undefined) => {
        dispatch({ type: 'SET_POP_UP' });
        dispatch({ type: 'SET_POP_UP_CONTENT', payload: content });
    }

    // '닉네임', '소개', '로그아웃' 팝업창 안에서 취소 버튼
    const handlePopUpCancel = () => {
        dispatch({ type: 'SET_IS_SETTING' });
        dispatch({ type: 'SET_POP_UP' });
        dispatch({ type: 'SET_POP_UP_CONTENT', payload: undefined });
        dispatch({ type: 'SET_NICKNAME_TEXT', payload: undefined });
        dispatch({ type: 'SET_INTRODUCE_TEXT', payload: undefined });
    }

    // 확인 버튼 클릭시 유효성 검사 및 FireStore 접근
    const handlePopUpValidation = async () => {
        //user가 null일 경우 예외 처리
        if (!user || !user.uid) {
            return;
        }
        const userDocRef = doc(getFirestore(), 'users', user.uid);

        if(popUpContent === '닉네임 변경') {
            if(
                nicknameText !== ''
                && /^[A-Za-z0-9_]+$/.test(nicknameText)
                && /^\S+$/.test(nicknameText)
                && 5 <= nicknameText.length
                && nicknameText.length <= 10
            ){
                await setDoc(userDocRef, { nickname: nicknameText }, { merge: true });
                window.location.reload();
            } else {
                alert('닉네임은 5자~10자 영문, 숫자, _만 입력이 가능하며, 공백을 포함할 수 없습니다.');
                dispatch({ type: 'SET_NICKNAME_TEXT', payload: '' });
            }
        } else if (popUpContent === '소개 변경') {
            if (
                    introduceText !== ''
                    && introduceText.length <= 100
                ) {
                await setDoc(userDocRef, { introduce: introduceText }, { merge: true });
                window.location.reload();
            } else {
                alert('소개는 100글자 이내로 작성이 가능합니다.');
                dispatch({ type: 'SET_INTRODUCE_TEXT', payload: '' });
            }
        } else {
            LogoutHandler();
        }
    }

    return (
        <div>
            <div className='setting'>
                <svg onClick={handleSettingClick} viewBox="0 0 120 120" fill='#4A9999' width="25" height="25">
                    <path d="m14.3 71.1c-1.2-0.8-2.8-1.4-4.4-1.4-4.5 0-7.9-3.4-7.9-7.8v-4.4c0-2.2 0.8-4.2 2.2-5.6 1.6-1.4 3.4-2.2 5.7-2.2 2.7 0 5-1.3 6.5-3.4q0.2-0.9 0.5-1.8c0-0.2 0.2-0.4 0.2-0.6 0-0.2 0.2-0.4 0.2-0.6 0-0.2 0.2-0.4 0.2-0.6 0.2-0.4 0.2-0.6 0.4-1 0.2-0.6 0.4-1 0.7-1.6v-0.2q0.6-1.2 1.3-2.5c0-2.1-0.9-4.2-2.4-5.7-3-3-3-8 0-11l3.3-3.2c3-3 8.1-3 11.1 0 1.6 1.6 3.8 2.4 6.1 2.2q1-0.5 2-1h0.2c0.6-0.2 1-0.4 1.6-0.6 0.4-0.2 0.6-0.2 1-0.4 0.2 0 0.4-0.2 0.6-0.2 0.2 0 0.4-0.2 0.6-0.2 0.2 0 0.4-0.2 0.6-0.2q0.6-0.2 1.2-0.4c1.1-0.6 2.2-1.4 2.8-2.4 0.9-1.2 1.5-2.8 1.5-4.4 0-4.4 3.4-7.8 7.8-7.8h4.5c2.2 0 4.2 0.8 5.6 2.2 1.5 1.6 2.3 3.4 2.3 5.6 0 3.3 1.8 5.9 4.9 7.1-4.7-1.5-9.6-2.5-14.8-2.5q-0.1 0-0.2 0c5.3 0.1 10.3 1 15.1 2.6 0.2 0 0.4 0.2 0.6 0.2 0.2 0 0.4 0.2 0.6 0.2 0.2 0 0.4 0.2 0.6 0.2 0.4 0.2 0.6 0.2 1 0.4 0.6 0.2 1 0.4 1.7 0.6h0.2q1 0.5 2 1.1c2.3 0.2 4.8-0.6 6.4-2.3 3.1-3 8.1-3 11.1 0l3.3 3.2c3 3 3 8 0 11-1.8 1.8-2.5 4.3-2.1 6.8q0.3 0.7 0.7 1.4v0.2c0.2 0.6 0.4 1 0.6 1.6 0.2 0.4 0.2 0.6 0.4 1 0 0.2 0.2 0.4 0.2 0.6 0 0.2 0.2 0.4 0.2 0.6 0 0.4 0.2 0.4 0.2 0.6 1.6 4.8 2.6 9.8 2.6 15.2 0 5.4-1 10.4-2.6 15.2 0 0.2-0.2 0.4-0.2 0.6 0 0.2-0.2 0.4-0.2 0.6 0 0.2-0.2 0.4-0.2 0.6-0.2 0.4-0.2 0.6-0.4 1-0.2 0.6-0.4 1-0.6 1.6v0.2q-0.4 0.9-0.9 1.7c-0.3 2.3 0.6 4.8 2.3 6.5 3 3.2 3 8 0 11l-3.3 3.2c-3 3-8 3-11.1 0-1.7-1.7-4.1-2.4-6.6-2.1q-0.9 0.5-1.8 0.9h-0.2c-0.7 0.2-1.1 0.4-1.7 0.6-0.4 0.2-0.6 0.2-1 0.4-0.2 0-0.4 0.2-0.6 0.2-0.2 0-0.4 0.2-0.6 0.2-0.1 0-0.3 0.2-0.4 0.2q0 0 0 0c-1.6 0.6-3 1.6-3.8 2.8-0.8 1.2-1.4 2.8-1.4 4.4 0 4.4-3.5 7.8-7.9 7.8h-4.5c-2.2 0-4.2-0.8-5.6-2.2-1.4-1.6-2.2-3.4-2.2-5.6 0-2.8-1.6-5.3-3.9-6.7q-0.8-0.2-1.6-0.5c-0.2 0-0.4-0.2-0.6-0.2-0.2 0-0.4-0.2-0.6-0.2-0.2 0-0.4-0.2-0.6-0.2-0.4-0.2-0.6-0.2-1-0.4-0.6-0.2-1-0.4-1.6-0.6h-0.2q-1.1-0.5-2.2-1.1c-2.2-0.1-4.4 0.8-5.9 2.3-3 3-8.1 3-11.1 0l-3.3-3.2c-3-3-3-8 0-11 1.6-1.5 2.4-3.7 2.3-5.8q-0.7-1.2-1.2-2.4v-0.2c-0.3-0.6-0.5-1-0.7-1.6-0.2-0.4-0.2-0.6-0.4-1 0-0.2-0.2-0.4-0.2-0.6 0-0.2-0.2-0.4-0.2-0.6 0-0.2-0.2-0.4-0.2-0.6q-0.3-0.9-0.5-1.8-0.9-1.1-2.1-2zm61 31.2c-4.8 1.6-9.8 2.6-15.2 2.6q0 0 0.1 0c5.4 0 10.5-1 15.3-2.6q-0.1 0-0.2 0zm43.2-44.8v4.4c0 2.2-0.8 4.2-2.2 5.6-1.4 1.4-3.4 2.2-5.6 2.2-3.5 0-6.3 2.2-7.5 5.2 1.6-4.8 2.6-9.8 2.6-15.2 0-5.4-1-10.4-2.6-15.2 0.6 1.6 1.6 3 2.8 3.8 1.2 0.8 2.8 1.4 4.5 1.4 4.2 0 7.8 3.4 8 7.8zm-42.8-40.4q-0.3-0.1-0.5-0.1 0.3 0 0.5 0.1zm9.7 42.6c0-13.8-11.3-25-25.2-25-14 0-25.3 11.2-25.3 25 0 13.8 11.3 25 25.3 25 13.9 0 25.2-11.2 25.2-25z" />
                </svg>
                { isSetting && <SettingPopUp handlePopUpClick={handlePopUpClick}/> }
            </div>
            { popUp &&
                <div>
                    <div onClick={handlePopUpCancel} className='setting_popup_bg'></div>
                    <div className='setting_popup_three'>
                        { popUpContent === '닉네임 변경' ?
                            <InputNickname nicknameText={nicknameText} dispatch={dispatch} />
                        : popUpContent === '소개 변경' ?
                            <TextareaIntroduce introduceText={introduceText} dispatch={dispatch} />
                        : <PopUpLogout/>
                        }
                        <PopUpBtn handlePopUpValidation={handlePopUpValidation} handlePopUpCancel={handlePopUpCancel}/>
                    </div>
                </div> }
        </div>

    )
}

export default Setting