import React, { useEffect, useState } from "react";
import ProductCard from "../components/Productcard";
import { fetchAllProducts } from "../apis/ProductApis";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);   // ✅ default empty array
  const [loading, setLoading] = useState(true);         // ✅ loading state
  const [error, setError] = useState(null);             // ✅ error handling

  useEffect(() => {
    let isMounted = true; // ✅ cleanup guard (avoid memory leaks)

    const getProducts = async () => {
      try {
        const response = await fetchAllProducts();
        if (isMounted) {
          setAllProducts(response || []);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch products");
          console.error(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getProducts();

    return () => {
      isMounted = false; // ✅ cleanup
    };
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      {allProducts.length === 0 ? (
        <p className="text-gray-500 text-center">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard
              key={product._id}   // ✅ use unique id instead of index
              title={product.title}
              images={product.images}
              price={product.price}
              id={product._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
