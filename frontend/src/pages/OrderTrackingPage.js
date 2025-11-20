// frontend/src/pages/OrderTrackingPage.js

import React, { useState } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Button from '../components/Button.js';
import { useAuth } from '../context/AuthContext.js';

const API_TRACKING_BASE_URL = 'http://localhost:3001/api/v1/orders';

const OrderTrackingPage = () => {
    const auth = useAuth();
    
    const [orderId, setOrderId] = useState('');
    const [trackingData, setTrackingData] = useState(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Redirigir si no está autenticado (solo usuarios registrados pueden hacer seguimiento)
    if (!auth.isAuthenticated) {
        return <p style={{textAlign: 'center', margin: '50px'}}>Por favor, inicia sesión para acceder al seguimiento de pedidos.</p>;
    }

    const handleChange = (e) => {
        setOrderId(e.target.value);
        setTrackingData(null);
        setMessage('');
        setIsError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!orderId) {
            setMessage('Ingresa un número de pedido válido.');
            return;
        }

        setIsLoading(true);
        setTrackingData(null);
        setMessage('Buscando pedido...');
        setIsError(false);
        
        try {
            // Llama al endpoint GET /api/v1/orders/:orderId/track (RF-4)
            const response = await fetch(`${API_TRACKING_BASE_URL}/${orderId}/track`, {
                method: 'GET',
                headers: auth.getAuthHeaders(),
            });

            const data = await response.json();

            if (response.ok) {
                setTrackingData(data);
                setMessage('Estado del pedido encontrado.');
                setIsError(false);
            } else {
                setIsError(true);
                setMessage(data.message || 'Pedido no encontrado. Verifica el ID.');
            }
        } catch (error) {
            setIsError(true);
            setMessage('Error de conexión al servidor de seguimiento.');
        } finally {
            setIsLoading(false);
        }
    };

    // Función para mapear el estado a un color
    const getStatusStyle = (status) => {
        switch (status) {
            case 'En Preparación':
                return { backgroundColor: '#FFC0CB', color: 'var(--color-texto-principal)', padding: '5px 10px', borderRadius: '4px' };
            case 'Entregado':
                return { backgroundColor: '#A0FFA0', color: '#006400', padding: '5px 10px', borderRadius: '4px' };
            case 'Pendiente de Pago':
            default:
                return { backgroundColor: '#FDFD96', color: '#8B4513', padding: '5px 10px', borderRadius: '4px' };
        }
    };


    return (
        <>
            <Header />
            <div style={{ padding: '40px 60px', maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ color: 'var(--color-acento-principal)', borderBottom: '2px solid var(--color-acento-secundario)', paddingBottom: '10px' }}>
                    🔍 Seguimiento de Pedidos (RF-4)
                </h1>

                <form onSubmit={handleSubmit} style={{ margin: '30px 0', backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="orderId" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Ingresa el Número de Pedido:
                        </label>
                        <input 
                            type="text" 
                            name="orderId" 
                            value={orderId} 
                            onChange={handleChange} 
                            required 
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} 
                            placeholder="Ej: 1, 2, 3..."
                        />
                    </div>

                    <Button type="submit" variant="primary" style={{ width: '100%' }} disabled={isLoading}>
                        {isLoading ? 'Buscando...' : 'Rastrear Pedido'}
                    </Button>
                </form>
                
                {/* Mensajes de feedback */}
                {message && (
                    <p style={{ marginTop: '20px', padding: '10px', border: `1px solid ${isError ? '#B22222' : 'green'}`, color: isError ? '#B22222' : 'green', backgroundColor: isError ? '#FFCCCC' : '#CCFFCC' }}>
                        {message}
                    </p>
                )}

                {/* Resultado del Seguimiento */}
                {trackingData && !isError && (
                    <div style={{ marginTop: '30px', backgroundColor: '#FFFFFF', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <h2>Estado de la Orden N° {trackingData.orderId}</h2>
                        <hr style={{ borderColor: 'var(--color-acento-secundario)' }} />
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <p>Estado Actual:</p>
                            <span style={getStatusStyle(trackingData.status)}>
                                **{trackingData.status}**
                            </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <p>Fecha de Entrega Programada:</p>
                            <p>{new Date(trackingData.deliveryDate).toLocaleDateString()} a las {new Date(trackingData.deliveryDate).toLocaleTimeString()}</p>
                        </div>

                        <p>Ítems en la Orden: {trackingData.itemsCount}</p>
                        <small style={{ color: 'var(--color-texto-secundario)' }}>Esta información se actualiza desde el Back-End (RF-4).</small>
                    </div>
                )}

            </div>
            <Footer />
        </>
    );
};

export default OrderTrackingPage;