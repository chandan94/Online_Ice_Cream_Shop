import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingOverlay from "react-loading-overlay";

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component';
import CartPage from './pages/cart/cart.component';
import { isSpinnerLoading } from './redux/overlay/overlay.selector';
import OrderHistory from './pages/order-history/order-history.component';
import Cart from './pages/cart/cart.component';
 import IceCreamDetail from './pages/ice-cream-detail/ice-cream-detail.component';
import { Omit } from 'react-redux';



const App = ({ loading } : any) => {
  return (
    <LoadingOverlay
    active={loading}
    spinner
    text='Frosting...'>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in-up" element={<SignInUpPage />} />
        <Route path="/cart-items" element={<CartPage />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/ice-cream-detail" element={<IceCreamDetail/>}/>
      </Routes>
      </div>
      </LoadingOverlay>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: isSpinnerLoading,
});

export default connect(mapStateToProps)(App);
