const express = require('express');
const UserController = require('../controllers/user.controller');
const router = express.Router();

// Rutas públicas (RF-3: El usuario puede registrarse)
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Rutas privadas (Pendiente: Modificar perfil, requiere autenticación)
// router.put('/profile', authMiddleware, UserController.updateProfile); 

module.exports = router;