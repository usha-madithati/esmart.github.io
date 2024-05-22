import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import logo from "../../assets/logo1.png";
import "../SignUp/SignUp.css";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';

export default function SignUp() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
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
      const res = await axios.post('http://localhost:5000/users/register', userData)
      console.log(res)
      toast.success("Register Successful")
      navigate('/login')
    } catch (err) {
      err.response.data.msg && toast.error(err.response.data.msg)
    }
  }
  return (
    <section className="signup-section">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="signup">Signup</h1>
          <p className="signup-para">Create a new account</p>
          <div className="input-div">
            <FaUser className="icon" />
            <input type="text" placeholder="Username" className="form-input" onChange={e => setUserData({ ...userData, username: e.target.value })} />
          </div>
          <div className="input-div">
            <IoMdMail className="icon" />
            <input type="email" placeholder="Email" className="form-input" onChange={e => setUserData({ ...userData, email: e.target.value })} />
          </div>
          <div className="input-div">
            <FaPhoneAlt className="icon" />
            <input
              type="number"
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
          <input type="submit" className="login-button" value="SignUp" />
          <Link to={"/login"} className="link_login">
            <button className="signup-button">Login</button>
          </Link>
        </form>
      </div>
    </section>
  );
}
