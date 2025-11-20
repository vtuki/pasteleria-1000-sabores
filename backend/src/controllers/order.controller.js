// backend/src/controllers/order.controller.js
const OrderService = require('../services/order.service');

class OrderController {
    // POST /api/v1/checkout - Finalizar la compra
    async finalizeCheckout(req, res) {
        // deliveryDetails incluye la personalización (RF-2) y la programación (RF-4)
        const { date, address, customization } = req.body; 

        if (!date || !address) {
            return res.status(400).json({ message: 'Se requiere fecha y dirección para la entrega (RF-4).' });
        }

        try {
            const deliveryDetails = { date, address, customization };
            const order = await OrderService.checkout(req.userId, deliveryDetails);
            
            // Simulación de Pago Externo (no implementado)
            // Aquí se enviaría la orden al Sistema de Pago Externo.
            
            return res.status(201).json({ 
                message: "Pedido creado exitosamente. Pendiente de pago.",
                orderId: order.id,
                total: order.total
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    
    // GET /api/v1/orders/:orderId/track - Seguimiento de Pedido (RF-4)
    async trackOrder(req, res) {
        const { orderId } = req.params;
        try {
            const trackingData = OrderService.getOrderTracking(orderId);
            return res.status(200).json(trackingData);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new OrderController();