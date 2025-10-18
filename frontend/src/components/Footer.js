import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      padding: '30px',
      borderTop: '1px solid #E0D3C5', // Línea de separación suave
      marginTop: '40px',
      backgroundColor: 'var(--color-fondo-principal)',
      textAlign: 'center',
      color: 'var(--color-texto-secundario)'
    }}>
      <p style={{ margin: '5px 0' }}>© {new Date().getFullYear()} Pastelería 1000 Sabores. Celebra la dulzura de la vida.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
        <a href="/impacto" style={{ color: 'var(--color-texto-secundario)' }}>Impacto Comunitario</a> {/* [cite: 61] */}
        <a href="/redes" style={{ color: 'var(--color-texto-secundario)' }}>Redes Sociales</a> {/* Integración con Redes Sociales [cite: 38] */}
      </div>
    </footer>
  );
};

export default Footer;