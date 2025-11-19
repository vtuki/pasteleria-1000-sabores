// backend/src/routes/cart.routes.js
const express = require('express');
const CartController = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/auth.middleware'); 
const router = express.Router();

// Todas las rutas del carrito requieren autenticación (porque es por sesión de usuario)
router.get('/cart', authMiddleware, CartController.getCart);
router.post('/cart/add', authMiddleware, CartController.addItem);
router.delete('/cart/:itemId', authMiddleware, CartController.removeItem);

module.exports = router;