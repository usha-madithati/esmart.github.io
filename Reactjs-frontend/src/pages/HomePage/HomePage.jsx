import React from 'react'
import './HomePage.css'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import AboutPage from '../AboutPage/AboutPage'

function HomePage() {

  return (
      <div className='home_main'>
          <Navbar />
          <Hero />
          <AboutPage/>
    </div>
  )
}

export default HomePage