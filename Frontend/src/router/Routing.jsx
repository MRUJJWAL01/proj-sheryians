import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import RegisterForm from "../components/RegisterForm";
import { AuthPage } from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import ProtectedRoute from "../components/ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
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
