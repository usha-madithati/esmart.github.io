import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotificationSettings = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Notification Settings</h1>
            <div className="flex items-center">
              <label htmlFor="preferences" className="mr-2 text-gray-700">
                Preferences :
              </label>
              <select
                id="preferences"
                className="border border-gray-300 rounded-md p-1"
              >
                <option value="select">select</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </header>

          <section className="mb-6">
            <h2 className="text-2xl font-semibold">Product Updates</h2>
            <div className="mt-4 space-y-4">
              {[
                {
                  title: "Product Information",
                  description:
                    "Information regarding its expiration date and usage.",
                },
                {
                  title: "Smart Saver: News and Offers",
                  description: "News, events and offers for you.",
                },
                {
                  title: "Recommended Usage",
                  description:
                    "Recommendation for the usage of products that are expiring first.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <span className="text-gray-700">E-mail</span>
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-green-600"
                      />
                    </label>
                    <label className="flex items-center space-x-2">
                      <span className="text-gray-700">Phone</span>
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-green-600"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex items-center justify-between mb-6">
            <span className="text-gray-700">Grand Access</span>
            <label className="flex items-center">
              <span className="mr-2 text-gray-700">Off</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
              <span className="ml-2 text-gray-700">On</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Cancel
            </button>
            <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
              Save
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default NotificationSettings;
