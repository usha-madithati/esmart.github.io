import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa';
import { FaKey } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import logo from "../../assets/logo1.png"
import "../SignUp/SignUp.css"

export default function SignUp() {
  return (
    <section className='signup-section'>
      <div className="container">
        <form className="form">
          <img src={logo} alt="Logo" className='logo' />
          <h1 className="signup">Signup</h1>
          <p className='signup-para'>Create a new account</p>
          <div className='input-div'>
            <FaUser className='icon' />
            <input type="text" placeholder='Username' className='form-input' />
          </div>
          <div className='input-div'>
            <IoMdMail className='icon' />
            <input type="email" placeholder='Email' className='form-input' />
          </div>
          <div className='input-div'>
            <FaPhoneAlt className='icon' />
            <input type="number" placeholder='Phone Number' className='form-input' max="10" />
          </div>
          <div className='input-div'>
            <FaKey className='icon' />
            <input type="password" placeholder="Password" className="form-input" />
          </div>
          <input type="submit" className='login-button' value="SignUp" />
          <button className='signup-button'>Login</button>
        </form>
      </div>
    </section>
  )
}
