import React, {createContext, useContext} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';




const initialAuthState = {
    username:'',
    token: '',
    id:''
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', initialAuthState);



    const login = (authData) => {
        setUser(authData);
    }

    const logout = () => {
        setUser(initialAuthState);
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: user.username }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
}