import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotificationSettings = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const handleButtonClick = (period) => {
    setSelectedPeriod(period);
    setIsAlertVisible(true);
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
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">3 Days</h2>
                <p className="leading-relaxed text-base">Receive notifications every 3 days for updates and insights.</p>
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
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">5 Days</h2>
                <p className="leading-relaxed text-base">Receive notifications every 5 days for a more periodic update.</p>
                <DrawOutlineButton period="5 days">
                  <span className="text-black">Set for 5 days</span>
                </DrawOutlineButton>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex text-black text-2xl items-center justify-center rounded-full bg-yellow-500 text-black-500 mb-5 flex-shrink-0">
                <h1>3</h1>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">7 Days</h2>
                <p className="leading-relaxed text-base">Receive notifications every 7 days for a less frequent but more comprehensive update.</p>
                <DrawOutlineButton period="7 days">
                  <span className="text-black">Set for 7 days</span>
                </DrawOutlineButton>
              </div>
            </div>
          </div>
          {isAlertVisible && (
            <div
              id="alert-additional-content-1"
              className="p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
              role="alert"
            >
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <h3 className="text-lg font-medium">This is an info alert</h3>
              </div>
              <div className="mt-2 mb-4 text-sm">
                You have selected to receive notifications every {selectedPeriod}.
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800"
                  onClick={handleDismissAlert}
                  aria-label="Close"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex text-black text-2xl items-center justify-center rounded-full bg-yellow-100 text-black-500 mb-5 flex-shrink-0">
                <h1>4</h1>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">1 Month</h2>
                <p className="leading-relaxed text-base">Receive notifications every 1 Month for a more periodic update.</p>
                <DrawOutlineButton period="1 month">
                  <span className="text-black">Set for 1 Month</span>
                </DrawOutlineButton>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex text-black text-2xl items-center justify-center rounded-full bg-gray-400 text-black-500 mb-5 flex-shrink-0">
                <h1>5</h1>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">3 Months</h2>
                <p className="leading-relaxed text-base">Receive notifications every 3 Months for a more periodic update.</p>
                <DrawOutlineButton period="3 months">
                  <span className="text-black">Set for 3 Months</span>
                </DrawOutlineButton>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex text-black text-2xl items-center justify-center rounded-full bg-blue-900 text-black-500 mb-5 flex-shrink-0">
                <h1>6</h1>
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">5 Months</h2>
                <p className="leading-relaxed text-base">Receive notifications every 5 Months for a more periodic update.</p>
                <DrawOutlineButton period="5 months">
                  <span className="text-black">Set for 5 Months</span>
                </DrawOutlineButton>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default NotificationSettings;
