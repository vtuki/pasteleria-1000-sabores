const UserRepository = require('../repositories/user.repository');
// Simulación de un hashing simple (en producción usaría bcrypt)
const bcrypt = { 
    hash: (pass) => `hashed_${pass}`, 
    compare: (pass, hash) => hash === `hashed_${pass}` 
};

class UserService {
    // Simula la creación de usuario (RF-3) y aplicación de descuentos iniciales
    registerUser(email, password, age, isDuocStudent) {
        if (UserRepository.findByEmail(email)) {
            throw new Error("El email ya está registrado.");
        }

        const hashedPassword = bcrypt.hash(password);
        const userData = { email, password: hashedPassword, age: parseInt(age), isDuocStudent, rol: 'Usuario' };
        
        const user = UserRepository.createUser(userData);
        
        // Aplicación de lógica de descuentos (Según "Tienda PASTELERIA.docx"):
        // Implementa el descuento del 50% para usuarios mayores de 50 años.
        if (user.age >= 50) {
            user.descuentos.push({ tipo: 'Edad', valor: '50%', descripcion: 'Mayor de 50 años' }); 
        }
        
        // Pendiente: Implementar lógica para el descuento FELICES50 y tortas gratis Duoc.
        
        return user;
    }

    // Simula el proceso de Login
    loginUser(email, password) {
        const user = UserRepository.findByEmail(email);

        if (!user || !bcrypt.compare(password, user.password)) {
            throw new Error("Credenciales inválidas.");
        }
        
        // En un caso real, aquí se generaría un JWT (OIDC/OAuth2)
        // Por ahora, solo devolvemos los datos del usuario.
        return { 
            id: user.id, 
            email: user.email, 
            rol: user.rol, 
            descuentos: user.descuentos 
        };
    }

    // Simula la modificación del perfil (RF-3)
    updateProfile(id, updates) {
        // En un caso real, filtraríamos qué campos se pueden actualizar (ej. no el password directamente)
        return UserRepository.updateUser(id, updates);
    }
}

module.exports = new UserService();