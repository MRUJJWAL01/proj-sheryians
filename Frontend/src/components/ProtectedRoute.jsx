import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { user, isLoggedIn, isLoading } = useSelector((state) => state.auth);
  
  if (isLoading) return <p>Loading...</p>;

  if (!isLoggedIn || !user) return <Navigate to={"/auth"} />;

  return children;
};

export default ProtectedRoute;
