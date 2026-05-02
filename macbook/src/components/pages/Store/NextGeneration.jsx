import {imageAppleStore} from '../../../constants/index'
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function NextGeneration() {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const onMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
  };

  const onMouseUp = () => {
    setIsDown(false);
  };

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const getLink = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('mac')) return '/mac';
    if (lower.includes('iphone')) return '/iphone';
    if (lower.includes('ipad')) return '/ipad';
    if (lower.includes('watch')) return '/watch';
    if (lower.includes('airpods')) return '/airpods';
    if (lower.includes('tv') || lower.includes('home')) return '/tvhome';
    return '/';
  };

  return (
    <div className="container mx-auto px-5 2xl:px-0 mt-[100px]">
      <h1 className="text-4xl font-bold text-white">Latest Generation. See now what's new.</h1>

      <div 
        ref={scrollRef} 
        className={`flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide mt-6 px-5 pb-4 ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        style={{ userSelect: 'none' }}
      >
        {imageAppleStore.map((item, index) => (
          <Link 
            to={getLink(item.name)}
            key={index} 
            className="relative 
              w-[320px] h-[420px] 
              flex-shrink-0
              rounded-3xl 
              bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]
              shadow-[0_4px_20px_rgba(0,0,0,0.5)]
              hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)]
              p-6 
              overflow-hidden
              group
              border border-white/10
              transition-all duration-300
              hover:-translate-y-2
              snap-center"
            draggable="false"
          >
            {/* TEXT */}
            <div className="z-10 relative">
              <h2 className="text-2xl font-semibold text-white">
                {item.name}
              </h2>
              <p className="text-gray-300 mt-1">
                {item.desc}
              </p>
              <p className="text-gray-400 mt-2">
                {item.price}
              </p>
            </div>

            {/* IMG */}
            <div className="absolute bottom-0 left-1/2 
              -translate-x-1/2
              w-full flex justify-center pointer-events-none">
              <img 
                src={item.src} 
                className="w-[90%] 
                  transition-transform duration-500 
                  group-hover:scale-105" 
                draggable="false"
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default NextGeneration