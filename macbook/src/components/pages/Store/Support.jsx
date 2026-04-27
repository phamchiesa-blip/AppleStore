import {appleSupport} from '../../../constants/index'
import Chatbot from './ChatBox';
import { useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

function Support() {
  useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false
  });

  AOS.refresh(); 
}, []);
    const [isChatOpen, setIsChatOpen] = useState(false);
    return ( 
        <>
            <div className="flex flex-col lg:flex-row container mx-auto px-5 2xl:px-0 mt-[70px]">
                <h1 className="text-white text-4xl">Support here - </h1>
                <h1 className="text-4xl text-white-900"> - Right when you want it, everything you need.</h1>
            </div>

            <div className="flex flex-row container mx-auto px-5 2xl:px-0 mt-[70px]">
                <div className="flex gap-8 mt-6 px-5 pb-4">
            {appleSupport.map((item, index) => (
        <a key={index} href="#" 
  onClick={(e) => {
    e.preventDefault();
    setIsChatOpen(true);
  }}
>
  <div data-aos="fade-up"
    className="relative 
      w-full sm:w-[90%] lg:w-[482px]
      h-[420px] sm:h-[460px] lg:h-[500px]
      flex flex-col lg:flex-row
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
    <div className="z-10 relative mt-2">
      <h2 className="text-sm font-semibold text-white">
        {item.title}
      </h2>

      <p className="text-3xl text-gray-300 mt-1">
        {item.desc}
      </p>
    </div>

    {/* IMG */}
    <div className="absolute bottom-0 left-1/2 
      -translate-x-1/2
      w-full flex justify-center">
      <img 
        src={item.src} 
        className="w-[90%] 
        transition-transform duration-500 
        group-hover:scale-105" 
      />
    </div>

  </div>
</a>
        ))}
            </div>
        </div>
        {isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}
        </>
     );
}

export default Support;