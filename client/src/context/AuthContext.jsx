import { createContext, useEffect, useState } from 'react';

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
        const getUserInfos = async () => {
            if (currentUser) {
                const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/user/${currentUser.userId}`, {
                    headers: {
                        authorization: `bearer ${currentUser.token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserInfos(data);
                }
            }
        };
        getUserInfos();
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