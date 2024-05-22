import React, { useEffect, useRef } from 'react';
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useLocation } from 'react-router-dom';

const Home = () => {
  const aboutUsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#about-us') {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section className="flex flex-col md:flex-row items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-8">
            <img
              src="https://i.postimg.cc/43qNYjMm/Ellipse-1.png"
              className="h-140 md:h-140 w-auto mb-1 md:mb-0 overflow-hidden"
              alt="Illustration"
            />
            <div>
              <h1 className="text-5xl font-bold text-gray-800">SMART SAVER</h1>
              <p className="text-xl text-gray-600 mt-4">STAY FRESH</p>
              <Link to="/scanqr">
                <button className="mt-8 px-8 py-3 bg-green-500 text-white rounded-full text-lg font-semibold hover:bg-green-600">
                  SCAN NOW
                </button>
              </Link>
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Our Motive
            </h2>
            <p className="text-gray-600 mt-4 text-center max-w-2xl mx-auto">
              Our Motive is to empower users with timely awareness of household product expiration. Through platform users effortlessly scan product QR code's upon login instantly accessing expiration dates.With customizable notification preferneces they can recieve timely alerts via SMS, ensuring products are used before expiry. We priortize user connvenience, enhancing safety and efficiency imanaging household items.
            </p>
          </section>

          <section className="mt-16" id="about-us" ref={aboutUsRef}>
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              How Smart Saver Works
            </h2>
            <div className="flex flex-col md:flex-row justify-around items-center mt-8 space-y-8 md:space-y-0">
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://i.postimg.cc/NFb3HHMp/login.png"
                  alt="Login"
                  className="h-16 mb-4"
                />
                <h3 className="text-xl font-medium text-gray-800">
                  Login to your account
                </h3>
                <p className="text-gray-600">
                  Log in to your SmartSaver account and unlock eco-friendly
                  savings today.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://i.postimg.cc/Qt8SWnTZ/Group.png"
                  alt="Scan QR"
                  className="h-16 mb-4"
                />
                <h3 className="text-xl font-medium text-gray-800">
                  Scan QR code of product
                </h3>
                <p className="text-gray-600">
                  Scan the QR code of the product to get started instantly.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://i.postimg.cc/HWP3VzWF/octicondevicemobile24.png"
                  alt="Grant Access"
                  className="h-16 mb-4"
                />
                <h3 className="text-xl font-medium text-gray-800">
                  Grant Device Access
                </h3>
                <p className="text-gray-600">
                  Real-time product tracking and updates. Stay connected to your
                  purchases effortlessly.
                </p>
              </div>
            </div>
          </section>

          <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black py-4 text-center mt-10 md:text-5xl lg:text-6xl">
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Manage your
            </span>{" "}
            Product Inventory.
          </h1>

          <section class="text-gray-600 body-font">
            <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 class="title-font sm:text-4xl text-3xl font-semibold mb-4 text-gray-900">
                  Real-Time Updates
                </h1>
                <p class="mb-8 text-lg text-gray-500">
                  Stay on top of your product inventory with real-time data and
                  insights.
                </p>
              </div>
              <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img
                  class="object-cover object-center rounded"
                  alt="hero"
                  src="https://i.postimg.cc/mgcrTbX0/real-time.png"
                ></img>
              </div>
            </div>
          </section>

          <section class="text-gray-600 body-font">
            <div class="container mx-auto flex px-5 md:flex-row flex-col items-center">
              <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                <img
                  class="object-cover object-center rounded"
                  alt="hero"
                  src="https://i.postimg.cc/59Qd9n8k/image-17.png"
                />
              </div>
              <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                  Automated Tracking
                </h1>
                <p class="mb-8 leading-relaxed">
                  Utilize our advanced tracking system to monitor your products
                  and sales effortlessly.
                </p>
              </div>
            </div>
          </section>

          <section class="text-gray-600 body-font">
            <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
              <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 class="title-font sm:text-4xl text-3xl font-semibold mb-4 text-gray-900">
                  Customizable Reports
                </h1>
                <p class="mb-8 text-lg text-gray-500">
                  Generate detailed reports to analyze your product performance
                  and make informed decisions.
                </p>
              </div>
              <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <img
                  class="object-cover object-center rounded"
                  alt="hero"
                  src="https://i.postimg.cc/ncdvdYPp/image-18.png"
                ></img>
              </div>
            </div>
          </section>

          <section className="mt-16 bg-green-500 text-white py-12 px-4 rounded-lg">
            <h2 className="text-3xl font-semibold text-center">
              Your Trusted Partner in Product Management
            </h2>
            <div className="flex flex-col md:flex-row justify-around items-center mt-8 space-y-8 md:space-y-0">
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://i.postimg.cc/CLBBJHCy/15-removebg-preview-1.png"
                  alt="Personalized Support"
                  className="h-56 mb-4"
                />
                <h3 className="text-xl font-medium">Personalized support</h3>
                <p className="max-w-xs">
                  Our team is here to assist you every step of the way.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
