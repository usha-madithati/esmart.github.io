import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LiveChat = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chatMessage = { name, message, timestamp: new Date().toISOString() };

    try {
      const response = await fetch("https://smartserver-scbe.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatMessage),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent!");
        setMessages([...messages, chatMessage]);
        setMessage("");
      } else {
        toast.error(data.message || "Error sending message");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("https://smartserver-scbe.onrender.com/chat");
        const data = await response.json();

        if (response.ok) {
          setMessages(data);
        } else {
          toast.error("Error fetching messages");
        }
      } catch (error) {
        toast.error("Server error. Please try again later.");
      }
    };

    fetchMessages();
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <div className="container mx-auto">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold">Live Chat</h1>
            <p className="text-gray-600 mt-2">
              Chat with our team and get instant support.
            </p>
          </header>

          <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
              Start a Chat
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Connect with us live and get your questions answered.
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

          <div className="mt-6 max-w-2xl mx-auto bg-white shadow-2xl rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
              Chat Messages
            </h2>
            <div className="h-64 overflow-y-scroll">
              {messages.map((msg, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-800 font-bold">{msg.name}</p>
                  <p className="text-gray-600">{msg.message}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LiveChat;
