import React from 'react';
import Button from './Button';

const Header = () => {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: 'var(--color-fondo-principal)',
      boxShadow: '0 2px 4px rgba(139, 69, 19, 0.1)' // Sombra sutil de chocolate
    }}>
      {/* Logotipo/Marca usando la Fuente Pacífico  */}
      <div style={{ fontFamily: 'var(--font-encabezado)', fontSize: '1.8rem', color: 'var(--color-acento-principal)' }}>
        Pastelería 1000 Sabores
      </div>

      {/* Navegación Principal */}
      <nav style={{ display: 'flex', gap: '20px' }}>
        <a href="/" style={{ textDecoration: 'none', color: 'var(--color-texto-principal)' }}>Inicio</a>
        <a href="/catalogo" style={{ textDecoration: 'none', color: 'var(--color-texto-principal)' }}>Catálogo</a>
        <a href="/blog" style={{ textDecoration: 'none', color: 'var(--color-texto-principal)' }}>Blog</a> {/* Contenido Educativo [cite: 37] */}
      </nav>

      {/* Acciones de Usuario (Carrito, Login/Perfil) */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <a href="/carrito" style={{ textDecoration: 'none', color: 'var(--color-texto-principal)', fontSize: '1.2rem' }}>🛒</a> {/* Carrito De Compra [cite: 107] */}
        <Button onClick={() => window.location.href='/login'} variant="secondary" style={{ backgroundColor: 'var(--color-acento-secundario)' }}>
          👤 Iniciar Sesión / Registrarse
        </Button> {/* Registro y Autenticación [cite: 14] */}
      </div>
    </header>
  );
};

export default Header;