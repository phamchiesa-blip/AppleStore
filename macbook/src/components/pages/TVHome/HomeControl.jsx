import { useRef } from "react";
import {HomeApp} from '../../../constants/index'

const HomeControl = () => {

    const scrollRef = useRef(null);
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
  <div className='container mx-auto px-5 2xl:px-0 mt-[136px] mb-[100px]'>
            <h1 className="text-6xl text-white font-extrabold">Apple TV. </h1>
            <h1 className="text-6xl bg-gradient-to-r from-green-300 via-purple-400 to-yellow-300 bg-clip-text text-transparent font-extrabold mt-3">Offers better control.</h1>
            <p className="mt-[40px] text-4xl font-medium">
                <span className="bg-gradient-to-r from-red-300 via-pink-400 to-sky-300 bg-clip-text text-transparent">Home App</span>
                {" "}can do even more with the help of {" "}
                <span className="bg-gradient-to-r from-green-300 via-purple-400 to-red-300 bg-clip-text text-transparent">Apple TV.</span>
                {" "}Apple TV can 
                <br />
                be set up as a smart home control center, allowing  you to access
                <br />
                your home when you're away and automate all your smart accessories.
                <br />
                Additionally, your <span className="bg-gradient-to-r from-sky-300 via-yellow-400 to-green-300 bg-clip-text text-transparent">Apple TV hub</span> is also a necessary piece of the puzzle
                <br />
                for {" "}<span className="bg-gradient-to-r from-green-300 to-yellow-300 bg-clip-text text-transparent">Matter</span>, the industry's new smart home standard with compatibility  
                <br />
                for more accessories and even connectivity across platforms.
            </p>

    <div ref={scrollRef} className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide mt-[55px] px-5 pb-4">
        {HomeApp.map((item, index) => (
    <div 
      key={index} 
      className="relative 
  w-[320px] h-[430px] 
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
        {/* IMG */}
        <div className="absolute bottom-[10vh] left-1/2 
          -translate-x-1/2
         flex justify-center">
            <img 
                src={item.src} 
                className=" w-[90%] 
              transition-transform duration-500 
              group-hover:scale-105" 
            />
        </div>
        {/* TEXT */}
        <div className="z-10">
          <h2 className="text-2xl font-semibold text-white">
            {item.name}
          </h2>

          <p className="text-gray-300 mt-[20px]">
            {item.desc}
          </p>
        </div>
    </div>

  ))}

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
  )
}

export default HomeControl