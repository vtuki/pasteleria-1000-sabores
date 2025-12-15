const UserRepository = require('../repositories/user.repository');
// Simulación de un hashing simple (en producción usaría bcrypt)
const bcrypt = { 
    hash: (pass) => `hashed_${pass}`, 
    compare: (pass, hash) => hash === `hashed_${pass}` 
};

class UserService {
    // Obtener datos de perfil (Excluye el password)
    getUserProfile(id) {
        const user = UserRepository.findById(id);
        if (!user) return null;

        const { password, ...profile } = user;
        return profile;
    }

    // Actualizar perfil (RF-3 y nuevos campos)
    updateProfile(id, updates) {
        const updatedUser = UserRepository.updateUser(id, updates);
        if (updatedUser) {
            const { password, ...profile } = updatedUser;
            return profile;
        }
        return null;
    }
    
    // Simula la creación de usuario (RF-3) y aplicación de descuentos iniciales
    registerUser(email, password, age, isDuocStudent) {
        if (UserRepository.findByEmail(email)) {
            throw new Error("El email ya está registrado.");
        }

        const hashedPassword = bcrypt.hash(password);
        
        // 💥 Inicialización con los nuevos campos vacíos para un nuevo registro
        const userData = { 
            email, 
            password: hashedPassword, 
            age: parseInt(age), 
            isDuocStudent, 
            rol: 'Usuario',
            isMaster: false, // Por defecto no es master
            nombre: '',
            apellido: '',
            telefono: '',
            direccion: '',
            ciudad: '',
            descuentos: [], // Se inicializa el array de descuentos
        };
        
        const user = UserRepository.createUser(userData);
        
        // Aplicación de lógica de descuentos:
        if (user.age >= 50) {
            user.descuentos.push({ tipo: 'Edad', valor: '50%', descripcion: 'Mayor de 50 años' }); 
        }
        
        return user;
    }

    // Simula el proceso de Login
    loginUser(email, password) {
        const user = UserRepository.findByEmail(email);

        if (!user || !bcrypt.compare(password, user.password)) {
            throw new Error("Credenciales inválidas.");
        }
        
        // 💥 CORRECCIÓN: Devolver isMaster para el Front-End
        return { 
            id: user.id, 
            email: user.email, 
            rol: user.rol, 
            descuentos: user.descuentos,
            isMaster: user.isMaster || false // ¡CLAVE para el acceso Admin!
        };
    }
}

module.exports = new UserService();