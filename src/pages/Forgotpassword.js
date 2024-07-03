import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://smartserver-scbe.onrender.com/forgot-password",
          { email }
        );

        if (response && response.data.success) {
          toast.success("Password reset email sent!");
          navigate("/user/login")

        }
      } catch (error) {
        if (error.response) {
          setErrors({ server: error.response.data.message });
          toast.error(error.response.data.message);
        } else if (error.request) {
          setErrors({
            server: "Server not responding. Please try again later.",
          });
          toast.error("Server not responding. Please try again later.");
        } else {
          setErrors({ server: "An error occurred. Please try again." });
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
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
            Forgot Password
          </h2>
          <p className="text-center text-gray-600">
            Enter your email to receive a password reset link
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            {errors.server && (
              <p className="mt-1 text-sm text-red-600">{errors.server}</p>
            )}
            <button
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
              disabled={loading}
            >
              {loading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
