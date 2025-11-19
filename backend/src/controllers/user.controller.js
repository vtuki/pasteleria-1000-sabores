const UserService = require('../services/user.service');

class UserController {
    async register(req, res) {
        // Campos requeridos para RF-3 (registro)
        const { email, password, age, isDuocStudent = false } = req.body; 

        if (!email || !password || !age) {
            return res.status(400).json({ message: "Faltan campos obligatorios." });
        }

        try {
            const newUser = UserService.registerUser(email, password, age, isDuocStudent);
            // Simulación de respuesta exitosa de registro
            return res.status(201).json({ 
                message: "Registro exitoso.", 
                user: { id: newUser.id, email: newUser.email, descuentos: newUser.descuentos } 
            });
        } catch (error) {
            return res.status(409).json({ message: error.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = UserService.loginUser(email, password);
            // Simulación de éxito de autenticación (OIDC/OAuth2 RNF-S-1 simulado)
            return res.status(200).json({ 
                message: "Login exitoso", 
                token: `jwt-simulado-${user.id}`, // Simulación del token de acceso
                user: user
            });
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }

    // NUEVO: Obtener datos de perfil (requiere autenticación)
    async getProfile(req, res) {
        const user = UserService.getUserProfile(req.userId); // ID viene del middleware

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        
        return res.status(200).json(user);
    }

    // NUEVO: Actualizar perfil (RF-3)
    async updateProfile(req, res) {
        const updates = req.body;
        
        // Limpiar campos sensibles que no deberían ser modificados por el usuario
        delete updates.id;
        delete updates.rol;
        
        try {
            const updatedUser = UserService.updateProfile(req.userId, updates);
            
            if (!updatedUser) {
                return res.status(404).json({ message: "Usuario no encontrado." });
            }

            return res.status(200).json({ 
                message: "Perfil actualizado correctamente.",
                user: updatedUser
            });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

module.exports = new UserController();