import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const AccountSettings = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          "https://smartserver-production.up.railway.app/settings/account",
          {
            email,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response && response.data.success) {
          toast.success("Account settings updated successfully!");
        }
      } catch (error) {
        if (error.response) {
          setErrors({ server: error.response.data.message });
          toast.error(error.response.data.message);
        } else if (error.request) {
          setErrors({
            server: "Server not responding. Please try again later.",
          });
          toast.error("Server not responding. Please try again later.");
        } else {
          setErrors({ server: "An error occurred. Please try again." });
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col w-full min-h-screen">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
          <ToastContainer />
          <div className="max-w-6xl w-full mx-auto grid gap-2">
            <h1 className="font-semibold text-3xl">Account Settings</h1>
          </div>
          <div className="max-w-6xl w-full mx-auto">
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <form className="space-y-4 p-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
                {errors.server && (
                  <p className="mt-1 text-sm text-red-600">{errors.server}</p>
                )}
                <button
                  className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? <span>Loading...</span> : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AccountSettings;
