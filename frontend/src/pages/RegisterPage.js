import React, { useState } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Button from '../components/Button.js';
import { useNavigate } from 'react-router-dom';

const API_REGISTER_URL = 'http://localhost:3001/api/v1/register';

const RegisterPage = () => {
  // 💥 CORRECCIÓN: Usar isUdecStudent para ser consistente con el requisito de la pastelería.
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    age: '', 
    isUdecStudent: false 
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Registrando...');
    setIsError(false);
    
    const payload = { ...formData, age: parseInt(formData.age, 10) };

    try {
      const response = await fetch(API_REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && response.status === 201) {
        setMessage(`Registro exitoso. Descuentos obtenidos: ${data.user.descuentos.length > 0 ? data.user.descuentos.map(d => d.valor).join(', ') : 'Ninguno'}`);
        setTimeout(() => navigate('/login'), 3000); 
      } else {
        setIsError(true);
        setMessage(data.message || 'Error desconocido al registrar.');
      }
    } catch (error) {
      setIsError(true);
      setMessage('Error de conexión. Asegúrate de que el Backend esté activo.');
    }
  };

  return (
    <>
      <Header />
      
      {/* 💥 CONTENEDOR FLEXBOX PARA CENTRADO VERTICAL */}
      <div style={{
        display: 'flex',                 
        justifyContent: 'center',        
        alignItems: 'center',          
        minHeight: 'calc(100vh - 120px)' 
      }}>
        
        {/* 💥 MAIN: La caja del formulario con estilos refinados */}
        <main style={{ 
          maxWidth: '450px', // Un poco más ancho para el formulario de registro
          padding: '30px', 
          backgroundColor: '#FFFFFF', 
          borderRadius: '8px', 
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ textAlign: 'center', color: 'var(--color-acento-principal)' }}>Crear Cuenta</h2>
          
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
            <div style={{ marginBottom: '15px' }}>
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

            {/* Campo Edad (Requerido para descuento > 50 años) */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="age" style={{ display: 'block', marginBottom: '5px' }}>Edad:</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age} 
                onChange={handleChange} 
                required 
                min="10"
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
              <small style={{ color: 'var(--color-texto-secundario)' }}>Si eres mayor de 50 años, recibirás un descuento del 50%.</small>
            </div>

            {/* Checkbox Duoc (Requerido para tortas gratis en cumpleaños) */}
            <div style={{ marginBottom: '20px' }}>
              <label>
                <input 
                  type="checkbox" 
                  name="isUdecStudent" 
                  checked={formData.isUdecStudent} 
                  onChange={handleChange} 
                  style={{ marginRight: '10px' }}
                />
                Soy estudiante de UdeC (para torta gratis en cumpleaños).
              </label>
            </div>

            {/* Botón de envío */}
            <Button type="submit" variant="primary" style={{ width: '100%' }}>
              Registrarme
            </Button>
          </form>

          {/* Mensajes de feedback */}
          {message && (
            <p style={{ marginTop: '20px', padding: '10px', border: `1px solid ${isError ? '#B22222' : 'green'}`, color: isError ? '#B22222' : 'green', backgroundColor: isError ? '#FFCCCC' : '#CCFFCC' }}>
              {message}
            </p>
          )}
          
          <p style={{ textAlign: 'center', marginTop: '15px' }}>
              ¿Ya tienes cuenta? <a href="/login" style={{ color: 'var(--color-acento-principal)' }}>Inicia Sesión aquí</a>
          </p>

        </main>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;