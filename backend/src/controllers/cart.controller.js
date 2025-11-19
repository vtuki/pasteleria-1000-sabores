// backend/src/controllers/cart.controller.js
const CartService = require('../services/cart.service');

class CartController {
    // GET /api/v1/cart - Obtener resumen del carrito
    async getCart(req, res) {
        try {
            const summary = CartService.getCartSummary(req.userId);
            return res.status(200).json(summary);
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el carrito.' });
        }
    }

    // POST /api/v1/cart/add - Añadir/Actualizar un ítem (RF-1)
    async addItem(req, res) {
        const { productId, quantity, customization } = req.body;
        
        if (!productId) {
            return res.status(400).json({ message: 'El ID del producto es requerido.' });
        }
        
        try {
            // Utilizamos el ID del usuario del token
            CartService.addItemToCart(req.userId, productId, quantity, customization);
            const summary = CartService.getCartSummary(req.userId);
            return res.status(200).json(summary);
        } catch (error) {
            return res.status(500).json({ message: 'Error al añadir el producto.' });
        }
    }

    // DELETE /api/v1/cart/:itemId - Eliminar un ítem por índice (RF-2)
    async removeItem(req, res) {
        const { itemId } = req.params; // El itemId es el índice en el array (simplificado)
        
        try {
            CartService.removeItemFromCart(req.userId, itemId);
            const summary = CartService.getCartSummary(req.userId);
            return res.status(200).json(summary);
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el producto.' });
        }
    }
}

module.exports = new CartController();