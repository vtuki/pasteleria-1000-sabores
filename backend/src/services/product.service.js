const ProductRepository = require('../repositories/product.repository');

/**
 * Servicio de Productos. Contiene la lógica de negocio.
 * En el C3, este componente usa el Repositorio e interactúa con sistemas externos (si fuera necesario).
 */
class ProductService {
    getAll() {
        console.log("Servicio: Aplicando lógica de negocio (si la hay) y llamando al Repositorio.");
        // Lógica de negocio futura: Filtrado de productos no disponibles, cálculo de precios dinámicos.
        return ProductRepository.getAllProducts();
    }

    getById(id) {
        const product = ProductRepository.getProductById(id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }
}

module.exports = new ProductService();