import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("role"); // Assuming user role is stored in localStorage

  if (!isLoggedIn) {
    return <Navigate to="/user/login" />;
  }

  if (userRole !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthRoute;
