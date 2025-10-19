const ProductService = require('../services/product.service');

/**
 * Controlador de Catálogo. Maneja las peticiones HTTP y delega la tarea al Servicio.
 * En el C3, este componente es el punto de entrada que expone los Endpoints.
 */
class ProductController {
    async getProducts(req, res) {
        try {
            const products = ProductService.getAll();
            return res.status(200).json(products);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al obtener el catálogo.' });
        }
    }

    async getProductDetail(req, res) {
        const { id } = req.params;
        try {
            const product = ProductService.getById(id);
            return res.status(200).json(product);
        } catch (error) {
            if (error.message === 'Producto no encontrado') {
                return res.status(404).json({ message: error.message });
            }
            console.error(error);
            return res.status(500).json({ message: 'Error al obtener el detalle del producto.' });
        }
    }
}

module.exports = new ProductController();