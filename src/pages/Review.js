import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Review = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <div className="container mx-auto">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold">Your Reviews Matters</h1>
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

            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  <i className="fas fa-user"></i> Name
                </label>
                <input
                  type="text"
                  id="name"
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
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Review;
