import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Contact from "./pages/ContactPage/ContactPage";
import AboutPage from "./pages/AboutPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutPage />} />

      </Routes>
    </>
  );
}

export default App;
