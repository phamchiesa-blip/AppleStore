import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

import { Routes, Route } from "react-router-dom";
import IPadPage from "./components/pages/IPad/IPadPage";
import IPhonePage from "./components/pages/iPhone/iPhonePage";
import WatchPage from "./components/pages/Watch/WatchPage"
import StorePage from "./components/pages/Store/StorePage"
import TVHomePage from "./components/pages/TVHome/TVHomePage"
import AirpodsPage from "./components/pages/airpods/main/AirpodsPage"
import AirpodsMaxPage from "./components/pages/airpods/max/AirpodsMaxPage"
import AirpodsProPage from "./components/pages/airpods/pro3/AirpodsProPage"
import Airpods4Page from "./components/pages/airpods/pro4/Airpods4Page"
import Login from "./components/pages/Auth/Login";
import Signup from "./components/pages/Auth/Signup";
import NavBar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';
import GSAPReset from './components/Reset'
import MacPage from "./components/pages/Macbook/MacPage";
import DetailsWatch from "./components/pages/Watch/DetailsWatch";
import DetailsWatchSE from "./components/pages/Watch/DetailWatchSE";
import DetailsWatchUltra from "./components/pages/Watch/DetailWatchUltra";
import TV4K from "./components/pages/TVHome/TV4K";
import HomeApp from "./components/pages/TVHome/HomeApp";
import UserPage from "./components/pages/User/UserPage";
import CheckoutPage from "./components/CheckoutPage";
import SuccessPage from "./components/pages/SuccessPage";
import AdminLayout from "./components/pages/Admin/AdminLayout";
import { GuestRoute, UserRoute, AdminRoute } from "./components/routes/RouteGuards";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";

// Đăng ký plugin ScrollTrigger và SplitText với GSAP
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const initializeAuth = useAuthStore(state => state.initialize);
  const isInitialized = useAuthStore(state => state.isInitialized);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (!isInitialized) return null;

  return (
    <>
      <Toaster position="top-center" />
      <GSAPReset />
      <NavBar />
      {/* Route */}
      <Routes>
        {/* Public Routes (Guest, User, Admin đều vào được) */}
        <Route path="/" element={<StorePage />} />
        <Route path="/mac" element={<MacPage />} />
        <Route path="/iphone" element={<IPhonePage />} />
        <Route path="/ipad" element={<IPadPage />} />
        <Route path="/airpods" element={<AirpodsPage />} />
        <Route path="/airpods/max" element={<AirpodsMaxPage />} />
        <Route path="/airpods/pro3" element={<AirpodsProPage />} />
        <Route path="/airpods/pro4" element={<Airpods4Page />} />
        <Route path="/watch" element={<WatchPage />} />
        <Route path="/tvhome" element={<TVHomePage />} />
        <Route path="/detailwatchseries11" element={<DetailsWatch />} />
        <Route path="/detailwatchse3" element={<DetailsWatchSE />} />
        <Route path="/detailwatchsultra" element={<DetailsWatchUltra />} />
        <Route path="/tv4k" element={<TV4K />} />
        <Route path="/homeapp" element={<HomeApp />} />

        {/* Guest Routes (Chỉ người chưa đăng nhập mới vào được) */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* User Routes (Đã đăng nhập mới vào được) */}
        <Route element={<UserRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>

        {/* Admin Routes (Chỉ Admin mới vào được) */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/*" element={<AdminLayout />} />
        </Route>

      </Routes> 
    </>
  )
}

export default App;