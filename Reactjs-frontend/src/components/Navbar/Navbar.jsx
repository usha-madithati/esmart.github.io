import React, { useState } from "react";
import "./Navbar.css";
import image1 from "../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [active, setactive] = useState(false);
  
  const currentPage = window.location.pathname;
  return (
    <div className="navbar_main general_padding_horizontal_navbar">
      <div className="navbar-left">
        <img src={image1} alt="" />
        <h1 className="font heading_logo">Smart Saver</h1>
      </div>
      <div className="navbar-right font">
        <div className="links">
          <a href="#home" className={`currentPage === items.path ? "active" : "" colour`} onClick={e => { navigate('/') }}>Home</a>
          <a href="#about" className={`currentPage === items.path ? "active" : "" colour`} onClick={e => { navigate('/') }}>About</a>
          <Link to="/login" className={`currentPage === items.path ? "active" : "" colour`}>Login</Link>
          <Link to="/scan" className={`currentPage === items.path ? "active" : "" colour`}>Scan QR</Link>
          <Link to="/notified" className={`currentPage === items.path ? "active" : "" colour`}>Get Notified</Link>
          <Link to="/contact" className={`currentPage === items.path ? "active" : "" colour`}>Contact Us</Link>
        </div>
        
      </div>
    </div>
  );
}

export default Navbar;
