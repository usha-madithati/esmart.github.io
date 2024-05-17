import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const SignUp = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 overflow-hidden space-y-6 bg-white rounded-lg m-5 shadow-2xl">
          <div className="flex justify-center">
            <img
              src="https://i.postimg.cc/8PZbqb9Z/logo1.png"
              alt="Logo"
              className="w-16 h-16"
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-green-600">
            Sign Up
          </h2>
          <p className="text-center text-gray-600">Register a new user</p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Username"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                placeholder="Password"
              />
            </div>
            <button className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
              Sign Up
            </button>
            <div className="flex justify-center mt-4">
              <Link to="/user/login" className="text-green-600 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
