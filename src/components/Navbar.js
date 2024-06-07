import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'boxicons';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="fixed md:relative w-full top-0 left-0 bg-white flex items-center justify-between px-4 py-4  z-50">
      <div className="md:flex md:items-center">
        <Link to="/">
          <img
            src="https://i.postimg.cc/jSY8z9x8/S-3-2.png"
            alt="Logo"
            className="h-10 px-3 md:h-20"
          />
        </Link>
      </div>
      <div className="hidden md:flex flex-1 justify-center space-x-6">
        <Link className="text-lg font-semibold hover:text-green-600" to="/">
          HOME
        </Link>
        <Link
          className="text-lg font-semibold hover:text-green-600"
          to="/#about-us"
        >
          ABOUT
        </Link>
        {isLoggedIn ? (
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
        ) : (
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

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <box-icon
          name={menuOpen ? 'x' : 'menu-alt-right'}
          size="md"
          onClick={toggleMenu}
          className="cursor-pointer"
          color = "green"
        ></box-icon>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-white bg-opacity-70 p-4 shadow-lg z-40">
          <div className="flex flex-col items-center space-y-12">
            <Link className="text-lg font-semibold hover:text-green-600" to="/" onClick={toggleMenu}>
              HOME
            </Link>
            <Link className="text-lg font-semibold hover:text-green-600" to="/#about-us" onClick={toggleMenu}>
              ABOUT
            </Link>
            {isLoggedIn ? (
              <>
                <Link className="text-lg font-semibold hover:text-green-600" to="/user/dashboard" onClick={toggleMenu}>
                  USER
                </Link>
                <Link className="text-lg font-semibold hover:text-green-600" to="/user/notifications" onClick={toggleMenu}>
                  GET NOTIFIED
                </Link>
              </>
            ) : (
              <Link className="text-lg font-semibold hover:text-green-600" to="/user/login" onClick={toggleMenu}>
                LOGIN
              </Link>
            )}
            <Link className="text-lg font-semibold hover:text-green-600" to="/scanqr" onClick={toggleMenu}>
              SCAN QR
            </Link>
            <Link className="text-lg font-semibold hover:text-green-600" to="/contact" onClick={toggleMenu}>
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
