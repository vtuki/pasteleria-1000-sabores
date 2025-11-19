import React, { useState } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Button from '../components/Button.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 👈 ¡Importar useAuth!

const API_LOGIN_URL = 'http://localhost:3001/api/v1/login';

const LoginPage = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth(); // 👈 Inicializar el hook DENTRO del componente

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Iniciando sesión...');
    setIsError(false);
    
    try {
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && response.status === 200) {
        console.log("Token de autenticación simulado:", data.token);
        
        // 💥 Acción: USAR EL CONTEXTO DE AUTH PARA INICIAR SESIÓN
        auth.login(data.user, data.token); 
        
        setMessage(`¡Bienvenido, ${data.user.email}! Redirigiendo...`);
        setTimeout(() => navigate('/'), 2000); 

      } else {
        setIsError(true);
        setMessage(data.message || 'Credenciales inválidas o error desconocido.');
      }
    } catch (error) {
      setIsError(true);
      setMessage('Error de conexión. Asegúrate de que el Backend esté activo.');
    }
  }; // 👈 CIERRE CORRECTO DE handleSubmit

  return (
    <>
      <Header />
      
      {/* CONTENEDOR FLEXBOX PARA CENTRADO VERTICAL */}
      <div style={{
        display: 'flex',                 
        justifyContent: 'center',        
        alignItems: 'center',          
        minHeight: 'calc(100vh - 120px)' 
      }}>
        
        {/* MAIN: La caja del formulario con estilos refinados */}
        <main style={{ 
          maxWidth: '400px', 
          padding: '30px',             
          backgroundColor: '#FFFFFF', 
          borderRadius: '8px', 
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ textAlign: 'center', color: 'var(--color-acento-principal)' }}>Iniciar Sesión</h2>
          
          <form onSubmit={handleSubmit}>
            
            {/* Campo Email */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
            </div>
            
            {/* Campo Contraseña */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
            </div>

            {/* Botón de envío */}
            <Button type="submit" variant="primary" style={{ width: '100%' }}>
              Acceder
            </Button>
          </form>

          {/* Mensajes de feedback */}
          {message && (
            <p style={{ marginTop: '20px', padding: '10px', border: `1px solid ${isError ? '#B22222' : 'green'}`, color: isError ? '#B22222' : 'green', backgroundColor: isError ? '#FFCCCC' : '#CCFFCC' }}>
              {message}
            </p>
          )}
          
          <p style={{ textAlign: 'center', marginTop: '15px' }}>
              ¿No tienes cuenta? <a href="/register" style={{ color: 'var(--color-acento-principal)' }}>Regístrate aquí</a>
          </p>

        </main>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;