import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userRole = currentUser?.role;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="https://i.postimg.cc/jSY8z9x8/S-3-2.png"
            alt="Logo"
            className="h-20 px-3"
          />
        </Link>
      </div>
      <div className="flex items-center md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-800 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            ></path>
          </svg>
        </button>
      </div>
      <div className="hidden md:flex md:flex-1 md:justify-center md:space-x-6">
        <Link className="text-lg font-semibold hover:text-green-600" to="/">
          HOME
        </Link>
        <Link
          className="text-lg font-semibold hover:text-green-600"
          to="/#about-us"
        >
          ABOUT
        </Link>
        {isLoggedIn && userRole === 1 && (
          <Link
            className="text-lg font-semibold hover:text-green-600"
            to="/admin/dashboard"
          >
            ADMIN
          </Link>
        )}
        {isLoggedIn && (
          <>
            <Link
              className="text-lg font-semibold hover:text-green-600"
              to="/user/dashboard"
            >
              USER
            </Link>
            <Link
              className="text-lg font-semibold hover:text-green-600"
              to="/user/notifications"
            >
              GET NOTIFIED
            </Link>
          </>
        )}
        {!isLoggedIn && (
          <Link
            className="text-lg font-semibold hover:text-green-600"
            to="/user/login"
          >
            LOGIN
          </Link>
        )}
        <Link
          className="text-lg font-semibold hover:text-green-600"
          to="/scanqr"
        >
          SCAN QR
        </Link>
        <Link
          className="text-lg font-semibold hover:text-green-600"
          to="/contact"
        >
          CONTACT
        </Link>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-full left-0 w-full bg-white shadow-md md:hidden`}
      >
        <div className="flex flex-col items-center space-y-4 py-4">
          <Link className="text-lg font-semibold hover:text-green-600" to="/">
            HOME
          </Link>
          <Link
            className="text-lg font-semibold hover:text-green-600"
            to="/#about-us"
          >
            ABOUT
          </Link>
          {isLoggedIn && userRole === 1 && (
            <Link
              className="text-lg font-semibold hover:text-green-600"
              to="/admin/dashboard"
            >
              ADMIN
            </Link>
          )}
          {isLoggedIn && (
            <>
              <Link
                className="text-lg font-semibold hover:text-green-600"
                to="/user/dashboard"
              >
                USER
              </Link>
              <Link
                className="text-lg font-semibold hover:text-green-600"
                to="/user/notifications"
              >
                GET NOTIFIED
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <Link
              className="text-lg font-semibold hover:text-green-600"
              to="/user/login"
            >
              LOGIN
            </Link>
          )}
          <Link
            className="text-lg font-semibold hover:text-green-600"
            to="/scanqr"
          >
            SCAN QR
          </Link>
          <Link
            className="text-lg font-semibold hover:text-green-600"
            to="/contact"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
