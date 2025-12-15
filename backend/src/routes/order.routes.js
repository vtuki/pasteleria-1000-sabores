// backend/src/routes/order.routes.js
const express = require('express');
const OrderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware'); 
const router = express.Router();

// Checkout y Pedidos requieren autenticación
router.post('/checkout', authMiddleware.verifyToken, OrderController.finalizeCheckout);
router.get('/orders/:orderId/track', authMiddleware.verifyToken, OrderController.trackOrder); // RF-4

module.exports = router;