import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const CustomerVoices = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6352/contactus", {
        name,
        email,
        message,
      });
      if (response.status === 200) {
        toast.success("Message sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      toast.error("Error occurred. Try again after sometime.");
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <div className="container mx-auto">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="text-gray-600 mt-2">
              Contact us and feel free to share your queries here.
            </p>
          </header>

          <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
              Smart Saver
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Share your queries and message here and our team will contact you.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  <i className="fas fa-user"></i> Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
                  placeholder="Name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  <i className="fas fa-envelope"></i> Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
                  placeholder="Email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700">
                  <i className="fas fa-comment"></i> Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerVoices;
