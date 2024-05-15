import React, { useState } from 'react'
import './Navbar.css'
import image1 from '../../assets/logo.png'
import { Link } from 'react-router-dom';
function Navbar() {
    
    const [active, setactive] = useState(false);
    const pages = [
        {name:'home', path:'/'},
        {name:'about', path:'/about'},
        {name:'login', path:'/login'},
        {name:'scan qr', path:'/scan'},
        {name:'get notified', path:'/notified'},
        {name:'contact us', path:'/contact'},
    ]
    const currentPage = window.location.pathname;
  return (
      <div className='navbar_main general_padding_horizontal_navbar'>
          <div className="navbar-left">
              <img src={image1} alt="" />
              <h1 className='font heading_logo'>Smart Saver</h1>
          </div>
          <div className="navbar-right font">
              {pages.map((items, index) => {
                  return (
                      <div className='links'>
                <Link
                key={index}
                to={items.path}
                className={`currentPage === items.path ? "active" : "" colour`}
              >
                {items.name}
              </Link>
                   </div>
               )   
              })}
          </div>
    </div>
  )
}

export default Navbar