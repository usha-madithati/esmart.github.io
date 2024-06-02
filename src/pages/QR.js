// src/pages/QRCodeVerification.jsx
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddProductForm from "./AddProductForm";
import { Oval } from "react-loader-spinner";
<<<<<<< HEAD
import QrReader from "react-qr-reader";
import axios from "axios";

const QRCodeVerification = () => {
=======
import QrScanner from "@react-qr-scanner";
import axios from "axios";

function QRCodeVerification() {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [scannedData, setScannedData] = useState(null);
>>>>>>> 6e8acce5577cfcbfb71916d312f1af43f208c948
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async (data) => {
    if (data) {
<<<<<<< HEAD
      try {
        const response = await axios.post(
          `http://localhost:6352/scan-product`,
          { barcode: data }
        );
        setProductInfo(response.data.product);
        // Save the product information to the database if not already present
        await axios.post(
          `http://localhost:6352/add-product`,
          response.data.product
        );
=======
      setScannedData(data);
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${data}`
        );
        setProductInfo(response.data);
>>>>>>> 6e8acce5577cfcbfb71916d312f1af43f208c948
      } catch (err) {
        setError("Product not found");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError("Error scanning QR code");
  };

  return (
    <>
      <div className="bg-white">
        <Navbar />
        <section className="text-center py-12 flex flex-col items-center">
          <div className="text-center justify-center mx-auto">
            <h1 className="text-5xl font-bold text-center">
              QR Code Verification
            </h1>
          </div>
          <div className="md:w-1/2">
            <p className="text-xl mb-6">
              <b className="font-semibold">
                Scan products easily for instant access to all the info you
                need. From ingredients to eco impact, make informed choices in
                seconds.
              </b>
            </p>
<<<<<<< HEAD
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
=======
            <QrScanner
              onScan={handleScan}
              onError={handleError}
>>>>>>> 6e8acce5577cfcbfb71916d312f1af43f208c948
              style={{ width: "100%" }}
            />
            {productInfo && (
              <div className="mt-4 p-4 border rounded-md shadow-md">
                <h2 className="text-2xl font-bold">
                  {productInfo.product_name}
                </h2>
                <p>
                  Manufacturing Date:{" "}
                  {new Date(productInfo.mfd).toLocaleDateString()}
                </p>
                <p>
                  Expiry Date:{" "}
                  {new Date(productInfo.expiry_date).toLocaleDateString()}
                </p>
                <p>Product Info: {productInfo.product_info}</p>
              </div>
            )}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 md:w-auto">
                Scan Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default QRCodeVerification;
