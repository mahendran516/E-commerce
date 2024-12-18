import React,{useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Login from './components/pages/Login';
import PageNotFound from './components/pages/PageNotFound';
import Signup from './components/pages/Signup';
import Cart from './components/products/Cart';
import ProductDetails from './components/products/ProductDetails';
import ProductList from './components/products/ProductList';
import { CartProvider } from './components/context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
 const [serachTerm,setSearchTerm]=useState("")
  return (
    <>
      <ToastContainer />
      <CartProvider>
        <BrowserRouter>
          <Navbar setSearchTerm={setSearchTerm}  /> 
          <Routes>
            <Route path="/" element={<><ProductList serachTerm={serachTerm}  /><Footer /></>} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
