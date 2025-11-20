// frontend/src/pages/RedirectHome.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Ejecutar la redirección programática
        navigate('/home', { replace: true });
    }, [navigate]); // Solo se ejecuta al montar el componente

    // No renderiza nada mientras espera la redirección
    return <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-fondo-principal)' }}></div>;
};

export default RedirectHome;