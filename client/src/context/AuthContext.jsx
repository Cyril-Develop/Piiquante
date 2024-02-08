import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    const logout = () => {
        localStorage.removeItem("user");
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ logout, setCurrentUser, currentUser }}>
            {children}
        </AuthContext.Provider>
    )
};