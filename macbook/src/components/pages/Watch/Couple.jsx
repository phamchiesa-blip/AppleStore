import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {coupleData} from '../../../constants/index'
import AOS from "aos";
import "aos/dist/aos.css";

function Couple() {
     useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false
  });

  AOS.refresh(); 
}, []);
const [activeTab, setActiveTab] = useState(0);
    return ( 
        <div className="container mx-auto px-5 2xl:px-0 mt-[145px]">
            <h1 className="text-6xl font-bold bg-gradient-to-l from-red-400 via-yellow-400 to-pink-400 bg-clip-text text-transparent">Made for each other.</h1>

             <div data-aos="fade-up" className="w-full h-[500px] rounded-xl bg-gradient-to-br from-[#2d2d2d] to-[#1f1f1f] mt-[50px] mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* CỘT TRÁI: Navigation Menu */}
        <div className="space-y-4 mt-[93px] ml-10">
          {coupleData.map((item) => (
            <div 
              key={item.id} 
              className={`border-b border-gray-200 dark:border-zinc-800 transition-all duration-300 ${
                activeTab === item.id ? 'pb-6' : 'pb-4'
              }`}
            >
              <button
                onClick={() => setActiveTab(item.id)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
              >
                <span 
                  className={`text-2xl md:text-3xl font-semibold transition-colors duration-500 ${
                    activeTab === item.id 
                      ? 'text-black dark:text-white' 
                      : 'text-gray-400 hover:text-gray-600 dark:hover:text-zinc-500'
                  }`}
                >
                  {item.title}
                </span>
                {activeTab === item.id ? (
                  <ChevronUp className="w-6 h-6 text-black dark:text-white" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {/* Nội dung text thả xuống */}
              <div 
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  activeTab === item.id ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 dark:text-zinc-400 text-lg leading-relaxed pr-8">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CỘT PHẢI: Hiển thị ảnh tương ứng */}
        <div className="sticky top-24 flex items-center justify-center flow-hidden md:aspect-auto md:h-[500px]">
          {coupleData.map((item) => (
            <img
              key={item.id}
              src={item.imageUrl}
              alt={item.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                activeTab === item.id ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
         
        </div>
                </div>
            </div>
        </div>
     );
}

export default Couple;