// backend/src/models/user.model.js

// 1. Definir el conjunto de usuarios iniciales, incluyendo el Master
const initialUsers = [
    // Usuario Master
    {
        id: 100, 
        email: 'master@pasteleria.cl', 
        // 💥 CORRECCIÓN 1: La contraseña debe tener el HASHING SIMULADO
        // El login intenta comparar 'hashed_admin' con el valor almacenado.
        password: 'hashed_admin', 
        age: 40,
        isDuocStudent: false,
        descuentos: [],
        isMaster: true, // CLAVE para la autorización
        nombre: "Admin",
        apellido: "Pasteleria",
        telefono: "56912345678",
        direccion: "Calle Principal #100",
        ciudad: "Santiago"
    },
    // Puedes añadir más usuarios de prueba aquí si lo necesitas
];

// 2. Simulación de una "tabla" de usuarios
// 💥 CORRECCIÓN 2 (Importante): Inicializar la "tabla" con los datos iniciales
const usersData = [...initialUsers];

// Función para simular la generación de un ID único (si es necesario)
const generateId = () => {
    return usersData.length > 0 ? Math.max(...usersData.map(u => u.id)) + 1 : 1;
};

module.exports = {
    usersData,
    generateId
};