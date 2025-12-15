const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware'); 
const router = express.Router();

// Rutas públicas (RF-3: El usuario puede registrarse)
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', authMiddleware.verifyToken, UserController.getProfile); // 👈 Pasa el método
router.put('/profile', authMiddleware.verifyToken, UserController.updateProfile); // 👈 Pasa el método

module.exports = router;