// frontend/src/pages/ProfilePage.js

import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Button from '../components/Button.js';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_PROFILE_URL = 'http://localhost:3001/api/v1/profile';

const ProfilePage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 1. Efecto para cargar el perfil o redirigir
    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/login');
            return;
        }
        
        const fetchProfile = async () => {
            try {
                const response = await fetch(API_PROFILE_URL, {
                    method: 'GET',
                    headers: auth.getAuthHeaders(),
                });

                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos del perfil.');
                }
                
                const data = await response.json();
                setProfileData(data);
                
                // 💥 INICIALIZACIÓN DE NUEVOS CAMPOS (y los existentes)
                setFormData({ 
                    nombre: data.nombre || '',
                    apellido: data.apellido || '',
                    telefono: data.telefono || '',
                    ciudad: data.ciudad || '',
                    direccion: data.direccion || '',
                    age: data.age || '',
                    isDuocStudent: data.isDuocStudent || false,
                });
                setMessage('');
            } catch (error) {
                setIsError(true);
                setMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [auth, navigate]);


    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    // 2. Manejar la actualización del perfil
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Guardando cambios...');
        setIsError(false);

        // Asegurarse de que la edad se envía como número
        const payload = { ...formData, age: parseInt(formData.age, 10) };

        try {
            const response = await fetch(API_PROFILE_URL, {
                method: 'PUT',
                headers: auth.getAuthHeaders(),
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Perfil actualizado correctamente.');
                // 💥 Actualizar el contexto con los nuevos datos
                auth.login(data.user, auth.token); 
                setProfileData(data.user);
                setIsError(false);
            } else {
                setIsError(true);
                setMessage(data.message || 'Error al actualizar el perfil.');
            }
        } catch (error) {
            setIsError(true);
            setMessage('Error de conexión. No se pudo contactar al servidor.');
        }
    };
    
    if (!auth.isAuthenticated || isLoading) {
        return <p style={{textAlign: 'center', margin: '50px'}}>Cargando perfil...</p>;
    }

    return (
        <>
            <Header />
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
                padding: '40px 0', minHeight: 'calc(100vh - 120px)' 
            }}>
                <main style={{ 
                    maxWidth: '700px', // Aumentamos el tamaño para los campos
                    width: '100%',
                    padding: '30px', 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '8px', 
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
                }}>
                    <h1 style={{ color: 'var(--color-acento-principal)', borderBottom: '2px solid var(--color-acento-secundario)', paddingBottom: '10px' }}>
                        Gestión de Perfil
                    </h1>
                    
                    <p style={{ marginBottom: '30px' }}>
                        **Email:** {profileData?.email} | **Rol:** {profileData?.rol || 'Cliente'}
                    </p>
                    
                    <h2 style={{ marginTop: '30px' }}>Datos Personales y de Contacto</h2>
                    <form onSubmit={handleSubmit}>
                        
                        {/* Fila Nombre y Apellido */}
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label htmlFor="nombre" style={{ display: 'block', marginBottom: '5px' }}>Nombre:</label>
                                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label htmlFor="apellido" style={{ display: 'block', marginBottom: '5px' }}>Apellido:</label>
                                <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                        </div>

                        {/* Campo Teléfono */}
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="telefono" style={{ display: 'block', marginBottom: '5px' }}>Teléfono de Contacto:</label>
                            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} placeholder="Ej: +56912345678" />
                        </div>
                        
                        <h2 style={{ marginTop: '30px' }}>Datos de Entrega</h2>

                        {/* Fila Ciudad y Dirección */}
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label htmlFor="ciudad" style={{ display: 'block', marginBottom: '5px' }}>Ciudad:</label>
                                <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                            <div style={{ flex: 2 }}>
                                <label htmlFor="direccion" style={{ display: 'block', marginBottom: '5px' }}>Dirección de Entrega:</label>
                                <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                            </div>
                        </div>

                        <h2 style={{ marginTop: '30px' }}>Descuentos y Promociones</h2>
                        
                        {/* Campo Edad (Crucial para el descuento) */}
                        <div style={{ marginBottom: '15px' }}>
                            <label htmlFor="age" style={{ display: 'block', marginBottom: '5px' }}>Edad:</label>
                            <input type="number" name="age" value={formData.age} onChange={handleChange} required min="10" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>

                        {/* Checkbox Duoc (Para la promoción de tortas gratis) */}
                        <div style={{ marginBottom: '20px' }}>
                            <label>
                                <input type="checkbox" name="isDuocStudent" checked={formData.isDuocStudent} onChange={handleChange} style={{ marginRight: '10px' }} />
                                Soy estudiante de **DuocUC** (para promoción de torta gratis en cumpleaños).
                            </label>
                        </div>
                        
                        <Button type="submit" variant="primary" style={{ width: '100%' }}>
                            Guardar Cambios
                        </Button>
                    </form>

                    {/* Beneficios y Descuentos (Se mueve al final para no interrumpir el formulario) */}
                    <div style={{ marginTop: '30px', borderTop: '1px solid #E0D3C5', paddingTop: '20px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Beneficios y Descuentos Activos</h3>
                        {profileData?.descuentos?.length > 0 ? (
                            <ul>
                                {profileData.descuentos.map((d, index) => (
                                    <li key={index}>**{d.valor}** ({d.tipo}): {d.descripcion}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Actualmente no tienes descuentos activos.</p>
                        )}
                    </div>
                    
                    {/* Mensajes de feedback */}
                    {message && (
                        <p style={{ marginTop: '20px', padding: '10px', border: `1px solid ${isError ? '#B22222' : 'green'}`, color: isError ? '#B22222' : 'green', backgroundColor: isError ? '#FFCCCC' : '#CCFFCC' }}>
                            {message}
                        </p>
                    )}

                </main>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePage;