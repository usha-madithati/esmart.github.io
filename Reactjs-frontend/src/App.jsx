import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import HomePage from "./pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <HomePage/>} />
      </Routes>
    </>
  );
}

export default App;
