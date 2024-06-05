import React from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";

const UserD = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const handleLogout = () => {
    try {
      localStorage.setItem("isLoggedIn", false);
    } catch (error) {
      toast.error("Error doing logout. Try again.");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <ToastContainer></ToastContainer>
      <h1 className="flex justify-center font-semibold">
        Dashboard is in developement currently. Come back later...
      </h1>
      <h3 className="flex justify-center font-semibold">Happy Saving</h3>
      <button onClick={handleLogout} className="border-3 m-3 border-blue-400">
        Logout
      </button>
    </>
  );
};

export default UserD;
