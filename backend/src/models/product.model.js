// Simulación de los datos del catálogo desde la "Base de Datos (DB)" [C2]
const productsData = [
    { id: 1, codigo: "TC001", nombre: "Torta Cuadrada de Chocolate", precio: 45000, categoria: "Tortas Cuadradas", personalizable: true, descripcion: "Deliciosa torta de chocolate con capas de ganache." },
    { id: 2, codigo: "TT002", nombre: "Torta Circular de Manjar", precio: 42000, categoria: "Tortas Circulares", personalizable: false, descripcion: "Torta tradicional chilena con manjar y nueces." },
    { id: 3, codigo: "PI001", nombre: "Mousse de Chocolate", precio: 5000, categoria: "Postres Individuales", personalizable: false, descripcion: "Postre individual cremoso y suave." },
    { id: 4, codigo: "PSA001", nombre: "Torta Sin Azúcar de Naranja", precio: 48000, categoria: "Productos Sin Azúcar", personalizable: true, descripcion: "Torta ligera y deliciosa, endulzada naturalmente." }
];

module.exports = {
    productsData
};