import React from 'react';
import Header from './components/Header.js'; // <-- ¡Añade .js!
import Footer from './components/Footer.js'; // <-- ¡Añade .js!
import Button from './components/Button.js'; // <-- ¡Añade .js!


// ... el resto de tu código App.js ...

// Componente ProductCard
const ProductCard = ({ name, price, description, id }) => (
  <div style={{
    border: '1px solid #E0D3C5',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#FFFFFF', // Fondo blanco para resaltar el producto
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
  // Datos de catálogo de ejemplo
  const products = [
    { id: 1, name: "Torta Cuadrada de Chocolate", price: 45000, description: "Deliciosa torta de chocolate con capas de ganache." },
    { id: 2, name: "Torta Circular de Manjar", price: 42000, description: "Torta tradicional chilena con manjar y nueces." },
    { id: 3, name: "Mousse de Chocolate", price: 5000, description: "Postre individual cremoso y suave." },
    { id: 4, name: "Torta Sin Azúcar de Naranja", price: 48000, description: "Torta ligera y deliciosa, endulzada naturalmente." }
  ];

  return (
    <div className="App">
      <Header />
      
      {/* Área de Contenido Principal: Catálogo y Promociones */}
      <main style={{ padding: '40px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '40px' }}>
          Nuestro Dulce Catálogo
        </h1>

        {/* Muestra de Catálogo con un diseño de rejilla (Grid) limpio */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {products.map((p) => (
            <ProductCard 
              key={p.id} 
              id={p.id}
              name={p.name} 
              price={p.price} 
              description={p.description} 
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;