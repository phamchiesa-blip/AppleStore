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
    <h1 className="mt-[150px] py-2 text-center text-6xl bg-gradient-to-l from-yellow-600 via-pink-400 to-green-300 bg-clip-text text-transparent">Enjoy the Apple system</h1>
        <div data-aos="zoom-in-down" className="flex-center flex-col">
            <img src="/ipmacwwatch-removebg-preview.png" alt="" className='w-[50vw] -mt-[220px]' />
            <h1 className="text-2xl -mt-[75px]">Working together with iPhone, iPad, Macbook and Apple Watch</h1>
        </div>
        <div data-aos="zoom-in-up" className="flex-center flex-col">
            <img src="/ipmac-removebg-preview.png" alt="" className='w-[50vw] -mt-[210px]' />
            <h1 className="text-2xl -mt-[75px]">Share information easily across Apple devices</h1>
        </div>
    </>
  )
}

export default AppleSystem