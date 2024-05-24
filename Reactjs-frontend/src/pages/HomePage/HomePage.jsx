import React from "react";
// import './HomePage.css'
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import AboutPage from "../AboutPage/AboutPage";
import ContactPage from "../ContactPage/ContactPage";

function HomePage() {
  // const locomotiveScroll = new LocomotiveScroll();
  return (
    <div className="home_main">
      <Navbar />
      <Hero />
      <AboutPage />
      <ContactPage/>
    </div>
  );
}
export default HomePage;
