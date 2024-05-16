import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Working from './components/Working/Working'
import Management from './components/Management/Management'



function App() {
  return (
    <>
      <Navbar />
      <Hero/>
      <Working />
      <Management/>

    </>
  )
}

export default App
