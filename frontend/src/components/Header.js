// frontend/src/components/Header.js

import React from 'react';
import Button from './Button.js';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; // 👈 CRÍTICO: Importar el Contexto de Auth

const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth(); // Obtener el estado de autenticación (usuario, token, isAuthenticated)

  

  // Handlers para la navegación cuando el usuario NO está autenticado
  const handleLoginClick = () => {
    navigate('/login'); 
  };
  
  const handleRegisterClick = () => {
    navigate('/register'); 
  };
  
  // Handler para cerrar sesión cuando el usuario SÍ está autenticado
  const handleLogoutClick = () => {
    auth.logout(); // Llama a la función de logout del contexto
    navigate('/');
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: 'var(--color-fondo-principal)',
      boxShadow: '0 2px 4px rgba(139, 69, 19, 0.1)' 
    }}>
      
      {/* Logotipo/Marca */}
      <Link to="/" style={{ 
          fontFamily: 'var(--font-encabezado)', 
          fontSize: '1.8rem', 
          color: 'var(--color-acento-principal)',
          textDecoration: 'none'
      }}>
        Pastelería 1000 Sabores
      </Link>

      {/* Navegación Principal (ACTUALIZADA) */}
      <nav style={{ display: 'flex', gap: '25px', fontSize: '1.1rem' }}>
        {/* 💥 El enlace "Inicio" ahora apunta a /home (que es el WelcomePage) */}
        <Link to="/home" style={{ textDecoration: 'none', color: 'var(--color-texto-principal)' }}>Inicio</Link> 
        <Link to="/catalogo" style={{ textDecoration: 'none', color: 'var(--color-texto-principal)' }}>Catálogo</Link>
        <Link to="/orders/tracking" style={{ textDecoration: 'none', color: 'var(--color-texto-principal)' }}>Seguimiento Pedido</Link>
      </nav>

      {/* Acciones de Usuario: Botones de Auth/Perfil */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        
        {/* Icono de Carrito (Visible siempre) */}
        <Link to="/carrito" style={{ textDecoration: 'none', color: 'var(--color-texto-principal)', fontSize: '1.2rem', paddingRight: '10px' }}>🛒</Link> 
        
        {auth.isAuthenticated ? (
          // 1. Mostrar si el usuario está logueado: Botones Perfil y Cerrar Sesión
          <>
            <Button 
              onClick={() => navigate('/profile')} 
              variant="secondary" 
              style={{ backgroundColor: 'var(--color-acento-secundario)', padding: '8px 15px' }}
            >
              Hola, {auth.user.email} (Perfil)
            </Button>
            <Button 
              onClick={handleLogoutClick} 
              variant="tertiary" 
              style={{ backgroundColor: '#B22222', color: 'white', padding: '8px 15px' }}
            >
              Cerrar Sesión
            </Button>
          </>
        ) : (
          // 2. Mostrar si el usuario NO está logueado: Botones Iniciar Sesión y Registrarse
          <>
            <Button 
              onClick={handleLoginClick} 
              variant="primary" 
              style={{ 
                backgroundColor: 'var(--color-acento-principal)',
                padding: '8px 15px'
              }}
            >
              Iniciar Sesión
            </Button>
            
            <Button 
              onClick={handleRegisterClick} 
              variant="secondary" 
              style={{ 
                backgroundColor: 'var(--color-acento-secundario)', 
                color: 'var(--color-texto-principal)',
                padding: '8px 15px'
              }}
            >
              Registrarse
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;