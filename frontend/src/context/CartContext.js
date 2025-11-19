// frontend/src/context/CartContext.js

import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);
const API_CART_URL = 'http://localhost:3001/api/v1/cart';

export const CartProvider = ({ children }) => {
    const auth = useAuth();
    const [cart, setCart] = useState(null); // null indica no cargado, [] indica vacío
    const [loading, setLoading] = useState(false);

    // Función principal para obtener el carrito del backend
    const fetchCart = async () => {
        if (!auth.isAuthenticated) {
            setCart([]); // Si no hay usuario, el carrito está vacío localmente
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(API_CART_URL, {
                method: 'GET',
                headers: auth.getAuthHeaders(),
            });

            if (response.ok) {
                const data = await response.json();
                setCart(data);
            } else {
                console.error("Error al cargar el carrito:", response.status);
                setCart([]); 
            }
        } catch (error) {
            console.error("Error de conexión con el carrito API:", error);
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    // Función para añadir productos desde el Front-End
    const addItem = async (productId, quantity = 1, customization = null) => {
        if (!auth.isAuthenticated) {
            alert("Debes iniciar sesión para añadir productos al carrito.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_CART_URL}/add`, {
                method: 'POST',
                headers: auth.getAuthHeaders(),
                body: JSON.stringify({ productId: productId, quantity: quantity, customization: customization }),
            });

            if (response.ok) {
                const data = await response.json();
                setCart(data); // Actualiza el estado con la nueva respuesta del backend
                alert("¡Producto añadido al carrito!");
            } else {
                alert("Error al añadir producto.");
            }
        } catch (error) {
            alert("Error de conexión al añadir producto.");
        } finally {
            setLoading(false);
        }
    };
    
    // Función para eliminar un ítem
    const removeItem = async (itemId) => {
        if (!auth.isAuthenticated) return;
        setLoading(true);
        try {
            const response = await fetch(`${API_CART_URL}/${itemId}`, {
                method: 'DELETE',
                headers: auth.getAuthHeaders(),
            });
            
            if (response.ok) {
                const data = await response.json();
                setCart(data);
                alert("Ítem eliminado.");
            } else {
                alert("Error al eliminar ítem.");
            }
        } catch (error) {
            alert("Error de conexión al eliminar ítem.");
        } finally {
            setLoading(false);
        }
    };

    const value = { cart, loading, fetchCart, addItem, removeItem };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    return useContext(CartContext);
};