import NavBar from "../../Navbar"
import CompareTable from "./CompareTable";
import Footer from '../../Footer'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef } from 'react';
import {AppleSe3, AppleSe3Features} from '../../../constants/index'

const DetailsWatchSE = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
        AOS.init({
          duration: 1000,
          once: false
        });
      
        AOS.refresh(); 
      }, []);

  const scroll = (direction) => {
  if (scrollRef.current) {
    const scrollAmount = 350; // khoảng cách scroll (tuỳ chỉnh)

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }
  };

  return (
    <>
        <NavBar />

        <div className="w-full px-5 md:px-10 lg:px-20 2xl:px-0 max-w-7xl mx-auto mt-[100px]">
          {/* 11 */}
          <div data-aos="fade-down" className="mt-[70px]">
            <h1 className="text-white text-5xl">Apple Watch SE 3</h1>
            <h1 className="text-gray text-xl mt-5">Health.</h1>
            <h1 className="text-8xl mt-6 bg-gradient-to-br from-blue-500 via-purple-300 to-pink-700 bg-clip-text text-transparent">Go one</h1>
            <h1 className="text-8xl bg-gradient-to-br from-blue-400 via-purple-300 to-pink-700 bg-clip-text text-transparent">step ahead.</h1>
            <div ref={scrollRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide mt-10 px-5 pb-4">
        {AppleSe3.map((item, index) => (
    <div 
      key={index} 
      className="relative 
  w-[320px] h-[440px] 
  flex-shrink-0
  rounded-3xl 
  bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]
  shadow-[0_4px_20px_rgba(0,0,0,0.5)]
  p-6 
  overflow-hidden
  cursor-pointer
  group
  border border-white/10
  transition-all duration-300"
    >
        {/* TEXT */}
        <div className="z-10 relative">
          <h2 className="text-2xl font-semibold text-white">
            {item.name}
          </h2>
        </div>

        {/* IMG */}
        <div className="absolute bottom-0 left-1/2 
          -translate-x-1/2
          w-full flex justify-center">
            <img 
                src={item.src} 
                className=" w-[90%]
                text-center 
                mb-2
              " 
            />
          </div>
    </div>
  ))}
          </div>
          </div>

           <div className="flex justify-center gap-4 mt-4">
  <button
    onClick={() => scroll("left")}
    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
  >
    {"<"}
  </button>

  <button
    onClick={() => scroll("right")}
    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
  >
    {">"}
  </button>
        </div>

        <div className="mt-[150px]">
          <div data-aos="fade-up" className="flex flex-col flex-center">
            <h1 className="text-green-500 font-medium text-2xl mb-7">Exercise</h1>
            <h1 className="text-white font-semibold text-6xl mb-5">Improvement across</h1>
            <h1 className="text-white font-semibold text-6xl">all indicators.</h1>
            <h1 className="mt-[50px] text-2xl text-gray">Whether you're preparing for a marathon or a swimming race,</h1>
            <h1 className="text-xl text-gray">The Apple Watch Series 11 offers countless ways to exercise. And the device uses</h1>
            <h1 className="text-xl text-gray">useful metrics to track every move, so you can</h1>
            <h1 className="text-xl text-gray">Learn how to motivate yourself better and train smarter. Let's get started,</h1>
            <h1 className="text-xl text-gray">the starting line is right on your wrist.</h1>
          </div>

          <div data-aos="fade-right" className="flex flex-row justify-around mt-[80px]">
            <img src="/run.png" alt="" />
            <div className="">
              <h1 className="text-5xl mb-6">🏃🏻‍➡️</h1>
              <span className="text-xl">
                <h1 className="font-bold text-white">A more powerful Exercises app.</h1>
                <h1>The improved layout highlights four buttons</h1>
                <h1>in the corner, giving you quicker access</h1>
                <h1>to frequently used features like Set Speed,</h1>
                <h1>Track, and Custom Workout.</h1>
                </span>
            </div>
          </div>
           <div data-aos="fade-left" className="flex flex-row justify-around mt-[80px]">
            <div className="">
              <h1 className="text-5xl mb-6">🏃‍➡️🚩</h1>
              <span className="text-xl">
                <h1 className="font-bold text-white">Running is jumping.</h1>
                <h1>The Apple Watch SE 3 is your perfect running partner.</h1>
                <h1>With built-in GPS and advanced sensors, it can help you track distance, 
                  speed, and heart rate, providing all the necessary metrics to help you stay on track with your fitness goals.</h1>
                </span>
            </div>
            <img src="/runcomplete.png" alt="" />
          </div>
        </div>
        </div>

      <div className="relative w-full mt-[160px]">
        <img src="/running4K.jpg" alt="địt mẹ hanu" className="w-full h-auto object-cover" />
        <div className="absolute top-50 left-50 text-white text-2xl md:text-4xl font-semibold">
          <h1 className="font-bold text-6xl">Designed to encourage</h1>
          <h1 className="font-bold text-6xl mb-6 bg-gradient-to-r from-green-400 via-sky-700 to-brown-400 bg-clip-text text-transparent">runners.</h1>
          <h1 className="text-2xl">Whatever your running goal, the Apple Watch has </h1>
          <h1 className="text-2xl">advanced features to help you see them through. </h1>
          <h1 className="text-2xl"> With long-lasting battery life, precise GPS, and </h1>
          <h1 className="text-2xl">motivational features that let you track </h1>
          <h1 className="text-2xl">your workouts in real time, your best time </h1>
          <h1 className="text-2xl">starts right on your wrist.</h1>
          <h1 className="font-bold text-5xl mt-10">Apple watch allows you: </h1>
          <div className="grid grid-cols-[270px_270px] mt-5">
            <h1 className="text-xl mb-5 bg-gradient-to-r from-red-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent">Check out your impressive training volume.</h1>
            <h1 className="text-xl mb-5 bg-gradient-to-r from-green-400 to-sky-400 bg-clip-text text-transparent">Create Custom Assignments.</h1>
            <h1 className="text-xl bg-gradient-to-r from-orange-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Sync your workout data across your iPhone.</h1>
            <h1 className="text-xl bg-gradient-to-r from-gray-400 via-brown-300 to-green-400 bg-clip-text text-transparent">This playlist is designed to help you work out in sync with your workout routine.</h1>
          </div>
        </div>
      </div>


      <div className="w-full px-5 md:px-10 lg:px-20 2xl:px-0 max-w-7xl mx-auto mt-[100px]">
         
          <div data-aos="fade-down" className="mt-[70px]">
            <h1 className="text-white text-5xl">More features</h1>
            <div ref={scrollRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide mt-10 px-5 pb-4">
        {AppleSe3Features.map((item, index) => (
    <div 
      key={index} 
      className="relative 
  w-[380px] h-[560px] 
  flex-shrink-0
  rounded-3xl 
  bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]
  shadow-[0_4px_20px_rgba(0,0,0,0.5)]
  p-6 
  overflow-hidden
  cursor-pointer
  group
  border border-white/10
  transition-all duration-300"
    >
        {/* TEXT */}
        <div className="z-10 relative">
          <h2 className="text-2xl font-semibold text-white">
            {item.name}
          </h2>
        </div>

        {/* IMG */}
        <div className="absolute left-1/2
          -translate-x-1/2
          w-full flex justify-center">
            <img 
                src={item.src} 
                className=" w-[90%]
                text-center 
                mb-2
              " 
            />
          </div>
            <h1 className="absolute left-2 right-2 bottom-2 text-center">{item.desc}</h1>
    </div>
  ))}
          </div>
          </div>

           <div className="flex justify-center gap-4 mt-4">
  <button
    onClick={() => scroll("left")}
    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
  >
    {"<"}
  </button>

  <button
    onClick={() => scroll("right")}
    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
  >
    {">"}
  </button>
        </div>
      </div>


      <div className="mt-[160px] text-center">
        <h1 className="text-3xl font-bold text-red-600">Safe</h1>
        <h1 className="text-7xl font-extrabold text-white mt-3">The real emergency hotline.</h1>
        <h1 className="mt-[45px] text-2xl">Equipped with groundbreaking safety features, the Apple Watch</h1>
        <h1 className="text-2xl mt-2">Series 11 is ready to help you. It's designed to call for help when you need</h1>
        <h1 className="text-2xl mt-2">it most, even when you can't access your iPhone.</h1>

          <div data-aos="zoom-in" className="flex flex-center mt-[120px]">
            <img src="/safe-removebg-preview.png" alt="" className="w-[48vw] h-[90vh]" />
          </div>
      </div>
      <div className="w-full px-5 md:px-10 lg:px-20 2xl:px-0 max-w-7xl mx-auto grid grid-cols-3 gap-[40px] flex justify-around w-[120px]">
          <div className="">
            <h1 className="text-3xl">🆘</h1>
            <p className="mt-3 text-xl font-semibold leading-snug text-gray-400">
              <span className="text-white font-bold">
                Emergency SOS. Immediately.
              </span>{" "}
                Need urgent help? Simply press and hold the side button on your Apple Watch Series 11 to call emergency services and share your location.
            </p>
          </div>
          <div className="">
            <h1 className="text-4xl">🧎‍➡️</h1>
            <p className="mt-2 text-xl font-semibold leading-snug text-gray-400">
              <span className="text-white font-bold">
                Fall Detection is always ready.
              </span>{" "}
                If the Series 11 detects a hard fall, it can automatically help connect you to emergency services, provide dispatchers with your location, and notify loved ones.
            </p>
          </div>
          <div className="">
            <h1 className="text-3xl">⚠️</h1>
            <p className="mt-3 text-xl font-semibold leading-snug text-gray-400">
              <span className="text-white font-bold">
                Collision Detection. Your guardian on every road.
              </span>{" "}
                If you're involved in a serious car crash, Series 11 can automatically help call emergency services, share your location, and notify your emergency contacts.
            </p>
          </div>
          <div className="">
            <h1 className="text-3xl">✅</h1>
            <p className="mt-3 text-xl font-semibold leading-snug text-gray-400">
              <span className="text-white font-bold">
                When you're out and about, remember to Check.
              </span>{" "}
               Your watch can automatically notify someone when you've reached your destination. If you plan on running in the dark, you can activate the Check feature during your workout to notify a friend when you've finished.
            </p>
          </div>
          <div className="">
            <h1 className="text-3xl">🗺️</h1>
            <p className="mt-3 text-xl font-semibold leading-snug text-gray-400">
              <span className="text-white font-bold">
                To get back on track.
              </span>{" "}
                The back track feature in the Compass app uses GPS data to automatically recreate the path you took when you were out of coverage. Easily add point coordinates to anything you like, such as trails or campsites.
            </p>
          </div>
          <div className="">
            <h1 className="text-3xl">💊</h1>
            <p className="mt-3 text-xl font-semibold leading-snug text-gray-400">
              <span className="text-white font-bold">
                Set up your Medical ID.
              </span>{" "}
                In an emergency, rescue teams can quickly access critical medical information, such as allergies or medication information, directly from your Series 11.
            </p>
          </div>
      </div>

        <CompareTable />
        <Footer />
    </>
  )
}

export default DetailsWatchSE;