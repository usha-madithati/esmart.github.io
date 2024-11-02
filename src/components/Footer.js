import React from "react";
import { Link, useNavigate } from "react-router-dom";

const emailAddress = 'SmartSaver@gmail.com';

const Footer = () => {
  const navigate = useNavigate();

  const handleLiveChatClick = (e) => {
    e.preventDefault();
    navigate('/chat'); // Update the route if needed
  };

  return (
    <>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link to="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <img
                src="https://i.postimg.cc/jSY8z9x8/S-3-2.png"
                className="h=20 w-20"
                alt="Smart Saver Logo"
              />{" "}
              <span className="ml-3 text-xl">Smart Saver</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Our team is here to assist you every step of the way.
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Navigate here
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-gray-800">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/#about-us" className="text-gray-600 hover:text-gray-800">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/scanqr" className="text-gray-600 hover:text-gray-800">
                    Scan QR
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-gray-800">
                    Contact Us
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Useful Links
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-gray-800">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-gray-800">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-gray-800">
                    Sitemap Link
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Legal Information
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <Link to='https://www.termsfeed.com/live/cad2224c-5f74-4f65-9198-466ab0043209'
                  className="text-gray-600 hover:text-gray-800">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="https://www.termsofservicegenerator.net/live.php?token=gRNfR3jCd0BEaC7zC78sXDZxplN3DIFx" className="text-gray-600 hover:text-gray-800">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="https://www.disclaimergenerator.net/live.php?token=Qqxa8AsZcxLfVy4YisUZJbStSMJeSp7r" className="text-gray-600 hover:text-gray-800">
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link to="https://www.cookiepolicygenerator.com/live.php?token=nqIuzDkf6o8briEnJexuNkC4XsCYvree" className="text-gray-600 hover:text-gray-800">
                    Cookie Policy
                  </Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                FAQ's
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a href="https://github.com/usha-madithati/esmart.github.io/#readme" className="text-gray-600 hover:text-gray-800">
                    How to use application?
                  </a>
                </li>
                <li>
                  <Link to="/" className="text-gray-600 hover:text-gray-800">
                    Help Center
                  </Link>
                </li>
                {/* <li>
                  <a href="#" onClick={handleLiveChatClick} className="text-gray-600 hover:text-gray-800">
                    Live Chat
                  </a>
                </li> */}
                <li>
                  <Link to="/user/review" className="text-gray-600 hover:text-gray-800">
                    Customer Review
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2024 SmartSaver —
              <a
                href={`mailto:${emailAddress}`} 
                rel="noopener noreferrer"
                className="text-gray-600 ml-1"
                target="_blank"
              >
                Email Address: {emailAddress}
              </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a href="https://www.facebook.com/profile.php?id=61561813920306" className="text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="https://twitter.com/smart_saver" className="ml-3 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" fill="#adb5bd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2" viewBox="0 0 512 512" id="twitter" className="w-5 h-5">
                <g clip-path="url(#clip0_84_15698)">
                  <rect width="512" height="512" fill="none" rx="60"></rect>
                  <path fill="currentColor" d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"></path>
                </g>
                <defs>
                  <clipPath id="clip0_84_15698">
                    <rect width="512" height="512" fill="none"></rect>
                  </clipPath>
                </defs>
              </svg>
              </a>
              <a href="https://www.instagram.com/smart_saver_2k24/" className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 2h-8a6 6 0 00-6 6v8a6 6 0 006 6h8a6 6 0 006-6V8a6 6 0 00-6-6zm-4 2h4a4 4 0 014 4v4h-2v-2h-4v2H8V8a4 4 0 014-4zm-4 6h2v4H8v-4zm6 0h2v4h-2v-4z"></path>
                </svg>
              </a>
              <a href="https://github.com/smart_saver" className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 00-10 10c0 4.42 2.86 8.16 6.84 9.48.5.09.68-.21.68-.48v-1.7c-2.75.6-3.33-1.32-3.33-1.32-.45-1.15-1.11-1.45-1.11-1.45-.91-.62.07-.61.07-.61 1 0 1.64 1.03 1.64 1.03.88 1.52 2.31 1.08 2.88.83.09-.64.34-1.08.62-1.33-2.12-.24-4.36-1.06-4.36-4.72 0-1.04.37-1.89.98-2.56-.1-.24-.43-1.22.09-2.55 0 0 .8-.25 2.62.96a9.07 9.07 0 014.78 0c1.82-1.21 2.62-.96 2.62-.96.52 1.33.2 2.31.1 2.55.6.67.98 1.52.98 2.56 0 3.66-2.25 4.48-4.39 4.71.35.3.67.89.67 1.8v2.68c0 .27.19.58.69.48A10 10 0 0012 2z"></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;


