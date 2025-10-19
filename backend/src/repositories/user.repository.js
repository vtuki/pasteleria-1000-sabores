const { usersData, generateId } = require('../models/user.model');

class UserRepository {
    // Simula la conexión con la DB para registrar un nuevo usuario
    createUser(userData) {
        const newUser = {
            id: generateId(),
            ...userData,
            createdAt: new Date(),
            descuentos: [] // Campo para manejar descuentos aplicados
        };
        usersData.push(newUser);
        return newUser;
    }

    // Simula la búsqueda por email para login
    findByEmail(email) {
        return usersData.find(u => u.email === email);
    }

    // Simula la actualización del perfil (RF-3)
    updateUser(id, updates) {
        const index = usersData.findIndex(u => u.id === parseInt(id));
        if (index === -1) return null;
        
        usersData[index] = { ...usersData[index], ...updates };
        return usersData[index];
    }
}

module.exports = new UserRepository();