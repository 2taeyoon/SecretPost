import React from 'react'

type HandlePopUpClick = {
    handlePopUpClick: (content: string) => void;
}

const SettingPopUp = ({handlePopUpClick}: HandlePopUpClick) => {
    return (
        <div className='setting_popup'>
            <div onClick={() => handlePopUpClick('닉네임 변경')}>닉네임 변경</div>
            <div onClick={() => handlePopUpClick('소개 변경')}>소개 변경</div>
            <div onClick={() => handlePopUpClick('로그아웃')}>로그아웃</div>
        </div>
    )
}

export default SettingPopUp