import React, { useState, useEffect } from 'react'; // ¡Importar hooks!
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Button from './components/Button.js';

// URL base de tu API, donde el Backend está escuchando (Puerto 3001 por defecto)
const API_BASE_URL = 'http://localhost:3001/api/v1';

// Componente ProductCard (sin cambios, ya que ahora recibe datos reales)
const ProductCard = ({ name, price, description, id }) => (
  <div style={{
    border: '1px solid #E0D3C5',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#FFFFFF', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  }}>
    <h3 style={{ margin: '0 0 10px 0', color: 'var(--color-acento-principal)' }}>{name}</h3>
    <p style={{ color: 'var(--color-texto-secundario)', fontSize: '0.9rem' }}>{description}</p>
    
    <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--color-acento-principal)' }}>${price.toLocaleString('es-CL')} CLP</p>
    
    <Button onClick={() => console.log(`Agregado: ${name}`)}>
      Agregar al Carrito 🛒
    </Button>
  </div>
);


// Componente principal App.js
function App() {
  // 1. Estados para manejar los datos, la carga y posibles errores
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Hook para llamar a la API al cargar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Llama al endpoint del Catálogo definido en el Backend
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
        setIsLoading(false); // Termina el estado de carga
      }
    };

    fetchProducts();
  }, []); // El array vacío [] asegura que esto se ejecute solo una vez (al montar el componente)


  // 3. Renderizado Condicional
  let content;

  if (isLoading) {
    // Muestra un mensaje de carga mientras se espera la respuesta del servidor
    content = <p style={{ textAlign: 'center', fontSize: '1.5rem', color: 'var(--color-acento-principal)' }}>Cargando nuestro dulce catálogo...</p>;
  } else if (error) {
    // Muestra un mensaje de error si falla la conexión
    content = <p style={{ textAlign: 'center', fontSize: '1.5rem', color: '#B22222' }}>⚠️ {error}</p>;
  } else if (products.length === 0) {
     // Muestra mensaje si no hay productos (pero la API respondió bien)
    content = <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>No hay productos disponibles en este momento.</p>;
  } else {
    // Muestra los productos obtenidos de la API
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
            name={p.nombre} // <-- Importante: usar 'nombre' y no 'name' (viene del modelo del backend)
            price={p.precio} // <-- Usar 'precio'
            description={p.descripcion} // <-- Usar 'descripcion'
          />
        ))}
      </div>
    );
  }

  return (
    <div className="App">
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

export default App;