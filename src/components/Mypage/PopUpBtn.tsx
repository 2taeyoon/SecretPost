import React from 'react'

type HandlePopUp = {
    handlePopUpValidation: () => void;
    handlePopUpCancel: () => void;
}

const PopUpBtn = ({handlePopUpValidation, handlePopUpCancel}: HandlePopUp) => {
    return (
        <div className='popup_btn'>
            <div className='popup_btn_yes' onClick={handlePopUpValidation}>확인</div>
            <div className='popup_btn_no' onClick={handlePopUpCancel}>취소</div>
        </div>
    )
}

export default PopUpBtn