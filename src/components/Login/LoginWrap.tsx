import React from 'react'
import LoginIcon from './LoginIcon'
import SecretLogo from './SecretLogo'
import { GithubLoginHandler, GoogleLoginHandler } from '../api/firebse'


const LoginWrap = () => {
    return (
        <div className='login_wrap'>
            <SecretLogo />
            <LoginIcon
                bgStyle={{ border: '1px solid #eaebee' }}
                logoStyle={{ background: 'url(./image/google_logo.png) no-repeat center center / cover' }}
                text='구글로 시작하기'
                GoogleLoginHandler={GoogleLoginHandler} />
            <LoginIcon
                bgStyle={{ background: '#000' }}
                logoStyle={{ background: 'url(./image/github_logo.png) no-repeat center center / cover' }}
                colorStyle={{ color: '#fdfdfd' }}
                text='깃헙으로 시작하기'
                GithubLoginHandler={GithubLoginHandler} />
        </div>
    )
}

export default LoginWrap