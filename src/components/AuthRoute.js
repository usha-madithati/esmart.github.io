// AuthRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";

const AuthRoute = ({ element, ...rest }) => {
  // Check if user is authenticated and has admin role
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.role === 1;

  // Redirect to login if not authenticated or not an admin
  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/user/login" />;
  }

  return <Route {...rest} element={element} />;
};

export default AuthRoute;
