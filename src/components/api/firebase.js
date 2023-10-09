import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


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
export const auth = getAuth();
const storeDB = getFirestore();


export const GoogleLoginHandler = async () => {
    return signInWithPopup(auth, googleProvider)
        .then(async (result) => {
            const resultUser = result.user;
            const userUid = resultUser.uid;

            console.log('resultUserresultUser',resultUser)
            const userDocRef = doc(storeDB, "users", userUid);
            const userData = {
                name: resultUser.displayName,
                email: resultUser.email,
                photo: resultUser.photoURL,
                uid: userUid
            };

            await setDoc(userDocRef, userData, { merge: true });

            window.location.replace('/home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('에러 코드',errorCode);
            console.log('에러 메시지',errorMessage);
        });
};

export const GithubLoginHandler = async () => {
    return signInWithPopup(auth, githubProvider)
        .then(async (result) => {
            const resultUser = result.user;
            const userUid = resultUser.uid;
            
            console.log('resultUserresultUser',resultUser)
            const userDocRef = doc(storeDB, "users", userUid);
            const userData = {
                name: resultUser.displayName,
                email: resultUser.email,
                photo: resultUser.photoURL,
                uid: resultUser.uid
            };

            await setDoc(userDocRef, userData, { merge: true });

            window.location.replace('/home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('에러 코드', errorCode);
            console.log('에러 메시지', errorMessage);
        });
}

export const LogoutHandler = async () => {
    signOut(auth)
        .then(()=>{
            window.location.replace('/');
        })
        .catch((error)=>{
            console.log('로그아웃 중 오류 발생', error);
        })
}