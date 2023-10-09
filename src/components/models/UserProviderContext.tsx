import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContextType, UserProviderProps } from './PropsType';
import { auth } from '../api/firebase';

const UserContext = createContext<UserContextType>(null);

export const useUser = (): UserContextType => {
    return useContext(UserContext);
}

const UserProviderContext = ({children}: UserProviderProps) => {
    const [user, setUser] = useState<UserContextType>(null);

    useEffect(()=>{
        const userLogin = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                setUser(authUser);
                //console.log('로그인한 유저 정보', authUser);
            } else {
                setUser(null);
            }
        });

        return () => {
            userLogin();
        };
    },[user])

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProviderContext