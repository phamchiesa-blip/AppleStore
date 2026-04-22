import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const IntroHomeApp = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false
    });
  
    AOS.refresh(); 
  }, []);
  return (
   <>
       <div className="flex-center mt-[130px]">
        <img src="/home.png" width={80} />
       </div>

       <h1 className="text-white font-bold text-2xl text-center mt-[22px]">Home App</h1>
       <div data-aos="fade-up" className="text-white text-8xl text-center mt-[50px]">
        <h1>A solid foundation </h1>
        <h1>for a smart home.</h1>
       </div>

       <div data-aos="fade-up" className="flex-center mt-[80px]">
        <img src="/homelapiph.png" className="w-[70vw]" />
       </div>

        <h1 className="text-center mt-[85px] text-2xl text-gray-200">
          The Home app makes controlling all your smart home
          <br />
          accessories easier – across all your Apple devices.
          <br />
          The app is secure and helps protect your personal 
          <br />
          data. And when you set up Apple TV as your main home 
          <br />
          control center, the Home app unlocks the full potential 
          <br />
          of your smart home.
        </h1>
   </>
  )
}

export default IntroHomeApp