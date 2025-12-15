// backend/src/middleware/auth.middleware.js

// Este middleware simula la verificación de un token JWT.
// Espera un token con formato: "jwt-simulado-ID_DE_USUARIO" en el encabezado Authorization.
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    // 1. Verificar si hay un token
    if (!authHeader || !authHeader.startsWith('jwt-simulado-')) {
        return res.status(401).json({ message: "Acceso denegado. No se encontró un token de autenticación válido." });
    }

    // 2. Extraer el ID del token simulado
    const simulatedToken = authHeader.split('-')[2]; 
    const userId = parseInt(simulatedToken, 10);

    if (isNaN(userId)) {
        return res.status(401).json({ message: "Token inválido." });
    }

    // 3. Adjuntar el ID del usuario a la solicitud
    req.userId = userId;
    next();
};

module.exports = {
    verifyToken: authMiddleware, 
};