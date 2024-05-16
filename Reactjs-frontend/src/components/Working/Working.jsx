import React from "react";
import "./Working.css";
import image1 from "../../assets/login.png";
import image2 from "../../assets/export.png";
import image3 from "../../assets/device.png";

function Working() {
  const working_data = [
    {
      image: image1,
      heading: "Login to you account",
      description:
        "  Log in to your SmartSaver account and unlock eco-friendly savings today",
    },
    {
      image: image2,
      heading: "Scan QR code of product",
      description:
        "  Scan the QR code of the product to get started instantly.",
    },
    {
      image: image3,
      heading: "Grant Device Access",
      description:
        "  Real-time product tracking and updates. Stay connected to your purchases effortlessly.",
    },
  ];
  return (
    <div className="working_main">
      <div className="working_heading">
        <h1 className="font">how smart saver works</h1>
        <h3 className="font">follow the instructions for more</h3>
      </div>
      <div className="working_instructions">
        {working_data.map((items, index) => (
          <div className="elem">
            <div className="elem_top">
              <img src={items.image} alt="" />
            </div>
            <div className="elem_heading">
              <h1 className="font">{items.heading}</h1>
            </div>
            <div className="elem_desc">
              <p className="font">{items.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Working;
