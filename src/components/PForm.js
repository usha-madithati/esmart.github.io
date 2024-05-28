import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const PForm = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    barcode: "",
    mfd: "",
    expiry_date: "",
    product_info: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    toast.info("Add your product here.");
  }, []);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleStore = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure date fields are in yyyy-mm-dd format
    const formattedProductData = {
      ...productData,
      mfd: productData.mfd
        ? new Date(productData.mfd).toISOString().split("T")[0]
        : "",
      expiry_date: productData.expiry_date
        ? new Date(productData.expiry_date).toISOString().split("T")[0]
        : "",
    };

    if (formattedProductData.expiry_date <= formattedProductData.mfd) {
      setLoading(false);
      return toast.error(
        "Manufacturing date cannot be greater than or equal to expiry date."
      );
    }

    try {
      const response = await axios.post(
        "http://localhost:6352/add-product",
        formattedProductData
      );
      toast.success("Product added successfully!");
      setProductData({
        product_name: "",
        barcode: "",
        mfd: "",
        expiry_date: "",
        product_info: "",
      });
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(
          `Error occurred: ${
            error.response.data.message || error.response.data
          }`
        );

        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("No response from server.");
      } else {
        // Something else caused the error
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="flex h-screen bg-gray-100">
        <div className="m-auto">
          <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Add Product
                </h1>
                <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                  Provide all required fields to save the product data.
                </p>
              </div>
              <div className="lg:w-1/2 md:w-2/3 mx-auto">
                <form onSubmit={handleStore}>
                  <div className="flex flex-wrap -m-2">
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label
                          htmlFor="product_name"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          id="product_name"
                          name="product_name"
                          required
                          value={productData.product_name}
                          onChange={handleChange}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label
                          htmlFor="barcode"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Barcode Details
                        </label>
                        <input
                          type="text"
                          id="barcode"
                          name="barcode"
                          value={productData.barcode}
                          onChange={handleChange}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label
                          htmlFor="mfd"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Manufacturing Date
                        </label>
                        <input
                          type="date"
                          id="mfd"
                          name="mfd"
                          value={productData.mfd}
                          onChange={handleChange}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-1/2">
                      <div className="relative">
                        <label
                          htmlFor="expiry_date"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Expiry Date
                        </label>
                        <input
                          type="date"
                          id="expiry_date"
                          name="expiry_date"
                          value={productData.expiry_date}
                          onChange={handleChange}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <div className="relative">
                        <label
                          htmlFor="product_info"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Any other details
                        </label>
                        <textarea
                          id="product_info"
                          name="product_info"
                          value={productData.product_info}
                          onChange={handleChange}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        ></textarea>
                      </div>
                    </div>
                    <div className="p-2 w-full">
                      <button
                        type="submit"
                        className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <Oval
                            height={20}
                            width={20}
                            color="white"
                            visible={true}
                            ariaLabel="loading"
                          />
                        ) : (
                          "Store Product"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PForm;
