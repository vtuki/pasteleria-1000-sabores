// Simulación de una "tabla" de usuarios
const usersData = [];

// Función para simular la generación de un ID único
const generateId = () => {
    return usersData.length > 0 ? Math.max(...usersData.map(u => u.id)) + 1 : 1;
};

module.exports = {
    usersData,
    generateId
};