// frontend/src/index.js (Debe quedar así)
import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// 1. Obtener el contenedor principal del HTML (generalmente el div con id='root')
const container = document.getElementById('root');

// 2. Crear una raíz de React 18
const root = createRoot(container); 

// 3. Renderizar el componente App usando la nueva raíz
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {}
        <CartProvider> 
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);