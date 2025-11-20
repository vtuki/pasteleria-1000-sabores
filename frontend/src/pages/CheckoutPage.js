// frontend/src/pages/CheckoutPage.js

import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Button from '../components/Button.js';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';

const API_CHECKOUT_URL = 'http://localhost:3001/api/v1/checkout';

const CheckoutPage = () => {
    const auth = useAuth();
    const cart = useCart();
    const navigate = useNavigate();

    const [deliveryDetails, setDeliveryDetails] = useState({
        date: '',
        address: '', // Campo de lugar de destino
        customization: '' // Campo de personalización (RF-2)
    });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // 1. Redirigir si no hay ítems en el carrito o no está autenticado
    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/login');
        } else if (cart.cart && cart.cart.items.length === 0) {
            navigate('/carrito');
        }
    }, [auth.isAuthenticated, cart.cart, navigate]);
    
    // No renderizar hasta que el carrito se cargue
    if (!cart.cart || cart.loading) return <p style={{textAlign: 'center', margin: '50px'}}>Cargando carrito...</p>;


    const handleChange = (e) => {
        setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Procesando pedido...');
        setIsError(false);
        
        try {
            // Petición POST al endpoint /checkout
            const response = await fetch(API_CHECKOUT_URL, {
                method: 'POST',
                headers: auth.getAuthHeaders(),
                body: JSON.stringify(deliveryDetails),
            });

            const data = await response.json();

            if (response.ok && response.status === 201) {
                // Éxito: El carrito está vacío y se generó la orden
                cart.fetchCart(); // Recargar carrito para mostrarlo vacío
                setMessage(`Pedido N° ${data.orderId} creado con éxito. Total: ${data.total.toLocaleString('es-CL')} CLP. (Pendiente de pago)`);
                setTimeout(() => navigate('/orders/tracking'), 4000); // Redirigir a una página de seguimiento
            } else {
                setIsError(true);
                setMessage(data.message || 'Error al finalizar la compra.');
            }
        } catch (error) {
            setIsError(true);
            setMessage('Error de conexión con el servidor.');
        }
    };

    const summary = cart.cart;

    return (
        <>
            <Header />
            <div style={{ padding: '40px 60px', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: 'var(--color-acento-principal)', borderBottom: '2px solid var(--color-acento-secundario)', paddingBottom: '10px' }}>
                    Finalizar Compra (Checkout)
                </h1>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', marginTop: '20px' }}>
                    
                    {/* Columna Izquierda: Formulario de Entrega (RF-4) y Personalización (RF-2) */}
                    <div style={{ flex: 1, paddingRight: '20px' }}>
                        <h2>1. Programación de Entrega</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Campo Lugar/Dirección */}
                            <div style={{ marginBottom: '15px' }}>
                                <label htmlFor="address">Lugar de Destino (Dirección):</label>
                                <input type="text" name="address" value={deliveryDetails.address} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
                            </div>

                            {/* Campo Fecha Programada */}
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="date">Fecha y Hora de Entrega Programada (RF-4):</label>
                                <input type="datetime-local" name="date" value={deliveryDetails.date} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginTop: '5px' }} />
                            </div>

                            <h2>2. Personalización (RF-2)</h2>
                            <div style={{ marginBottom: '20px' }}>
                                <label htmlFor="customization">Mensaje Especial para la Torta:</label>
                                <textarea name="customization" value={deliveryDetails.customization} onChange={handleChange} rows="3" style={{ width: '100%', padding: '10px', marginTop: '5px' }} placeholder="Ej: 'Feliz cumpleaños, Ignacio' o notas especiales."></textarea>
                                <small style={{ color: 'var(--color-texto-secundario)' }}>Aplica a productos marcados como personalizables.</small>
                            </div>

                            <Button type="submit" variant="primary" style={{ width: '100%', padding: '15px', marginTop: '10px' }}>
                                Confirmar Pedido y Proceder al Pago (Simulado)
                            </Button>
                        </form>
                        
                        {message && (
                            <p style={{ marginTop: '20px', padding: '10px', border: `1px solid ${isError ? '#B22222' : 'green'}`, color: isError ? '#B22222' : 'green', backgroundColor: isError ? '#FFCCCC' : '#CCFFCC' }}>
                                {message}
                            </p>
                        )}
                    </div>
                    
                    {/* Columna Derecha: Resumen de Totales y Descuentos */}
                    <div style={{ flex: 1, backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <h2>Resumen de la Orden</h2>
                        {summary.items.map((item, index) => (
                            <div key={index} style={{ borderBottom: '1px dotted #ccc', padding: '5px 0' }}>
                                <p style={{ margin: 0 }}>{item.product?.nombre} x {item.quantity}</p>
                            </div>
                        ))}
                        
                        <div style={{ marginTop: '20px', borderTop: '2px solid #ccc', paddingTop: '10px' }}>
                            <p>Subtotal: **${summary.subtotal.toLocaleString('es-CL')} CLP**</p>
                            <p style={{ color: '#008000' }}>Descuento por Usuario (50% por edad): **${(summary.subtotal - summary.total).toLocaleString('es-CL')} CLP**</p>
                            <h3 style={{ margin: '15px 0 0', color: '#B22222' }}>TOTAL A PAGAR: **${summary.total.toLocaleString('es-CL')} CLP**</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CheckoutPage;