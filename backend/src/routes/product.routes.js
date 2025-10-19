const express = require('express');
const ProductController = require('../controllers/product.controller');
const router = express.Router();

// GET /api/v1/productos - Obtiene el catálogo completo
router.get('/productos', ProductController.getProducts);

// GET /api/v1/productos/:id - Obtiene un producto por ID
router.get('/productos/:id', ProductController.getProductDetail);

module.exports = router;