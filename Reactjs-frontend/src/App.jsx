import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login/Login'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import SignUp from './pages/SignUp/SignUp'


function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Login />
      <SignUp />
    </>
  )
}

export default App
