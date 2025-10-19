const { productsData } = require('../models/product.model');

/**
 * Repositorio de Productos. Maneja la lógica de acceso a la DB para el Catálogo.
 * En el C3, este componente interactúa directamente con la Base de Datos (DB).
 */
class ProductRepository {
    // Implementa el GET /productos
    getAllProducts() {
        console.log("Repositorio: Accediendo a la DB para obtener todos los productos.");
        // En un caso real: return db.query('SELECT * FROM productos');
        return productsData;
    }

    // Implementa el GET /productos/:id
    getProductById(id) {
        console.log(`Repositorio: Buscando producto con ID ${id}`);
        // En un caso real: return db.query('SELECT * FROM productos WHERE id = ?', [id]);
        return productsData.find(p => p.id === parseInt(id));
    }
}

module.exports = new ProductRepository();