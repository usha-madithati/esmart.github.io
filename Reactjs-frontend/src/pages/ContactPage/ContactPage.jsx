import React, { useState } from "react";
import "../ContactPage/ContactPage.css";
import { FaUser } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import axios from "axios";
import toast from 'react-hot-toast';
function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/contact", {
      name,
      email,
      message,
    });
    toast.success("Message Sent")
    setName("");
    setEmail("");
    setmessage("");
  };
  return (
    <section className="contact-section" id="contactus">
      <div className="container">
        <h1 className="title font">Your Reviews Matters</h1>
        <p id="paragraph" className="font">
          Share your thoughts! Help us improve and guide others. Join our
          eco-conscious community, share your feedback now!
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="contact">Customer Voices</h1>
          <p className="contact-para">Hear what our community says</p>
          <div className="input-div">
            <FaUser className="icon" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="form-input"
            />
          </div>
          <div className="input-div">
            <IoMdMail className="icon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="form-input"
            />
          </div>
          <div className="input-div">
            <MdOutlineMessage className="icon" id="message-icon" />
            <textarea
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              placeholder="Message"
              className="form-input"
              rows="5"
              cols="5"
            ></textarea>
          </div>
          <input type="submit" className="submit-button" value="Submit" />
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
