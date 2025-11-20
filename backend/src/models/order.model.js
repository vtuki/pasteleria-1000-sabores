// backend/src/models/order.model.js

// Almacenamiento en memoria para pedidos finalizados
const ordersData = [];
let nextOrderId = 1;

// La estructura del pedido debe reflejar la necesidad de seguimiento (RF-4)
// y el detalle de ítems (RF-2).
const OrderStatus = {
    PENDIENTE: 'Pendiente de Pago',
    PROCESANDO: 'En Preparación',
    ENTREGADO: 'Entregado'
};

module.exports = {
    ordersData,
    OrderStatus,
    getNextOrderId: () => nextOrderId++
};