import React from "react";
import "./Hero.css";
import image1 from "../../assets/image2.jpg";
import { FaSnapchatGhost } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <div className="general_padding_horizontal_hero hero_main" id="home">
      <div className="hero-left">
        <div className="left-top">
          <h1 className="heading font_heading">smart saver</h1>
          <h4 className="subheading font ">stay fresh</h4>
          <button className="btn">
            <Link to="/scan">
              <h2 className="font">scan now</h2>
            </Link>
          </button>
        </div>

        <div className="left-bottom">
          <div className="left">
            <FaSnapchatGhost className="icon-1" />
            <RiInstagramFill className="icon-1" />
            <BsTwitterX className="icon-1" />
          </div>
          <div className="right">
            <h1 className="font motive">our motive</h1>
            <p className="font para">
              Our motive is to empower users with timely awareness of household
              product expiration. Through our platform, users effortlessly scan
              product QR codes upon login, instantly accessing expiration dates.
              With customizable notification preferences, they receive timely
              alerts via SMS, ensuring products are used before expiry. We
              prioritize user convenience, enhancing safety and efficiency in
              managing household items.
            </p>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <div className="img-div">
          <img src={image1} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
