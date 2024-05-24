import React from "react";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Contact from "./pages/ContactPage/ContactPage";
import { Route, Routes } from "react-router-dom";
import Scan from "./pages/Scan Qr/Scan";
import Notify from "./pages/Notification Page/Notify";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/notified" element={<Notify />} />
      </Routes>
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
