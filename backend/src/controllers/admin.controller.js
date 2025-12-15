// backend/src/controllers/admin.controller.js

const { usersData } = require('../models/user.model'); 
const { ordersData } = require('../models/order.model'); 

/**
 * Controlador de Administración. Expone endpoints para la gestión interna.
 */
class AdminController {
    // GET /admin/users - Obtener todos los usuarios (RF-3 Gestión de Usuario)
    async getAllUsers(req, res) {
        // En un caso real: aquí se limpiaría el password antes de enviarlo
        const users = usersData.map(({ password, ...user }) => user);
        return res.status(200).json(users);
    }

    // GET /admin/orders - Obtener todas las órdenes (RF-4 Seguimiento/Gestión)
    async getAllOrders(req, res) {
        return res.status(200).json(ordersData);
    }
    
    // (Pendiente: Actualizar Producto)
    // (Pendiente: Actualizar Estado de Pedido)
}

module.exports = new AdminController();