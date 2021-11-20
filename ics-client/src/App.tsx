import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component';
import CartPage from './pages/cart/cart.component';

function App() {
//   useEffect(() => {
//     const sayHello = async () => {
//       let todo = {
//         title: "impsum doloris",

//     };
//     fetch('api/customer/618c22204b8153d5f2bf45f5', {
//         method: 'PUT',
//         body: JSON.stringify(todo),
//         headers: { 'Content-Type': 'application/json' }
//     }).then(res => res.json())
//       .then(json => console.log(json));
//     };
//     sayHello();
// }, []);
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
