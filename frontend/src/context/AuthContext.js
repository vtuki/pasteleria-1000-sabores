// frontend/src/context/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // 1. Cargar estado inicial desde el localStorage para persistencia
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );

    // 2. Funciones de login/logout
    const login = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };
    
    // 3. Función de utilidad para peticiones autenticadas
    const getAuthHeaders = () => {
        return {
            'Content-Type': 'application/json',
            'Authorization': token // Envía el token al Backend
        };
    };

    const value = { user, token, login, logout, getAuthHeaders, isAuthenticated: !!user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Hook personalizado
export const useAuth = () => {
    return useContext(AuthContext);
};