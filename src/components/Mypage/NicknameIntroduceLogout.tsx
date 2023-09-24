import React from 'react'
import { SettingAction } from '../models/Reducer';

type NicknameIntroduceDispatch = {
    nicknameText?: string | undefined;
    introduceText?: string | undefined;
    dispatch: React.Dispatch<SettingAction>;
}

export const InputNickname = ({ nicknameText, dispatch }: NicknameIntroduceDispatch) => {
    return (
        <div className='textarea_nick_introduce_logout'>
            <input
                type='text'
                placeholder='닉네임을 입력해주세요(10자 내외)'
                value={nicknameText}
                onChange={ (event) => dispatch({ type: 'SET_NICKNAME_TEXT', payload: event.target.value }) }
            />
        </div>
    )
}

export const TextareaIntroduce = ({ introduceText, dispatch }: NicknameIntroduceDispatch) => {
    return (
        <div className='textarea_nick_introduce_logout'>
            <textarea
                placeholder='소개를 입력해주세요(100자 내외)'
                rows={3}
                value={introduceText}
                onChange={(event) => dispatch({ type: 'SET_INTRODUCE_TEXT', payload: event.target.value }) }
            ></textarea>
        </div>
    )
}

export const PopUpLogout = () => {
    return (
        <div className='textarea_nick_introduce_logout'>
            <div className='logout'>로그아웃하시겠습니까?</div>
        </div>
    )
}