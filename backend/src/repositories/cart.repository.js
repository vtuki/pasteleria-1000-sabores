// backend/src/repositories/cart.repository.js
const { cartsData } = require('../models/cart.model');

class CartRepository {
    // 1. Obtiene el carrito completo de un usuario por su ID
    getCartByUserId(userId) {
        // Devuelve el carrito existente o un array vacío si no existe
        return cartsData[userId] || []; 
    }

    // 2. Guarda o actualiza un carrito
    saveCart(userId, cartItems) {
        cartsData[userId] = cartItems;
        return cartsData[userId];
    }
    
    // 3. Elimina un carrito (al completar un pedido o cerrar sesión)
    clearCart(userId) {
        delete cartsData[userId];
    }
}

module.exports = new CartRepository();