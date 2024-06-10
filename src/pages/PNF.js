import React from "react";
import Navbar from "../components/Navbar";

const NotFoundPage = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="text-center space-y-4">
          <h1 className="text-9xl font-bold neon-text animate-pulse">404</h1>
          <p className="text-2xl font-medium">Page Not Found</p>
          <div className="flex flex-col items-center space-y-2">
            <p className="text-lg">Let's save the earth and save energy!</p>
            <p className="text-lg">Enjoy the greenery while you're here.</p>
          </div>
        </div>
        <div className="mt-8 animate-bounce">
          <div className="flex space-x-4">
            <Tree />
            <Tree />
            <Tree />
          </div>
        </div>
      </div>
    </>
  );
};

const Tree = () => (
  <div className="tree">
    <div className="trunk bg-brown-600"></div>
    <div className="leaves bg-green-500"></div>
  </div>
);

export default NotFoundPage;
