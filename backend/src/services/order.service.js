// backend/src/services/order.service.js

const OrderRepository = require('../repositories/order.repository'); 
const CartService = require('./cart.service'); 
const UserService = require('./user.service'); 
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
        let appliedDiscountsList = []; // Para registrar qué descuentos se aplicaron

        // LÓGICA DE DESCUENTO CORREGIDA: Verifica la EDAD ACTUAL del perfil
        // Esto asegura que el descuento del 50% se aplica si la edad es >= 50
        if (profile && profile.age >= 50) {
            discountAmount = totalToPay * 0.5; // Aplica 50%
            totalToPay -= discountAmount;
            
            // Registra el descuento aplicado para guardarlo en la orden
            appliedDiscountsList.push({ 
                tipo: 'Edad', 
                valor: '50%', 
                descripcion: 'Mayor de 50 años' 
            });
        }
        
        // **PENDIENTE:** Aquí se debería implementar la lógica para el código "FELICES50" 
        // y tortas gratis Duoc.

        // 3. Crear el Objeto Pedido (RF-4: Programación de Entrega)
        const orderData = {
            userId: userId,
            items: cartSummary.items,
            subtotal: cartSummary.subtotal,
            descuentosAplicados: discountAmount, // Monto del descuento
            appliedDiscountsList: appliedDiscountsList, // Lista de descuentos
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