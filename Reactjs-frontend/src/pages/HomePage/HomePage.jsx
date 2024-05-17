import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import About from '../AboutPage'
// import LocomotiveScroll from 'locomotive-scroll';

function HomePage() {
  // const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="home_main">
      <Navbar />
      <Hero />
<About  />
    </div>
  );
}

export default HomePage;
