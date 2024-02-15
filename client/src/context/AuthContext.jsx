import { createContext, useEffect, useState } from 'react';
import UserService from '../services/UserService';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [userInfos, setUserInfos] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        const userInfos = async () => {
            if (currentUser) {
                const response = await UserService.getUserInfos(currentUser.token, currentUser.userId);
                setUserInfos(response);
            }
        };
        userInfos();
    }, [currentUser]);

    useEffect(() => {
        if (userInfos.role === "admin") {
            setIsAdmin(true);
        }
    }, [userInfos]);

    return (
        <AuthContext.Provider value={{ setCurrentUser, currentUser, userInfos, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
};