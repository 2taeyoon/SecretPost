import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";


export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();


export const GoogleLoginHandler = async () => {
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            // 구글 Access Token을 가져올 수 있습니다. 이를 사용하여 구글 API에 접근할 수 있습니다.
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const uid = result.user.uid;
            const userInfo = { uid: uid };

            localStorage.setItem('user', JSON.stringify(userInfo));
            const getUser = localStorage.getItem('user');
            const user = getUser ? JSON.parse(getUser) : null;
            if (user) {
                ///window.location.replace('/login');
                //navigate('/home')
                window.location = '/home';
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('에러 코드',errorCode);
            console.log('에러 메시지',errorMessage);
            // 사용된 계정의 이메일
            //const email = error.customData.email;
            //console.log('email',email);
            // 사용된 AuthCredential 유형
            //const credential = GoogleAuthProvider.credentialFromError(error);
            //console.log('credential',credential)
        });
};

export const GithubLoginHandler = async () => {
    return signInWithPopup(auth, githubProvider)
        .then((result) => {
            const uid = result.user.uid;
            const userInfo = { uid: uid };

            localStorage.setItem('user', JSON.stringify(userInfo));
            const getUser = localStorage.getItem('user');
            const user = getUser ? JSON.parse(getUser) : null;
            if (user) {
                ///window.location.replace('/login');
                //navigate('/home')
                window.location = '/home';
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('에러 코드', errorCode);
            console.log('에러 메시지', errorMessage);
        });
}



//localStorage.removeItem('user');