import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddProductForm from "./AddProductForm";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import jsQR from "jsqr";

const QRCodeVerification = () => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [scannedData, setScannedData] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    if (isScannerOpen) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isScannerOpen]);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute("playsinline", true); // for iOS
      videoRef.current.play();
      requestRef.current = requestAnimationFrame(tick);
    } catch (err) {
      console.error("Error accessing camera: ", err);
      setError("Error accessing camera: " + err.message);
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };

  const tick = () => {
    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = videoRef.current.videoHeight;
      canvas.width = videoRef.current.videoWidth;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        handleScan(code.data);
      } else {
        requestRef.current = requestAnimationFrame(tick);
      }
    } else {
      requestRef.current = requestAnimationFrame(tick);
    }
  };

  const handleScan = async (data) => {
    if (data) {
      setScannedData(data);
      setIsScannerOpen(false);
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
      } catch (err) {
        setError("Product not found: " + err.message);
      }
    }
  };

  const handleError = (err) => {
    console.error("Error scanning code: ", err);
    setError("Error scanning code: " + err.message);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const canvas = canvasRef.current;
          if (canvas) { // Ensure canvas is not null
            const context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              handleScan(code.data);
            } else {
              setError("No QR code found in the selected image.");
            }
          } 
        };
        image.src = reader.result;
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="bg-white">
        <Navbar />
        <section className="text-center py-12 flex flex-col items-center">
          <div className="text-center justify-center mx-auto">
            <h1 className="text-5xl font-bold text-center">
              Code Verification
            </h1>
            <div
              className="h-[350px] w-[350px] md:h-auto md:w-auto flex justify-center items-center m-2"
              style={{ aspectRatio: "300 / 300" }}
            >
              {isImageLoading && (
                <Oval
                  height={80}
                  width={80}
                  color="#4fa94d"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#4fa94d"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              )}
              <img
                src="https://i.postimg.cc/PJghMmyQ/9427512-4149572-removebg-preview-1-1.jpg"
                alt="Phone with QR codes"
                className={`h-full w-full ${isImageLoading ? "hidden" : "block"}`}
                width="300"
                height="300"
                style={{ objectFit: "cover" }}
                onLoad={() => setIsImageLoading(false)}
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <p className="text-xl mb-6">
              <b className="font-semibold">
                Scan products easily for instant access to all the info you
                need. From ingredients to eco impact, make informed choices in
                seconds.
              </b>
            </p>
            {isScannerOpen && (
              <div className="relative">
                <video ref={videoRef} style={{ width: "100%" }} />
                <canvas ref={canvasRef} style={{ display: "none" }} />
              </div>
            )}
            {selectedImage && (
              <div className="mt-4">
                <img src={selectedImage} alt="Selected QR code" className="w-full h-auto mb-6" />
              </div>
            )}
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
              <button
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 md:w-auto"
                onClick={() => setIsScannerOpen(!isScannerOpen)}
              >
                {isScannerOpen ? "Close Scanner" : "Scan Now"}
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 md:w-auto cursor-pointer"
              >
                Browse QR
              </label>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default QRCodeVerification;
