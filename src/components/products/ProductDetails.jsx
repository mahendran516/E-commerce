import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";
import { useCart } from "../context/CartContext";



const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.in/api/products/${id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data.product); 
      })
      .catch((error) => {
        console.error('Error fetching product details', error);
      });
  }, [id]);

  if (!product) {
    return <div className="mt-28">Loading...</div>;
  }

  return (
    <div className="p-4 mt-28">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col  justify-center items-center ">
        <img
          src={product.image}
          alt={product.title}
          className=" w-96  mb-4 rounded-md"
        />
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-3xl font-bold">${product.price}</p>
       <div className="flex items-center gap-2 bg-red-500 text-white px-4 rounded-md py-1 mt-3 justify-center">
       <LuShoppingBag />
       <button onClick={() => addToCart(product)} className="bg-transparent">Add To Cart</button>
       
       </div>
      </div>
    </div>
  );
};

export default ProductDetails;
