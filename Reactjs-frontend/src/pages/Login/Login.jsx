import React, { useState } from "react";
import "../Login/Login.css";
import { FaPhoneAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import logo from "../../assets/logo1.png";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
  const [userData, setUserData] = useState({
    phone: '',
    password: '',
  })
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.success("Submiting...", {
      duration: 500,
      position: 'top-center',
    })
    console.log(userData)
    try {
      const res = await axios.post('http://localhost:5000/users/login', userData)
      console.log(res)
      localStorage.setItem('authToken', res.data.token)
      toast.success("Login Successful")
      navigate('/scan')
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg)
      console.log(err)
    }
  }
  return (
    <section className="login-section">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="signin">Login</h1>
          <p className="signin-para">Sign in to your account</p>
          <div className="input-div">
            <FaPhoneAlt className="icon" />
            <input
              type="text"
              placeholder="Phone Number"
              className="form-input"
              onChange={e => setUserData({ ...userData, phone: e.target.value })}
            />
          </div>
          <div className="input-div">
            <FaKey className="icon" />
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              onChange={e => setUserData({ ...userData, password: e.target.value })}
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
