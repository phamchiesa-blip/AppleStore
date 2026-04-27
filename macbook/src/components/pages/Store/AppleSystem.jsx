import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

const AppleSystem = () => {
    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false
      });
    
      AOS.refresh(); 
    }, []);
    
  return (
    <>
    <section className="w-full px-4 sm:px-6 lg:px-10 py-16">
  {/* Heading */}
  <h1 className="text-center 
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    font-semibold py-1
    bg-gradient-to-l from-yellow-600 via-pink-400 to-green-300 
    bg-clip-text text-transparent">
    Enjoy the Apple system
  </h1>

  {/* Block 1 */}
  <div
    data-aos="zoom-in-down"
    className="flex flex-col items-center text-center mt-12 sm:mt-16 lg:mt-20"
  >
    <img
      src="/ipmacwwatch-removebg-preview.png"
      alt="Apple ecosystem devices"
      className="w-[90%] sm:w-[75%] lg:w-[50vw] object-contain"
    />
    <h2 className="text-base sm:text-xl lg:text-2xl mt-4 text-white">
      Working together with iPhone, iPad, MacBook and Apple Watch
    </h2>
  </div>

  {/* Block 2 */}
  <div
    data-aos="zoom-in-up"
    className="flex flex-col items-center text-center mt-12 sm:mt-16 lg:mt-20"
  >
    <img
      src="/ipmac-removebg-preview.png"
      alt="Apple devices sharing information"
      className="w-[90%] sm:w-[75%] lg:w-[50vw] object-contain"
    />
    <h2 className="text-base sm:text-xl lg:text-2xl mt-4 text-white">
      Share information easily across Apple devices
    </h2>
  </div>
</section>
    </>
  )
}

export default AppleSystem