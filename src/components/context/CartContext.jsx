import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import auth, { db } from '../../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // Listen to auth state changes to get the current user ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchCartItems(user.uid);
      } else {
        setUserId(null);
        setCart([]); // Clear cart on logout
      }
    });
    return () => unsubscribe();
  }, []);

  // Function to fetch cart items for a specific user from Firestore
  const fetchCartItems = async (uid) => {
    try {
      const q = query(collection(db, 'cartItems'), where('userId', '==', uid));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCart(items);
    } catch (error) {
      console.error('Error fetching cart items: ', error);
    }
  };

  const addToCart = async (product) => {
    if (!userId) {
      toast.error("You must be logged in to add items to the cart");
      return;
    }

    const cartItem = { ...product, quantity: 1, userId };
    try {
      const docRef = await addDoc(collection(db, 'cartItems'), cartItem);
      cartItem.id = docRef.id; // Set Firestore document ID to the cart item
      setCart((prevCart) => [...prevCart, cartItem]);
      toast.success("Added to cart");
    } catch (error) {
      console.error('Error adding to cart: ', error);
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = async (product) => {
    try {
      await deleteDoc(doc(db, 'cartItems', product.id));
      setCart((prevCart) => prevCart.filter(item => item.id !== product.id));
      toast.success("Removed from cart");
    } catch (error) {
      console.error('Error removing from cart: ', error);
      toast.error("Failed to remove from cart");
    }
  };

  const updateCartQuantity = async (product, quantity) => {
    const updatedQuantity = Math.max(1, quantity);
    try {
      await updateDoc(doc(db, 'cartItems', product.id), { quantity: updatedQuantity });
      setCart((prevCart) => 
        prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: updatedQuantity } : item
        )
      );
      toast.success("Updated cart quantity");
    } catch (error) {
      console.error('Error updating cart quantity: ', error);
      toast.error("Failed to update cart quantity");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
