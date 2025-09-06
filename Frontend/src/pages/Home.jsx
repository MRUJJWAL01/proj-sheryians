import React, { useEffect, useState } from "react";
import ProductCard from "../components/Productcard";
import { axiosInstance } from "../config/axiosInstance";

const Home = () => {
  const [allProduct, setAllProduct] = useState(null);

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get("/product");

      if (response) {
        setAllProduct(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  },[]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProduct?.map((product, index) => {
          return (
            <ProductCard
              key={index}
              title={product.title}
              images={product.images}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
