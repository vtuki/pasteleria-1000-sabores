import React, { useState, useEffect } from 'react'; 
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Button from '../components/Button.js';
import { useCart } from '../context/CartContext.js';
import { useAuth } from '../context/AuthContext.js';

// URL base de tu API, donde el Backend está escuchando (Puerto 3001 por defecto)
const API_BASE_URL = 'http://localhost:3001/api/v1';

// Componente ProductCard
const ProductCard = ({ name, price, description, id, imageUrl}) => {
  const cart = useCart();

  const handleAddToCart = () => {
      // Llama a la función addItem del contexto del carrito.
      cart.addItem(id, 1); 
  };
  
  return (
    <div style={{
      border: '1px solid #E0D3C5',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#FFFFFF', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    }}>
      <img 
        src={imageUrl} 
        alt={`Imagen de ${name}`} 
        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '15px' }}
      />
      <h3 style={{ margin: '0 0 10px 0', color: 'var(--color-acento-principal)' }}>{name}</h3>
      <p style={{ color: 'var(--color-texto-secundario)', fontSize: '0.9rem' }}>{description}</p>
      
      <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-acento-principal)' }}>${price.toLocaleString('es-CL')} CLP</p>
      
      <Button onClick={handleAddToCart}>
        Agregar al Carrito 🛒
      </Button>
    </div>
  );
};


// Componente HomePage
function HomePage() {
  const auth = useAuth();
  const cart = useCart();

  // 1. Estados para manejar los datos del Catálogo
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hook 1: Cargar Catálogo (se ejecuta solo una vez al montar)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/productos`); 
        
        if (!response.ok) {
          throw new Error('No se pudo obtener el catálogo. Código de estado: ' + response.status);
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);

      } catch (err) {
        console.error("Error al conectar con el backend:", err);
        setError("Error al cargar el catálogo. Asegúrate de que el Backend esté corriendo en el puerto 3001.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchProducts();
  }, []); 
  
  // Hook 2: Cargar el Carrito al cambiar el estado de autenticación
  useEffect(() => {
    // 💥 CORRECCIÓN: Si el usuario está autenticado Y la función fetchCart está disponible, ejecutarla.
    if (auth.isAuthenticated && cart.fetchCart) { 
        cart.fetchCart();
    }
  }, [auth.isAuthenticated, cart.fetchCart]); // 👈 Dependencia añadida: cart.fetchCart


  // 3. Renderizado Condicional del Catálogo
  let content;

  if (isLoading) {
    content = <p style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--color-acento-principal)' }}>Cargando nuestro dulce catálogo...</p>;
  } else if (error) {
    content = <p style={{ textAlign: 'center', fontSize: '1.5rem', color: '#B22222' }}>⚠️ {error}</p>;
  } else if (products.length === 0) {
    content = <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>No hay productos disponibles en este momento.</p>;
  } else {
    content = (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {products.map((p) => (
          <ProductCard 
            key={p.id} 
            id={p.id} 
            name={p.nombre} 
            price={p.precio} 
            description={p.descripcion}
            imageUrl={p.imageUrl} 
          />
        ))}
      </div>
    );
  }

  return (
    <div className="HomePage">
      <Header />
      
      <main style={{ padding: '40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '40px' }}>
          Nuestro Dulce Catálogo
        </h1>
        
        {content}
      </main>

      <Footer />
    </div>
  );
  
}

export default HomePage;