// frontend/src/pages/ProfilePage.js (Creación de la página)

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
                // Petición GET al nuevo endpoint /profile
                const response = await fetch(API_PROFILE_URL, {
                    method: 'GET',
                    headers: auth.getAuthHeaders(), // Incluye el token
                });

                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos del perfil.');
                }
                
                const data = await response.json();
                setProfileData(data);
                setFormData({ 
                    age: data.age || '',
                    isUdecStudent: data.isUdecStudent || false,
                    // Aquí se agregarían campos de dirección y teléfono
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

        const payload = { ...formData, age: parseInt(formData.age, 10) };

        try {
            // Petición PUT al nuevo endpoint /profile
            const response = await fetch(API_PROFILE_URL, {
                method: 'PUT',
                headers: auth.getAuthHeaders(), // Incluye el token
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Perfil actualizado correctamente.');
                // Actualizar el contexto para reflejar el cambio en el Header
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
                    maxWidth: '600px', 
                    width: '100%',
                    padding: '30px', 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '8px', 
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)' 
                }}>
                    <h1 style={{ color: 'var(--color-acento-principal)', borderBottom: '2px solid var(--color-acento-secundario)', paddingBottom: '10px' }}>
                        Gestión de Perfil (RF-3)
                    </h1>
                    
                    <p>
                        **Email:** {profileData?.email} | **Rol:** {profileData?.rol}
                    </p>
                    
                    <h2 style={{ marginTop: '30px' }}>Beneficios y Descuentos</h2>
                    {profileData?.descuentos?.length > 0 ? (
                        <ul>
                            {profileData.descuentos.map((d, index) => (
                                <li key={index}>**{d.valor}** ({d.tipo}): {d.descripcion}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Actualmente no tienes descuentos activos.</p>
                    )}

                    <h2 style={{ marginTop: '30px' }}>Actualizar Datos de Entrega y Promociones</h2>
                    <form onSubmit={handleSubmit}>
                        
                        {/* Campo Edad (Crucial para el descuento RF-3) */}
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
                        </div>

                        {/* Checkbox Duoc (Para la promoción de tortas gratis) */}
                        <div style={{ marginBottom: '20px' }}>
                            <label>
                                <input 
                                    type="checkbox" 
                                    name="isUdecStudent" 
                                    checked={formData.isUdecStudent} 
                                    onChange={handleChange} 
                                    style={{ marginRight: '10px' }}
                                />
                                Soy estudiante de UdeC (para promoción de torta gratis en cumpleaños).
                            </label>
                        </div>
                        
                        <Button type="submit" variant="primary" style={{ width: '100%' }}>
                            Guardar Cambios
                        </Button>
                    </form>

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