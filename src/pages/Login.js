import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Proceed with form submission (e.g., API call)
      console.log("Form submitted");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-2xl">
          <div className="flex justify-center">
            <img
              src="https://i.postimg.cc/jSY8z9x8/S-3-2.png"
              alt="Logo"
              className="w-16 h-16"
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-green-600">
            Login
          </h2>
          <p className="text-center text-gray-600">Sign in to your account</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Phone Number"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <button className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
              Login
            </button>
            <div className="flex justify-center mt-4">
              <Link
                to="/user/signup"
                className="text-green-600 hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
