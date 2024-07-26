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
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="https://i.postimg.cc/jSY8z9x8/S-3-2.png"
                alt="Logo"
                className="h-12"
              />
            </Link>
          </div>
          <div className="hidden md:flex flex-1 justify-center space-x-6">
            <NavLink to="/" text="HOME" />
            <NavLink to="/#about-us" text="ABOUT" />
            {isLoggedIn && userRole === 1 && (
              <NavLink to="/admin/dashboard" text="ADMIN" />
            )}
            {isLoggedIn && (
              <>
                <NavLink to="/user/dashboard" text="USER" />
                <NavLink to="/user/notifications" text="GET NOTIFIED" />
              </>
            )}
            {!isLoggedIn && <NavLink to="/user/login" text="LOGIN" />}
            <NavLink to="/scanqr" text="SCAN QR" />
            <NavLink to="/contact" text="CONTACT" />
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    aria-hidden="true"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                    aria-hidden="true"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" text="HOME" />
            <MobileNavLink to="/#about-us" text="ABOUT" />
            {isLoggedIn && userRole === 1 && (
              <MobileNavLink to="/admin/dashboard" text="ADMIN" />
            )}
            {isLoggedIn && (
              <>
                <MobileNavLink to="/user/dashboard" text="USER" />
                <MobileNavLink to="/user/notifications" text="GET NOTIFIED" />
              </>
            )}
            {!isLoggedIn && <MobileNavLink to="/user/login" text="LOGIN" />}
            <MobileNavLink to="/scanqr" text="SCAN QR" />
            <MobileNavLink to="/contact" text="CONTACT" />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, text }) => (
  <Link
    to={to}
    className="text-lg font-semibold text-gray-700 hover:text-green-600"
  >
    {text}
  </Link>
);

const MobileNavLink = ({ to, text }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-center font-medium text-gray-700 hover:text-green-600 hover:bg-gray-100"
  >
    {text}
  </Link>
);

export default Navbar;
