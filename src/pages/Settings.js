import React from "react";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      let confirmation = window.confirm("Are you sure want to logout?");
      if (confirmation) {
        setTimeout(() => {
          localStorage.setItem("isLoggedIn", false);
          navigate("/");
        }, 1000);
        toast.success("Logout Successfully.");
      }
    } catch (error) {
      toast.error("Error doing logout. Try again.");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <ToastContainer></ToastContainer>
      <h1 className="font-semibold m-4 flex justify-center">Settings</h1>
      <button
        onClick={handleLogout}
        className="font-bold flex justify-center m-3"
      >
        logout
      </button>
    </>
  );
};

export default Settings;
