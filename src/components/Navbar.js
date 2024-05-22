import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center">
        <Link to="/">
          <img
            src="https://i.postimg.cc/jSY8z9x8/S-3-2.png"
            alt="Logo"
            className="h-20 px-3"
          />
        </Link>
      </div>
      <div className="flex-1 flex justify-center space-x-6">
        <Link className="text-lg font-semibold hover:text-green-600" to="/">
          HOME
        </Link>
        <Link
          className="text-lg font-semibold hover:text-green-600"
          to="/#about-us"
        >
          ABOUT
        </Link>
        <Link
          className="text-lg font-semibold hover:text-green-600"
          to="/user/login"
        >
          LOGIN
        </Link>
        <Link
          className="text-lg font-semibold hover:text-green-600"
          to="/scanqr"
        >
          SCAN QR
        </Link>
        <Link
          className="text-lg font-semibold hover:text-green-600"
          to="/user/notifications"
        >
          GET NOTIFIED
        </Link>
        <Link
          className="text-lg font-semibold hover:text-green-600"
          to="/contact"
        >
          CONTACT
        </Link>
      </div>
      <div className="w-10"></div> {/* Spacer to keep the alignment */}
    </nav>
  );
};

export default Navbar;
