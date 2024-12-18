import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home if the user is already logged in
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/"); // Redirect logged-in users to home
      }
    });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Successfully logged in.");
      navigate("/"); // Redirect to home after login
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-md shadow-md p-14">
        <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 mb-5"
          >
            Sign In
          </button>
          <Link to="/signup">
            Don't have an account? <span>Sign Up</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
