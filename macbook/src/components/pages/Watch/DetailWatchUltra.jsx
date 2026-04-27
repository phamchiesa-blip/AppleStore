import CompareTable from "./CompareTable";
import Footer from '../../Footer'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef } from 'react';
import {AppleUltra3, AppleSeries11Features} from '../../../constants/index'

const DetailsWatchUltra = () => {
  const topSliderRef = useRef(null);
  const bottomSliderRef = useRef(null);

  useEffect(() => {
        AOS.init({
          duration: 1000,
          once: false
        });
      
        AOS.refresh(); 
      }, []);

  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 350;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="w-full px-5 md:px-10 lg:px-20 2xl:px-0 max-w-7xl mx-auto mt-[100px]">
          {/* 11 */}
          <div data-aos="fade-down" className="mt-[70px]">
            <h1 className="text-white text-5xl">Apple Watch Ultra 3</h1>
            <h1 className="text-gray text-xl mt-5">Sports without limits.</h1>
            <div ref={topSliderRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide mt-10 px-5 pb-4">
        {AppleUltra3.map((item, index) => (
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
    onClick={() => handleScroll(topSliderRef, "left")}
    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
  >
    {"<"}
  </button>

  <button
    onClick={() => handleScroll(topSliderRef, "right")}
    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
  >
    {">"}
  </button>
        </div>

        <div className="mt-[150px]">
          <div data-aos="fade-up" className="flex flex-col flex-center">
            <h1 className="text-green-500 font-medium text-2xl mb-7">Running</h1>
            <h1 className="text-white font-semibold text-6xl mb-5">Optimize</h1>
            <h1 className="text-white font-semibold text-6xl">each stride.</h1>
            <h1 className="mt-[50px] text-2xl text-gray">Runners, gather together. The Apple Watch Ultra 3 has</h1>
            <h1 className="text-xl text-gray">everything you need to train smarter and achieve your personal bests.</h1>
            <h1 className="text-xl text-gray">owerful features like precise dual-frequency GPS, advanced</h1>
            <h1 className="text-xl text-gray">metrics, and Custom Workouts help you master your pace.</h1>
            <span className="flex flex-row text-white mt-6">
                <h1 className="text-4xl">📍 Accurate dual-frequency </h1>
                {" "} 
                <h1 className="text-5xl bg-gradient-to-r from-green-400 via-sky-700 to-yellow-400 bg-clip-text text-transparent">GPS</h1>
            </span>
          </div>

          <div data-aos="fade-right" className="flex lg:flex-row flex-col justify-around mt-[80px]">
            <img src="/run.png" alt="" />
            <div className="">
              <h1 className="text-5xl mb-6">🏃🏻‍➡️</h1>
              <span className="text-xl text-center">
                <h1 className="font-bold text-white">The Workout app has been revamped.</h1>
                <h1>The improved layout highlights four buttons</h1>
                <h1>in the corner, giving you quicker access</h1>
                <h1>to frequently used features like Set Speed,</h1>
                <h1>Track, and Custom Workout.</h1>
                </span>
            </div>
          </div>
           <div data-aos="fade-left" className="flex lg:flex-row flex-col justify-around mt-[80px]">
            <div className="">
              <h1 className="text-5xl mb-6">✔️</h1>
              <span className="text-xl text-center">
                <h1 className="font-bold text-white">Complete every Activity cycle, live healthier <br /> every day.</h1>
                <h1>Move. Exercise. Stand. The Activity app can track</h1>
                <h1>our daily activity. You can easily pause your activity</h1>
                <h1>cycle or adjust your goals for each day of the week.</h1>
                </span>
            </div>
            <img src="/runcomplete.png" alt="" />
          </div>
        </div>
        </div>


        <div className="mt-[125px]">
            <h1 className="text-6xl text-center">🪫</h1>
            <h1 className="lg:text-6xl text-4xl px-2 font-extrabold text-center text-white mt-5">The battery is designed for longevity.</h1>
            <h1 className="text-center mt-10 text-xl px-1">The Apple Watch Ultra 3 is designed to give you even longer battery life, <br /> so you can go further and wider than ever before. <br />
                 When you need a power boost, you can fast charge it for just 15 minutes for up to 12 hours of normal use.</h1>
            <div className="w-full mt-[90px] px-5 md:px-10 lg:px-20 2xl:px-0 max-w-7xl mx-auto grid lg:grid-cols-2 grid-cols-1 gap-[40px] flex lg:justify-around">
              <div className="text-center">
                <h1 className="text-3xl text-white">Up to</h1>
                <p className="mt-3 text-xl font-semibold leading-snug text-gray-400">
                  <span className="text-orange-600 font-bold text-6xl">
                    42 hours
                  </span>
                    <br />under normal use.
                </p>
              </div>
              <div className="text-center">
                <h1 className="text-3xl text-white text-center">Up to</h1>
                <p className="mt-3 text-xl font-semibold leading-snug text-gray-400">
                  <span className="text-orange-600 font-bold text-6xl">
                    72 hours
                  </span>
                    <br />when in normal use in Low Power Mode.
                </p>
              </div>
              <div className="text-center">
                <h1 className="text-3xl text-white text-center">Up to</h1>
                <p className="mt-3 text-xl font-semibold leading-snug text-gray-400">
                  <span className="text-orange-600 font-bold text-6xl">
                    14 hours
                  </span>
                    <br />when exercising outdoors with GPS and <br /> regularly reading heart rate data.
                </p>
              </div>
              <div className="text-center">
                <h1 className="text-3xl text-white text-center">Up to</h1>
                <p className="mt-3 text-xl font-semibold leading-snug text-gray-400">
                  <span className="text-orange-600 font-bold text-6xl">
                    35 hours
                  </span>
                   <br /> when exercising outdoors with a cellular network <br /> in Low Power Mode, with less frequent heart rate <br /> and GPS measurements.
                </p>
              </div>
            </div>
        </div>

     <div className="relative w-full mt-[160px] hidden md:block">
        <img src="/running4K.jpg" alt="địt mẹ hanu" className="w-full h-auto object-cover" />
        <div className="absolute lg:top-50 left-50 top-25 text-white text-2xl md:text-4xl font-semibold">
          <h1 className="font-bold lg:text-6xl text-4xl">Designed to encourage</h1>
          <h1 className="font-bold lg:text-6xl text-4xl mb-6 bg-gradient-to-r from-green-400 via-sky-700 to-brown-400 bg-clip-text text-transparent">runners.</h1>
          <h1 className="lg:text-2xl text-[1.25rem]">Whatever your running goal, the Apple Watch has </h1>
          <h1 className="lg:text-2xl text-[1.25rem]">advanced features to help you see them through. </h1>
          <h1 className="lg:text-2xl text-[1.25rem]"> With long-lasting battery life, precise GPS, and </h1>
          <h1 className="lg:text-2xl text-[1.25rem]">motivational features that let you track </h1>
          <h1 className="lg:text-2xl text-[1.25rem]">your workouts in real time, your best time </h1>
          <h1 className="lg:text-2xl text-[1.25rem]">starts right on your wrist.</h1>
          <h1 className="font-bold text-5xl mt-10 hidden lg:block">Apple watch allows you: </h1>
          <div className="grid grid-cols-[270px_270px] mt-5 hidden lg:grid">
            <h1 className="text-xl mb-5 bg-gradient-to-r from-red-400 via-orange-300 to-yellow-200 bg-clip-text text-transparent">Check out your impressive training volume.</h1>
            <h1 className="text-xl mb-5 bg-gradient-to-r from-green-400 to-sky-400 bg-clip-text text-transparent">Create Custom Assignments.</h1>
            <h1 className="text-xl mb-5 bg-gradient-to-r from-orange-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Sync your workout data across your iPhone.</h1>
            <h1 className="text-xl mb-5 bg-gradient-to-r from-gray-400 via-brown-300 to-green-400 bg-clip-text text-transparent">This playlist is designed to help you work out in sync with your workout routine.</h1>
          </div>
        </div>
      </div>


      <div className="w-full px-5 md:px-10 lg:px-20 2xl:px-0 max-w-7xl mx-auto mt-[230px]">
         
          <div data-aos="fade-down" className="mt-[70px]">
            <h1 className="text-white text-5xl">More features</h1>
            <div ref={bottomSliderRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide mt-10 px-5 pb-4">
        {AppleSeries11Features.map((item, index) => (
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
        <div className="absolute bottom-18 left-1/2 
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
    onClick={() => handleScroll(bottomSliderRef, "left")}
    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
  >
    {"<"}
  </button>

  <button
    onClick={() => handleScroll(bottomSliderRef, "right")}
    className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
  >
    {">"}
  </button>
        </div>
      </div>


      <div className="mt-[160px] text-center">
        <h1 className="text-3xl font-bold text-red-600">Safe</h1>
        <h1 className="lg:text-7xl text-4xl font-extrabold text-white mt-3">The real emergency hotline.</h1>
        <h1 className="mt-[45px] text-2xl px-1">Equipped with groundbreaking safety features, the Apple Watch</h1>
        <h1 className="text-2xl mt-2 px-1">Series 11 is ready to help you. It's designed to call for help when you need</h1>
        <h1 className="text-2xl mt-2 px-1">it most, even when you can't access your iPhone.</h1>

          <div data-aos="zoom-in" className="flex flex-center mt-[120px]">
            <img src="/safe-removebg-preview.png" alt="" className="lg:w-[45vw] lg:h-[88vh] h-[70vh]" />
          </div>
      </div>
      <div className="w-full px-5 md:px-10 lg:px-20 2xl:px-0 max-w-7xl mx-auto grid lg:grid-cols-3 grid-cols-1 gap-[40px] flex justify-around w-[120px]">
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

export default DetailsWatchUltra;