import React from 'react'
import { UserContextType } from '../models/PropsType';

type PhotoWrapProps = {
    user: UserContextType;
}

const PhotoWrap = ({user}: PhotoWrapProps) => {
    return (
        <div className='photo_wrap'>
            <div className='photo'>
                <img
                    src={user?.photoURL || undefined}
                    alt={user?.photoURL || undefined}
                />
            </div>
        </div>
    )
}

export default PhotoWrap