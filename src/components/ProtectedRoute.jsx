import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const ProtectedRoute = ({ children }) => {

    const location  = useLocation()
  if (!localStorage.getItem("userToken")) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};
export default ProtectedRoute;
