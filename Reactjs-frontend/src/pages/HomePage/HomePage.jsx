import React from 'react'
import './HomePage.css'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Working from '../../components/Working/Working'
import Management from '../../components/Management/Management'
import Trusted from '../../components/Trusted_partner/Trusted'

function HomePage() {

  return (
      <div className='home_main'>
          <Navbar />
          <Hero />
          <Working />
          <Management />
          <Trusted/>
    </div>
  )
}

export default HomePage