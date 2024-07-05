import React, { useState } from "react";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import axios from "axios";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState({
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement({
      ...announcement,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:6352/announcements",
        announcement
      );

      if (response.status === 200) {
        toast.success("Alert Raised successfully.");
        setAnnouncement({ title: "", message: "" });
      } else {
        toast.error("Error posting announcement");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error posting announcement");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      
      <div className="max-w-md mx-auto mt-10">
      
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
        <h2>Create Announcements</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              value={announcement.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              value={announcement.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Post Announcement
            </button>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Announcement;
