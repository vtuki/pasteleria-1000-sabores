// backend/src/repositories/order.repository.js
const { ordersData, getNextOrderId } = require('../models/order.model');

class OrderRepository {
    createOrder(orderData) {
        const newOrder = {
            id: getNextOrderId(),
            ...orderData,
            createdAt: new Date(),
        };
        ordersData.push(newOrder);
        return newOrder;
    }
    
    // Método para el seguimiento de pedidos (RF-4)
    getOrderById(orderId) {
        return ordersData.find(o => o.id === parseInt(orderId));
    }
}

module.exports = new OrderRepository();