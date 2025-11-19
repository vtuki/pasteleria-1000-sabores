import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importar los componentes de página
import HomePage from './pages/HomePage.js';      // 👈 Nuevo componente para el Catálogo
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import ProfilePage from './pages/ProfilePage.js'; // 👈 Importar

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* 👈 RUTA DE PERFIL */}
        <Route path="/profile" element={<ProfilePage />} /> 
      </Routes>
    </div>
  );
}

export default App;