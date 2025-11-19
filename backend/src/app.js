const express = require('express');
const cors = require('cors');
// Middleware para cargar variables de entorno (necesitas 'npm install dotenv')
require('dotenv').config(); 

// 1. Importar todas las rutas una sola vez
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes'); 
const cartRoutes = require('./routes/cart.routes');

const app = express();
const PORT = process.env.PORT || 3001;
const API_VERSION = '/api/v1'; // RNF-C-2: versionado v1

// 2. MIDDLEWARES
// Permite que el Front-End (React en puerto 3000) pueda comunicarse con este Backend.
app.use(cors({
    origin: 'http://localhost:3000' // O la URL de tu Front-End React
}));
app.use(express.json()); // Permite recibir cuerpos de solicitud en formato JSON

// 3. RUTAS
// El controlador de catálogo expone endpoints para visualizar el catálogo (RF-1).
app.use(API_VERSION, productRoutes);
app.use(API_VERSION, userRoutes);
app.use(API_VERSION, cartRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API Web (Backend) para Pastelería 1000 Sabores. Estado: OK');
});


// 4. INICIO DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`API Web (Backend) escuchando en http://localhost:${PORT}`);
    console.log(`Catálogo disponible en: http://localhost:${PORT}${API_VERSION}/productos`);
});