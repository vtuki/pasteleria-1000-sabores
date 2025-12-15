// backend/src/routes/admin.routes.js

const express = require('express');
const router = express.Router();
// Asume que tienes un controlador de administración y un middleware de auth
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware'); 

// Todas estas rutas requieren autenticación. La verificación de que es MASTER
// se recomienda hacerla dentro del controlador para una capa extra de seguridad.

// GESTIÓN DE USUARIOS
router.get('/admin/users', authMiddleware.verifyToken, adminController.getAllUsers);

// GESTIÓN DE PEDIDOS
router.get('/admin/orders', authMiddleware.verifyToken, adminController.getAllOrders);

// GESTIÓN DE CATÁLOGO (Solo para mostrar el concepto de edición)
// router.put('/admin/products/:id', authMiddleware.verifyToken, adminController.updateProduct); 

module.exports = router;