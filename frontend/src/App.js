import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importar los componentes de página
import WelcomePage from './pages/WelcomePage.js';
import RedirectHome from './pages/RedirectHome.js';
import HomePage from './pages/HomePage.js';     
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import ProfilePage from './pages/ProfilePage.js'; 
import CartPage from './pages/CartPage.js';
import CheckoutPage from './pages/CheckoutPage.js';
import OrderTrackingPage from './pages/OrderTrackingPage.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RedirectHome />} />
        <Route path="/home" element={<WelcomePage />} />
        <Route path="/catalogo" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders/tracking" element={<OrderTrackingPage />} />
        <Route path="/profile" element={<ProfilePage />} /> 
      </Routes>
    </div>
  );
}

export default App;