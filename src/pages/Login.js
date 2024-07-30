import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RotatingLines } from "react-loader-spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://smartserver-scbe.onrender.com/login",
          {
            email,
            password,
          }
        );

        if (response && response.data.success) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("token", response.data.token);

          // Decode the token to get the user role

          const tokenPayload = JSON.parse(
            atob(response.data.token.split(".")[1])
          );
          const userRole = tokenPayload.role;

          // Store user role in localStorage
          localStorage.setItem(
            "currentUser",
            JSON.stringify({ email, role: userRole })
          );

          if (email === "smartsaver@admin.com" && password === "123456") {
            toast.success("Admin Logged in successfully!");
            navigate("/admin/dashboard");
          } else {
            toast.success("Login successful!");
            setTimeout(() => {
              if (userRole === 1) {
                navigate("/admin/dashboard");
              } else {
                navigate("/");
              }
            }, 2000);
          }

          localStorage.setItem(
            "currentUser",
            JSON.stringify({ name: "User Name", role: userRole })
          );

          setTimeout(() => {
            if (userRole === 1) {
              navigate("/admin/dashboard");
              toast.success("Welcome Admin");
            } else {
              navigate("/");
            }
          }, 2000);
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
            Login
          </h2>
          <p className="text-center text-gray-600">Sign in to your account</p>
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
                "Login"
              )}
            </button>
            <div className="flex justify-between mt-4">
              <Link
                to="/user/signup"
                className="text-green-600 hover:underline"
              >
                Sign Up
              </Link>
              <Link
                to="/user/forgot-password"
                className="text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
