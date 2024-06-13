import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <nav className="bg-gray-100 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="h-14"
                src="https://i.postimg.cc/jSY8z9x8/S-3-2.png"
                alt="Logo"
              />
              <span className="ml-3 text-2xl font-semibold text-gray-800">
                Smart Saver
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:block">
            <div className="ml-6 flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-semibold"
              >
                HOME
              </Link>
              <Link
                to="/#about-us"
                className="text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-semibold"
              >
                ABOUT
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/user/dashboard"
                    className="text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-semibold"
                  >
                    USER
                  </Link>
                  <Link
                    to="/user/notifications"
                    className="text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-semibold"
                  >
                    GET NOTIFIED
                  </Link>
                </>
              ) : (
                <Link
                  to="/user/login"
                  className="text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-semibold"
                >
                  LOGIN
                </Link>
              )}
              <Link
                to="/scanqr"
                className="text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-semibold"
              >
                SCAN QR
              </Link>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-green-600 px-3 py-2 rounded-md text-base font-semibold"
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
