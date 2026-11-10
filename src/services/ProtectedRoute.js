import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if JWT token exists

  return token ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
