// frontend/src/context/AuthContext.js (CORREGIDO)

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // 1. Cargar estado inicial desde el localStorage para persistencia
    const initialUser = JSON.parse(localStorage.getItem('user'));
    
    // 💥 CORRECCIÓN: Si el usuario existe, nos aseguramos de que el campo isMaster esté presente.
    const [user, setUser] = useState(
        initialUser ? { ...initialUser, isMaster: initialUser.isMaster || false } : null
    );
    const [token, setToken] = useState(
        localStorage.getItem('token') || null
    );

    // 2. Funciones de login/logout
    const login = (userData, authToken) => {
        // Aseguramos que el estado local y el localStorage contengan isMaster
        const userWithRole = { ...userData, isMaster: userData.isMaster || false };
        
        setUser(userWithRole);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userWithRole)); // Guardamos el objeto completo
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

    // La exposición del valor isMaster ahora es más robusta
    const value = { 
        user, 
        token, 
        login, 
        logout, 
        getAuthHeaders, 
        isAuthenticated: !!user, 
        isMaster: user ? user.isMaster : false // Esto es correcto, pero depende del estado 'user'
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Hook personalizado
export const useAuth = () => {
    return useContext(AuthContext);
};