import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [error, setError] = useState(null);
    const [successfullLogin, setSuccessfullLogin] = useState(false);

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
   
    const login = async (credentials) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, credentials);
            setSuccessfullLogin(true);
            setCurrentUser(res.data);
        } catch (err) {
            setError(err);
        }
    };

    const loginAsUser = async (email, password) => {
        if (email && password) {
            await login({ email, password });
        }
    };

    const loginAsGuest = async () => {
        await login({ email: "user@guest.com", password: "24Ad7Dgv*" });
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ loginAsUser, loginAsGuest, error, successfullLogin, currentUser }}>
            {children}
        </AuthContext.Provider>
    )
};