import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CustomerVoices = () => {
  return (
    <>
      <Navbar></Navbar>
      {/* old style contact page, not removed due to a testing */}
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
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* new styled with google api integration */}
      {/* <section class="text-gray-600 body-font relative">
  <div class="absolute inset-0 bg-gray-300">
    <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14238.484340255187!2d80.94794955!3d26.852001650000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd09c18f1e13%3A0xbf01e68d3158fb37!2sHazratganj%2C%20Lucknow%2C%20Uttar%20Pradesh%20226001!5e0!3m2!1sen!2sin!4v1716560587108!5m2!1sen!2sin"></iframe>
  </div>
  <div class="container px-5 py-24 mx-auto flex">
    <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
      <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Contact Us</h2>
      <p class="leading-relaxed mb-5 text-gray-600">
              Contact us and feel free to share your queries here.
           </p>
      <div class="relative mb-4">
        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-300 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      <div class="relative mb-4">
        <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
        <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
      </div>
      <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send</button>
      <p class="text-xs text-gray-500 mt-3">Our team will be in contact with you as soon as possibles.</p>
    </div>
  </div>
</section> */}
    </>
  );
};

export default CustomerVoices;
