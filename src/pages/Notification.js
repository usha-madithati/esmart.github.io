import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationSettings = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const handleButtonClick = async (period) => {
    setSelectedPeriod(period);
    setIsAlertVisible(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:6352/update-notification",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ notificationPeriod: period }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("Notification period updated:", data);
        toast.success("Notification period updated and SMS sent successfully!");
      } else {
        const errorData = await response.json();
        console.log("Response status:", response.status);
        console.error(
          "Failed to update notification period:",
          errorData.message
        );
        toast.error(
          `Failed to update notification period: ${errorData.message}`
        );
      }
    } catch (error) {
      console.error("Error updating notification period:", error);
      toast.error("Error updating notification period");
    }
  };

  const handleDismissAlert = () => {
    setIsAlertVisible(false);
  };

  const DrawOutlineButton = ({ children, period, ...rest }) => {
    return (
      <button
        {...rest}
        onClick={() => handleButtonClick(period)}
        className="group relative px-4 py-2 font-medium text-slate-100 transition-colors duration-[400ms] hover:text-black-300"
      >
        <span>{children}</span>
        <span className="absolute left-0 top-0 h-[2px] w-0 bg-blue-600 transition-all duration-100 group-hover:w-full" />
        <span className="absolute right-0 top-0 h-0 w-[2px] bg-yellow-300 transition-all delay-100 duration-100 group-hover:h-full" />
        <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-green-300 transition-all delay-200 duration-100 group-hover:w-full" />
        <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-yellow-600 transition-all delay-300 duration-100 group-hover:h-full" />
      </button>
    );
  };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">
          <div className="text-center mb-20">
            <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
              NOTIFICATION PREFERENCES
            </h2>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
              Select the notification timeline to send on your phone or email.
            </p>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex text-black text-2xl items-center justify-center rounded-full bg-green-600 text-black-500 mb-5 flex-shrink-0">
                <h1>1</h1>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  3 Days
                </h2>
                <p className="leading-relaxed text-base">
                  Receive notifications every 3 days for updates and insights.
                </p>
                <DrawOutlineButton period="3 days">
                  <span className="text-black">Set for 3 days</span>
                </DrawOutlineButton>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex text-black text-2xl items-center justify-center rounded-full bg-orange-500 text-black-500 mb-5 flex-shrink-0">
                <h1>2</h1>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  5 Days
                </h2>
                <p className="leading-relaxed text-base">
                  Receive notifications every 5 days for a more periodic update.
                </p>
                <DrawOutlineButton period="5 days">
                  <span className="text-black">Set for 5 days</span>
                </DrawOutlineButton>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex text-black text-2xl items-center justify-center rounded-full bg-red-500 text-black-500 mb-5 flex-shrink-0">
                <h1>3</h1>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  7 Days
                </h2>
                <p className="leading-relaxed text-base">
                  Receive notifications every week for regular updates.
                </p>
                <DrawOutlineButton period="7 days">
                  <span className="text-black">Set for 7 days</span>
                </DrawOutlineButton>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex text-black text-2xl items-center justify-center rounded-full bg-green-600 text-black-500 mb-5 flex-shrink-0">
                <h1>4</h1>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  9 Days
                </h2>
                <p className="leading-relaxed text-base">
                  Receive notifications every 9 days for updates and insights.
                </p>
                <DrawOutlineButton period="9 days">
                  <span className="text-black">Set for 9 days</span>
                </DrawOutlineButton>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex text-black text-2xl items-center justify-center rounded-full bg-orange-500 text-black-500 mb-5 flex-shrink-0">
                <h1>5</h1>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  11 Days
                </h2>
                <p className="leading-relaxed text-base">
                  Receive notifications every 11 days for a more periodic
                  update.
                </p>
                <DrawOutlineButton period="11 days">
                  <span className="text-black">Set for 11 days</span>
                </DrawOutlineButton>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex text-black text-2xl items-center justify-center rounded-full bg-red-500 text-black-500 mb-5 flex-shrink-0">
                <h1>6</h1>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  15 Days
                </h2>
                <p className="leading-relaxed text-base">
                  Receive notifications every week for regular updates.
                </p>
                <DrawOutlineButton period="15 days">
                  <span className="text-black">Set for 15 days</span>
                </DrawOutlineButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default NotificationSettings;
