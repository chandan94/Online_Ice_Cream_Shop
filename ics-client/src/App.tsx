import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component';
import CartPage from './pages/cart/cart.component';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in-up" element={<SignInUpPage />} />
        <Route path="/cart-items" element={<CartPage />} />
      </Routes>
    </div>
  );
}

export default App;
