import MacPage from "./components/pages/Macbook/MacPage";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
// import Ipad from "./components/pages/iPad"
// import Iphone from "./components/pages/iPhone"
import WatchPage from "./components/pages/Watch/WatchPage"
import StorePage from "./components/pages/Store/StorePage"
import TVHomePage from "./components/pages/TVHome/TVHomePage"
import AirpodsPage from "./components/pages/airpods/main/AirpodsPage"
import AirpodsMaxPage from "./components/pages/airpods/max/AirpodsMaxPage"
import AirpodsProPage from "./components/pages/airpods/pro3/AirpodsProPage"
import Airpods4Page from "./components/pages/airpods/pro4/Airpods4Page"
import Login from "./components/pages/Auth/Login";
import Signup from "./components/pages/Auth/Signup";
import { Toaster } from 'react-hot-toast';

// Đăng ký plugin ScrollTrigger và SplitText với GSAP
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <ScrollToTop />
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
       </Routes>
    </>
  )
}

export default App;