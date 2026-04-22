import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { Routes, Route } from "react-router-dom";
// import Ipad from "./components/pages/iPad"
import MacPage from "./components/pages/Macbook/MacPage";
import IphonePage from './components/pages/iPhone/iPhonePage'
import WatchPage from "./components/pages/Watch/WatchPage"
import StorePage from "./components/pages/Store/StorePage"
import TVHomePage from "./components/pages/TVHome/TVHomePage"
// import AirPod from "./components/pages/AirPod"
import DetailsWatch from "./components/pages/Watch/DetailsWatch";
import DetailsWatchSE from "./components/pages/Watch/DetailWatchSE";
import DetailsWatchUltra from "./components/pages/Watch/DetailWatchUltra";
import TV4K from "./components/pages/TVHome/TV4K";
import HomeApp from "./components/pages/TVHome/HomeApp";
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
      <NavBar />
      <GSAPReset />
      {/* Route */}
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/mac" element={<MacPage />} />
        <Route path="/iphone" element={<IphonePage />} />
        {/* <Route path="/iphone" element={<Iphone />} />
        <Route path="/ipad" element={<Ipad />} />
        <Route path="/airpod" element={<AirPod />} />
        /> */}
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