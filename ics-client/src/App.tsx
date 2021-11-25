import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component';
import CartPage from './pages/cart/cart.component';
import Cart from './pages/cart/cart.component';
// import IceCreamDetail from './pages/ice-cream-detail/ice-cream-detail.component';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in-up" element={<SignInUpPage />} />
        <Route path="/cart-items" element={<CartPage />} />
        <Route path="/cart-items" element={<Cart />} />
      </Routes> 
       {/* <IceCreamDetail /> */}
    </div>
  );
}

export default App;
