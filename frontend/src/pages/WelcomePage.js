// frontend/src/pages/WelcomePage.js

import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.js';

const WelcomePage = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <Header />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 120px)', // Altura de la vista menos Header y Footer
                padding: '40px'
            }}>
                
                {/* Título de Bienvenida con Fuente Pacífico */}
                <h1 style={{ 
                    fontFamily: 'var(--font-encabezado)', 
                    fontSize: '4.5rem', 
                    color: 'var(--color-acento-principal)',
                    marginBottom: '10px'
                }}>
                    BIENVENIDO A PASTELERÍA 1000 SABORES
                </h1>

                {/* Subtítulo descriptivo */}
                <p style={{ 
                    fontFamily: 'var(--font-principal)',
                    fontSize: '1.5rem',
                    color: 'var(--color-texto-principal)',
                    marginBottom: '40px',
                    textAlign: 'center'
                }}>
                    ¡Celebra la dulzura de la vida! Descubre nuestro catálogo.
                </p>

                {/* Botón para navegar al Catálogo (RF-1) */}
                <Button 
                    onClick={() => navigate('/catalogo')}
                    variant="primary"
                    style={{ padding: '15px 30px', fontSize: '1.2rem' }}
                >
                    Ver Catálogo Ahora
                </Button>

            </div>
            <Footer />
        </>
    );
};

export default WelcomePage;