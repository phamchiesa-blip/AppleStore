import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

import { Routes, Route } from "react-router-dom";
// import Ipad from "./components/pages/iPad"
// import Iphone from "./components/pages/iPhone"
import WatchPage from "./components/pages/Watch/WatchPage"
import StorePage from "./components/pages/Store/StorePage"
import TVHomePage from "./components/pages/TVHome/TVHomePage"
// import AirPod from "./components/pages/AirPod"
import Login from "./components/pages/Auth/Login";
import Signup from "./components/pages/Auth/Signup";
import NavBar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';
import GSAPReset from './components/Reset'


// Đăng ký plugin ScrollTrigger và SplitText với GSAP
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      {/* Route */}
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/mac" element={<MacPage />} />
        {/* <Route path="/iphone" element={<Iphone />} />
        <Route path="/ipad" element={<Ipad />} /> */}
        <Route path="/airpods" element={<AirpodsPage />} />
        <Route path="/airpods/max" element={<AirpodsMaxPage />} />
        <Route path="/airpods/pro3" element={<AirpodsProPage />} />
        <Route path="/airpods/pro4" element={<Airpods4Page />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/tvhome" element={<TVHomePage />} />
        <Route path="/detailwatchseries11" element={<DetailsWatch />} />
        <Route path="/detailwatchse3" element={<DetailsWatchSE />} />
        <Route path="/detailwatchsultra" element={<DetailsWatchUltra />} />
        <Route path="/tv4k" element={<TV4K />} />
        <Route path="/homeapp" element={<HomeApp />} />
      </Routes> 
    </>
  )
}

export default App;