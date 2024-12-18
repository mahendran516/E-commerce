import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const ProductList = ({serachTerm}) => {
  const [data, setData] = useState([]);
  
 

  useEffect(() => {
   try {
    axios.get("https://fakestoreapi.in/api/products")
    .then((response) => {
      setData(response.data.products);
    })
    .catch((error) => {
      console.error('Error fetching product details', error);
    });
   } catch (error) {
    
   }
  }, []);



  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4 p-4  mt-20">
     
      {
        data.filter((val)=>val.title.toLowerCase().includes(serachTerm)).map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <div className="bg-white shadow-lg rounded-md p-4">
              <img src={product.image} alt={product.title} className="w-full h-52 object-cover mb-4 rounded-md" />
              <h3 className="text-lg font-bold mb-2 line-clamp-1">{product.title}</h3>
              <p className="text-gray-700 mb-2 line-clamp-3">{product.description}</p>
              <p className="text-2xl font-bold">${product.price}</p>
            </div>
          </Link>
        ))
      }
    </div>
  );
};

export default ProductList;
