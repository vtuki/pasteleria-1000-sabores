// backend/src/services/order.service.js

const OrderRepository = require('./order.repository');
const CartService = require('./cart.service'); // Necesario para obtener el carrito
const UserService = require('./user.service'); // Necesario para obtener el descuento
const CartRepository = require('../repositories/cart.repository');
const { OrderStatus } = require('../models/order.model');

class OrderService {
    async checkout(userId, deliveryDetails) {
        // 1. Obtener Carrito y Perfil
        const cartSummary = CartService.getCartSummary(userId);
        const profile = UserService.getUserProfile(userId);

        if (cartSummary.items.length === 0) {
            throw new Error('El carrito está vacío. No se puede generar un pedido.');
        }

        // 2. Aplicar Descuentos de Usuario (Ejemplo: Descuento 50% por edad)
        let totalToPay = cartSummary.subtotal;
        let discountAmount = 0;

        const edadDiscount = profile.descuentos.find(d => d.tipo === 'Edad' && d.valor === '50%');
        
        if (edadDiscount) {
            discountAmount = totalToPay * 0.5; // Aplica 50%
            totalToPay -= discountAmount;
        }

        // 3. Crear el Objeto Pedido (RF-4: Programación de Entrega)
        const orderData = {
            userId: userId,
            items: cartSummary.items,
            subtotal: cartSummary.subtotal,
            descuentosAplicados: discountAmount,
            total: totalToPay,
            delivery: deliveryDetails, // Guarda fecha y lugar
            status: OrderStatus.PENDIENTE // Pendiente de pago
        };

        // 4. Guardar el Pedido y Limpiar el Carrito
        const order = OrderRepository.createOrder(orderData);
        CartRepository.clearCart(userId); // El carrito se vacía tras el checkout

        return order;
    }
    
    // Función para el seguimiento (RF-4)
    getOrderTracking(orderId) {
        const order = OrderRepository.getOrderById(orderId);
        if (!order) {
            throw new Error('Pedido no encontrado');
        }
        return { 
            orderId: order.id, 
            status: order.status, 
            deliveryDate: order.delivery.date,
            itemsCount: order.items.length 
        };
    }
}

module.exports = new OrderService();