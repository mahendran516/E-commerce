import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import bglogo from "../../assets/bglogo.png";

import auth from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Navbar = ({ setSearchTerm }) => {
  const [log, setLog] = useState(false);
  const [userName, setUserName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); 
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLog(true);
        setUserName(user.email);
      } else {
        setLog(false);
        setUserName('');
      }
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth).then(() => {
      setLog(false);
      setUserName('');
      toast.error("User Logged out");
      navigate('/login');
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Main Navbar */}
      <nav className="bg-[#131921] fixed w-full z-50 top-0 flex items-center justify-between px-4 lg:px-12 py-3">
        {/* Menu Button (Small Screens Only) */}
        <button className="p-2 text-white lg:hidden" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Logo (Large Screens Only) */}
        <Link to="/" className="hidden lg:block">
          <img
            src={bglogo}
            alt="Logo"
            className="h-10 lg:h-12 border-2 border-transparent hover:border-white"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-grow mx-4 flex items-center bg-white rounded-md py-2 px-3">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent focus:outline-none flex-grow px-2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="px-2">
            <CiSearch size={20} />
          </button>
        </div>

        {/* Cart and User Details */}
        <div className="flex items-center space-x-6">
          {/* User Name and Logout (Large Screens Only) */}
          {log && (
            <div className="hidden lg:flex items-center space-x-4 text-white">
              <FaUser size={20} />
              <span>{userName}</span>
              <button
                className="border border-white hover:bg-white hover:text-[#131921] transition rounded-md px-3 py-1"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative flex items-center text-white p-2 border border-transparent hover:border-white rounded-md"
          >
            <FaShoppingCart size={22} />
            <span className='hidden md:block'>Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Sidebar Menu for Small Screens */}
   
      <div
        className={`fixed top-0 left-0 w-64 bg-[#131921] h-full z-50 ${
          menuOpen ? 'block' : 'hidden'
        } lg:hidden`}
      >
        <div className="p-4 flex justify-between items-center">
          <button className="text-white" onClick={toggleMenu}>
            <FaTimes size={20} />
          </button>
        </div>
        <div className="flex flex-col items-start p-4 gap-4">
          {log ? (
            <div className="flex flex-col gap-2 text-white">
              <span>{userName}</span>
              <button className="bg-red-500 py-2 px-4 rounded-md" onClick={logout}>
                Logout
              </button>
              <Link to="/" className="bg-red-500 py-2 px-4 rounded-md text-center">
                Home
              </Link>
            </div>
          ) : (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
