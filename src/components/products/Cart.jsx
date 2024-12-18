import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return <div className="p-4 mt-28 text-3xl font-medium">Your cart is empty.</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-medium mt-24">Your Shopping List</h1>
      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <div className="lg:col-span-2">
          {cart.map(item => (
            <div key={item.id} className="bg-white shadow-md rounded-md p-4 mb-4">
              <img src={item.image} alt={item.title} className="w-32 h-32 object-cover mb-4" />
              <h2 className="text-2xl font-bold mb-2 line-clamp-1">{item.title}</h2>
              <p className="text-gray-700 mb-4 line-clamp-3">{item.description}</p>
              <div className="flex items-center mb-4">
                <button
                  onClick={() => updateCartQuantity(item, item.quantity - 1)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item, item.quantity + 1)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md"
                >
                  +
                </button>
              </div>
              <p className="text-3xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item)}
                className="bg-red-500 text-white py-2 px-4 rounded-md mt-4"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-white shadow-md rounded-md p-4 mb-4 max-w-xl ">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <p className="text-xl mb-2">Total: ${calculateTotal()}</p>
          <button className="bg-green-500 text-white py-2 px-4 rounded-md w-full">Proceed to Payment</button>
        </div>
        
      </div>
    </>
  );
};

export default Cart;
