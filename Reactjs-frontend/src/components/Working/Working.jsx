import React from "react";
import "./Working.css";
import image1 from "../../assets/login.png";
import image2 from "../../assets/export.png";
import image3 from "../../assets/device.png";
function Working() {
  return (
    <div className="working_main">
      <div className="working_heading">
        <h1 className="font">how smart saver works</h1>
        <h3 className="font">follow the instructions for more</h3>
      </div>
      <div className="working_instructions">
        <div className="elem">
          <div className="elem_top">
            <img src={image1} alt="" />
          </div>
          <div className="elem_heading">
            <h1 className="font">Login to you account</h1>
          </div>
          <div className="elem_desc">
            <p className="font">
              Log in to your SmartSaver account and unlock eco-friendly savings
              today.
            </p>
          </div>
        </div>
        <div className="elem">
          <div className="elem_top">
            <img src={image2} alt="" />
          </div>
          <div className="elem_heading">
            <h1 className="font">Scan QR code of product</h1>
          </div>
          <div className="elem_desc">
            <p className="font">
              Scan the QR code of the product to get started instantly.
            </p>
          </div>
        </div>
        <div className="elem">
          <div className="elem_top">
            <img src={image3} alt="" />
          </div>
          <div className="elem_heading">
            <h1 className="font">Grant Device Access</h1>
          </div>
          <div className="elem_desc">
            <p className="font">
              Real-time product tracking and updates. Stay connected to your
              purchases effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Working;
