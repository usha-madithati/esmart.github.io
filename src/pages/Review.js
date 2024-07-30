import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Review = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = { name, email, message };

    try {
      const response = await fetch("https://smartserver-scbe.onrender.com/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Thank you for your review!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error(data.message || "Error submitting review");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <div className="container mx-auto">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold">Your Reviews Matter</h1>
            <p className="text-gray-600 mt-2">
              Share your thoughts! Help us improve and guide others. Join our
              eco-conscious community, share your feedback now!
            </p>
          </header>

          <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
              Customer Voices
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Hear what our community says
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  <i className="fas fa-user"></i> Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  <i className="fas fa-envelope"></i> Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700">
                  <i className="fas fa-comment"></i> Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-green-300"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
