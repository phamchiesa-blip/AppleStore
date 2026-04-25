import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '../../../context/useCart';

const Hero = () => {
    const { addToCart, setIsCartOpen } = useCart();

    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
          .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.5")
          .fromTo(videoRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, "-=0.5");
    }, []);

    const ipadPro = {
    id: "ipad-pro", // nhớ unique
    name: "iPad Pro",
    price: 999,
    image: "/ipad-pro.png" // ảnh sai link đấy, nhớ sửa lại
    };

    return (
        <section className="relative h-screen w-full flex flex-col justify-start items-center bg-black text-white overflow-hidden pt-[15vh]">
            <div className="z-10 text-center flex flex-col items-center">
                <h1 ref={titleRef} className="text-6xl md:text-[8rem] font-semibold tracking-tight mb-4 opacity-0">iPad Pro</h1>
                <p ref={subtitleRef} className="text-2xl md:text-4xl text-gray-300 font-medium mb-10 opacity-0 tracking-wide">Thinpossible.</p>
                <div className="flex gap-6">
                    <button 
                    onClick={() => {
                            addToCart(ipadPro);
                            setIsCartOpen(true);
                        }}
                    className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors text-lg">Buy</button>
                    <button className="text-blue-500 hover:text-blue-400 font-medium text-lg flex items-center gap-1 transition-colors">
                        Learn more <span className="text-sm">&gt;</span>
                    </button>
                </div>
            </div>
            
            {/* Placeholder Background / Video */}
            <div ref={videoRef} className="absolute inset-0 w-full h-full opacity-0 pointer-events-none flex justify-center items-end pb-0">
                <div className="w-[90%] md:w-[70%] h-[60%] md:h-[70%] bg-gradient-to-t from-blue-900/40 via-black to-black rounded-t-[4rem] md:rounded-t-[8rem] border-t-2 border-x border-gray-800/80 shadow-[0_-20px_100px_rgba(59,130,246,0.15)] flex justify-center pt-8">
                     {/* Suggestion of the ultra-thin screen edge */}
                     <div className="w-[98%] h-[98%] bg-black rounded-t-[3.5rem] md:rounded-t-[7.5rem] border-t border-gray-900 shadow-inner"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
