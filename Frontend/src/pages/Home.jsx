import axios, { all } from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";

const HomePage = () => {
  const [allProducts, setAllProducts] = useState(null);

  let fetchAllProducts = async () => {
    try {
      let response = await axios.get("https://proj-sheryians.onrender.com/api/product");
      if (response) {
        setAllProducts(response.data.products);
      }
    } catch (error) {
      console.log("error while fetching products data", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts?.map((product) => (
          <ProductCard
            key={product._id || product.title}
            title={product.title}
            price={product.price}
            images={product.images}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
