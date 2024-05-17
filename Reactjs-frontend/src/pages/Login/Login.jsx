import React from "react";
import "../Login/Login.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="login-section">
      <div className="container">
        <form className="form">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="signin">Login</h1>
          <p className="signin-para">Sign in to your account</p>
          <div className="input-div">
            <FaPhoneAlt className="icon" />
            <input
              type="number"
              placeholder="Phone Number"
              className="form-input"
              max="10"
            />
          </div>
          <div className="input-div">
            <FaKey className="icon" />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
            />
          </div>
          <input type="submit" className="login-button" value="Login" />
          <Link to={"/signup"} className="link_signup">
            <button className="signup-button">Sign up</button>
          </Link>
        </form>
      </div>
    </section>
  );
}
