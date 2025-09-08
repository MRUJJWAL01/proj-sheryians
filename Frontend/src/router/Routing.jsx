import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import RegisterForm from "../components/RegisterForm";
import { AuthPage } from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductDetail from "../pages/ProductDetail";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routing;
