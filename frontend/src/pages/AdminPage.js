// frontend/src/pages/AdminPage.js

import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Button from '../components/Button.js';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3001/api/v1';

const AdminPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('users'); // users, orders, products
    const [data, setData] = useState({ users: [], orders: [], products: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // 1. Redirección de Seguridad: Bloquea si no es Master
    useEffect(() => {
        if (!auth.isAuthenticated || !auth.isMaster) {
            navigate('/'); 
        }
    }, [auth.isAuthenticated, auth.isMaster, navigate]);

    // 2. Función de carga de datos
    const fetchData = async (endpoint, key) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
                method: 'GET',
                headers: auth.getAuthHeaders(), // Envía el token
            });

            if (!response.ok) {
                // Captura el error 403 (Acceso Denegado) si el middleware falla
                throw new Error(`Error ${response.status}: No se pudo cargar la data.`);
            }

            const result = await response.json();
            setData(prev => ({ ...prev, [key]: result }));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    // 3. Cargar datos al cambiar de pestaña
    useEffect(() => {
        if (auth.isMaster) {
            switch(activeTab) {
                case 'users':
                    fetchData('admin/users', 'users');
                    break;
                case 'orders':
                    fetchData('admin/orders', 'orders');
                    break;
                case 'products':
                    // Usamos el endpoint de catálogo para mostrar la data base
                    fetchData('products', 'products'); 
                    break;
                default:
                    break;
            }
        }
    }, [activeTab, auth.isMaster, fetchData]);

    // Muestra un mensaje de carga/redirigiendo si no hay acceso.
    if (!auth.isAuthenticated || !auth.isMaster) {
        return <p style={{textAlign: 'center', margin: '50px'}}>Cargando Panel de Administración...</p>;
    }
    
    // Componente para la tabla de Usuarios
    const UserTable = () => (
        <div>
            <h2>Gestión de Usuarios ({data.users.length})</h2>
            {/* ... Tabla de Usuarios (omitida por espacio) ... */}
        </div>
    );
    
    // Componente para la tabla de Pedidos
    const OrderTable = () => (
        <div>
            <h2>Gestión de Pedidos ({data.orders.length})</h2>
            {/* ... Tabla de Pedidos (omitida por espacio) ... */}
        </div>
    );

    // Componente para la tabla de Productos
    const ProductTable = () => (
        <div>
            <h2>Gestión de Catálogo ({data.products.length})</h2>
            {/* ... Tabla de Productos (omitida por espacio) ... */}
            <p style={{ marginTop: '20px', color: 'var(--color-texto-secundario)' }}>
                *La edición de catálogo (crear/actualizar/eliminar productos) es trabajo pendiente.
            </p>
        </div>
    );

    const renderContent = () => {
        if (loading) return <p style={{textAlign: 'center', margin: '20px'}}>Cargando datos de {activeTab}...</p>;
        if (error) return <p style={{textAlign: 'center', margin: '20px', color: '#B22222'}}>Error: {error}</p>;
        
        switch (activeTab) {
            case 'users':
                // (Retorna la tabla de usuarios con la data.users)
                return <UserTable />;
            case 'orders':
                // (Retorna la tabla de pedidos con la data.orders)
                return <OrderTable />;
            case 'products':
                // (Retorna la tabla de productos con la data.products)
                return <ProductTable />;
            default:
                return null;
        }
    };

    return (
        <>
            <Header />
            <main style={{ padding: '40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ color: 'var(--color-acento-principal)', borderBottom: '2px solid #E0D3C5', paddingBottom: '10px' }}>
                    Panel de Administración (Master)
                </h1>

                {/* Navegación de Pestañas */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', marginTop: '20px' }}>
                    {['users', 'orders', 'products'].map(tab => (
                        <Button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            variant={activeTab === tab ? 'primary' : 'secondary'}
                            style={{ minWidth: '150px' }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </Button>
                    ))}
                </div>

                {/* Contenido de la Pestaña Activa */}
                {renderContent()}

            </main>
            <Footer />
        </>
    );
};

export default AdminPage;