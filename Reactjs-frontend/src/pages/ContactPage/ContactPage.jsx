import React from 'react'
import "../ContactPage/ContactPage.css"
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";

function ContactPage() {
  return (
    <section className='contact-section'>
      <div className="container">
        <h1 className='title font'>Your Reviews Matters</h1>
        <p id='paragraph' className='font'>Share your thoughts! Help us improve and guide others. Join our eco-conscious community, share your feedback now!</p>
        <form className="form">
          <h1 className="contact">Customer Voices</h1>
          <p className='contact-para'>Hear what our community says</p>
          <div className='input-div'>
            <FaUser className='icon' />
            <input type="text" placeholder='Name' className='form-input' />
          </div>
          <div className='input-div'>
            <IoMdMail className='icon' />
            <input type="email" placeholder='Email' className='form-input' />
          </div>
          <div className='input-div'>
            <MdOutlineMessage className='icon' id='message-icon'/>
            <textarea placeholder="Message" className="form-input" rows="5" cols="5"></textarea>
          </div>
          <input type="submit" className='submit-button' value="Submit" />
        </form>
      </div>
    </section>
  )
}

export default ContactPage
