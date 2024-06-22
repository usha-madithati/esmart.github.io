import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      let confirmation = window.confirm("Are you sure you want to logout?");
      if (confirmation) {
        setTimeout(() => {
          localStorage.setItem("isLoggedIn", false);
          navigate("/");
          toast.success("Logout Successfully.");
        }, 1000);
        toast.success("Logout Successfully.");
      }
    } catch (error) {
      toast.error("Error logging out. Try again.");
    }
  };

  const deleteUser = async () => {
    try {
      let confirmation = window.confirm(
        "Are you sure you want to delete your account permanently?"
      );
      if (confirmation) {
        const response = await axios.delete(
          "https://smartserver-scbe.onrender.com/delete",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          setTimeout(() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("token");
            navigate("/");
            toast.success("Account deleted successfully.");
          }, 1000);
        } else {
          toast.error("Failed to delete account. Try again.");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting account. Try again.");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer></ToastContainer>
      <div className="flex flex-col w-full min-h-screen">
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 ">
          <div className="max-w-6xl w-full mx-auto grid gap-2">
            <h1 className="font-semibold text-3xl">Settings</h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mx-auto">
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Account
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account settings, including your profile, email,
                  and password.
                </p>
              </div>
              <div className="flex items-center border-t p-6">
                <Link
                  className="font-medium text-gray-900 hover:underline"
                  to="/settings/account"
                >
                  Manage Account
                </Link>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Notifications
                </h3>
                <p className="text-sm text-muted-foreground">
                  Configure your notification preferences for emails, alerts,
                  and more.
                </p>
              </div>
              <div className="flex items-center border-t p-6">
                <Link
                  className="font-medium text-gray-900 hover:underline "
                  to="/user/notifications"
                >
                  Manage Notifications
                </Link>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Privacy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Adjust your privacy settings and control how your data is
                  used.
                </p>
              </div>
              <div className="flex items-center border-t p-6">
                <Link
                  className="font-medium text-gray-900 hover:underline "
                  to="/settings/privacy"
                >
                  Manage Privacy
                </Link>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Add new account
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add new account to the software and your products too.
                </p>
              </div>
              <div className="flex items-center border-t p-6">
                <Link
                  className="font-medium text-gray-900 hover:underline "
                  to="/user/signup"
                >
                  Add account
                </Link>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  Log Out Now
                </h3>
                <p className="text-sm text-muted-foreground">
                  Get loggedout now here.
                </p>
              </div>
              <div className="flex items-center border-t p-6">
                <Link
                  className="font-medium text-gray-900 hover:underline "
                  to="/"
                >
                  <button onClick={handleLogout}>LogOut</button>
                </Link>
              </div>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">
                  DELETE ACCOUNT
                </h3>
                <p className="text-sm text-muted-foreground">
                  Delete your account PERMANENTLY
                </p>
              </div>
              <div className="flex items-center border-t p-6">
                <Link
                  className="font-medium text-gray-900 hover:underline "
                  to="/"
                >
                  <button onClick={deleteUser}>Delete Your Account</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="max-w-6xl w-full mx-auto">
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              data-v0-t="card"
            >
              <div className="p-6 flex justify-end">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
