// frontend/src/pages/CartPage.js

import React, { useEffect } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Button from '../components/Button.js';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const auth = useAuth();
    const { cart, loading, fetchCart, removeItem } = useCart();
    const navigate = useNavigate();

    // Redirigir si no está autenticado y asegurar la carga del carrito
    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/login');
        }
        // Asegurar que el carrito se cargue si no está ya en el estado
        if (!cart) {
            fetchCart();
        }
    }, [auth.isAuthenticated, navigate, cart, fetchCart]); // 👈 DEPENDENCIA AÑADIDA: fetchCart

    const handleRemove = (itemId) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto del carrito?')) {
            removeItem(itemId);
        }
    };
    
    // Si la carga o la autenticación fallan, muestra un mensaje
    if (!auth.isAuthenticated) return null; 
    
    if (loading || !cart) {
        return <p style={{textAlign: 'center', margin: '50px'}}>Cargando carrito...</p>;
    }
    
    const { items, subtotal, total } = cart;

    return (
        <>
            <Header />
            <div style={{ padding: '40px 60px', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ color: 'var(--color-acento-principal)' }}>🛒 Carrito de Compras</h1>

                {items.length === 0 ? (
                    <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>Tu carrito está vacío. ¡Revisa nuestro <a href="/catalogo">catálogo</a>!</p>
                ) : (
                    <>
                        {/* Listado de Productos */}
                        <div style={{ marginTop: '30px', borderTop: '1px solid #ccc' }}>
                            {items.map((item, index) => (
                                <div key={index} style={{ 
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                                    padding: '15px 0', borderBottom: '1px solid #eee' 
                                }}>
                                    <div>
                                        <h3 style={{ margin: 0 }}>{item.product?.nombre || 'Producto Desconocido'}</h3>
                                        <p style={{ margin: '5px 0' }}>Cantidad: {item.quantity}</p>
                                        {item.customization && <p style={{ fontSize: '0.8rem', color: '#8B4513' }}>Personalización: {item.customization}</p>}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 'bold' }}>${item.totalPrice.toLocaleString('es-CL')} CLP</p>
                                        <Button 
                                            onClick={() => handleRemove(index)}
                                            variant="secondary"
                                            style={{ backgroundColor: '#FFCCCC', color: '#B22222', padding: '5px 10px' }}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Resumen de Carrito (RF-2) */}
                        <div style={{ marginTop: '30px', borderTop: '2px solid var(--color-acento-principal)', paddingTop: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <p style={{ fontWeight: 'bold' }}>Subtotal:</p>
                                <p>${subtotal.toLocaleString('es-CL')} CLP</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <p style={{ fontWeight: 'bold' }}>Descuentos aplicados:</p>
                                <p>${(subtotal - total).toLocaleString('es-CL')} CLP</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                <p>TOTAL:</p>
                                <p>${total.toLocaleString('es-CL')} CLP</p>
                            </div>
                        </div>

                        {/* Botón de Pago/Checkout */}
                        <Button 
                            variant="primary" 
                            style={{ width: '100%', padding: '15px', marginTop: '30px' }}
                            onClick={() => navigate('/checkout')} 
                        >
                            Proceder al Pago
                        </Button>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CartPage;