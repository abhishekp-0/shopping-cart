// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';


function App() {
  // Correct the cart state to be an array of objects with a 'quantity' property
  const [cart,setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  //items,getTotalPrice,getTotalItems,clearCart,updateQuantity,removeFromCart,

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/shop" element={<Shop addToCart={addToCart}/>} />
        <Route path="/cart" element={<Cart items={cart} getTotalItems={getTotalItems} getTotalPrice={getTotalPrice} clearCart={clearCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;