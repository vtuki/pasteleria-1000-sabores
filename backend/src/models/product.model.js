// backend/src/models/product.model.js

const productsData = [
    { 
        id: 1, 
        codigo: "TC001", 
        nombre: "Torta Cuadrada de Chocolate", 
        precio: 45000, 
        categoria: "Tortas Cuadradas", 
        personalizable: true, 
        descripcion: "Deliciosa torta de chocolate con capas de ganache.", 
        imageUrl: "/images/torta_chocolate.webp"
    },
    { 
        id: 2, 
        codigo: "TT002", 
        nombre: "Torta Circular de Manjar", 
        precio: 42000, 
        categoria: "Tortas Circulares", 
        personalizable: false, 
        descripcion: "Torta tradicional chilena con manjar y nueces.",
        imageUrl: "/images/torta_manjar.jpg"
    },
    { 
        id: 3, 
        codigo: "PI001", 
        nombre: "Mousse de Chocolate", 
        precio: 5000, 
        categoria: "Postres Individuales", 
        personalizable: false, 
        descripcion: "Postre individual cremoso y suave.",
        imageUrl: "/images/mousse_chocolate.avif"
    },
    { 
        id: 4, 
        codigo: "PSA001", 
        nombre: "Torta Sin Azúcar de Naranja", 
        precio: 48000, 
        categoria: "Productos Sin Azúcar", 
        personalizable: true, 
        descripcion: "Torta ligera y deliciosa, endulzada naturalmente.",
        imageUrl: "/images/torta_naranja.jpg"
    }
];

module.exports = {
    productsData
};