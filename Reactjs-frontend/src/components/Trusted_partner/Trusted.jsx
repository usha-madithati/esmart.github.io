import React from "react";
import "./Trusted.css";
import image1 from "../../assets/trusted.png";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

function Trusted() {
  const swiper_data = [
    {
      heading: "personalized support",
      description: "Our team is here to assist you every step of the way.",
    },
    {
      heading: "innovative solutions",
      description:
        "Stay ahead of the curve with our cutting-edge product management tools.",
    },
    {
      heading: "streamlined workflows",
      description: "Optimize your business operations and boost productivity.",
    },
    {
      heading: "scalable growth",
      description:
        "Unlock the full potential of your product management strategies.",
    },
  ];
  return (
    <div className="trusted_main">
      <div className="container_trusted">
        <div className="trusted_left">
          <div className="trusted_left_heading">
            <h1 className="font">Your Trusted Partner in Product Management</h1>
          </div>
          <div className="trusted_content">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              className="swiper"
            >
              {swiper_data.map((items, index) => (
                <SwiperSlide key={index} className="swiper_slide">
                  <h1 className="font">{items.heading}</h1>
                  <p className="font">{items.description}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="trusted_right">
          <img src={image1} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Trusted;
