// backend/src/services/cart.service.js
const CartRepository = require('../repositories/cart.repository');
const ProductRepository = require('../repositories/product.repository'); // Para obtener detalles del producto

class CartService {
    // 1. Obtener el carrito con los detalles completos del producto
    getCart(userId) {
        const items = CartRepository.getCartByUserId(userId);
        
        // Adjuntar detalles del producto (nombre, precio, etc.) desde el repositorio de productos
        return items.map(item => {
            const productDetail = ProductRepository.getProductById(item.productId);
            return {
                ...item,
                product: productDetail,
                totalPrice: productDetail ? productDetail.precio * item.quantity : 0
            };
        });
    }

    // 2. Agregar o actualizar un ítem en el carrito
    addItemToCart(userId, productId, quantity = 1, customization = null) {
        const cart = CartRepository.getCartByUserId(userId);
        
        // Buscar si el producto ya existe en el carrito
        const existingItemIndex = cart.findIndex(item => 
            item.productId === productId && item.customization === customization // Considerar la personalización
        );

        if (existingItemIndex > -1) {
            // Actualizar cantidad (RF-2: Modificar productos)
            cart[existingItemIndex].quantity += quantity;
        } else {
            // Agregar nuevo producto
            cart.push({ productId, quantity, customization });
        }
        
        return CartRepository.saveCart(userId, cart);
    }
    
    // 3. Eliminar un ítem del carrito (RF-2: Eliminar productos)
    removeItemFromCart(userId, itemId) {
        let cart = CartRepository.getCartByUserId(userId);
        // Filtramos para crear un nuevo array sin el ítem
        cart = cart.filter((_, index) => index !== parseInt(itemId));
        return CartRepository.saveCart(userId, cart);
    }
    
    // 4. Calcular el resumen del carrito (RF-2: Mostrar resumen)
    getCartSummary(userId) {
        const detailedCart = this.getCart(userId);
        const subtotal = detailedCart.reduce((sum, item) => sum + item.totalPrice, 0);
        // Aquí se aplicaría el descuento de usuario si estuviera implementado en el servicio de usuarios
        
        return {
            items: detailedCart,
            subtotal: subtotal,
            descuentos: 0, 
            total: subtotal // (Total simple por ahora)
        };
    }
}

module.exports = new CartService();