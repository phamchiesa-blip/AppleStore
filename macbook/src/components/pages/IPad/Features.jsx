import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const section1Ref = useRef(null);
    const content1Ref = useRef(null);
    const section2Ref = useRef(null);
    
    useEffect(() => {
        // Feature 1 animation
        gsap.fromTo(content1Ref.current.children,
            { opacity: 0, y: 40 },
            {
                opacity: 1, 
                y: 0, 
                duration: 1, 
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section1Ref.current,
                    start: "top 60%",
                }
            }
        );

        // Feature 2 animation (Chip scale effect)
        gsap.fromTo('.chip-container',
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: 'back.out(1.5)',
                scrollTrigger: {
                    trigger: section2Ref.current,
                    start: "top 65%",
                }
            }
        );
    }, []);

    return (
        <div className="bg-black text-white">
            {/* Feature 1: Display */}
            <section ref={section1Ref} className="py-32 flex flex-col lg:flex-row items-center justify-between px-6 md:px-24 max-w-screen-2xl mx-auto border-t border-white/10">
                <div className="w-full lg:w-1/2 mb-16 lg:mb-0 pr-0 lg:pr-12" ref={content1Ref}>
                    <h2 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight">Ultra Retina XDR.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">World's most advanced display.</span></h2>
                    <p className="text-xl md:text-2xl text-[#a1a1a6] mb-8 font-medium">Extreme brightness and precise contrast. It's a visual experience like no other.</p>
                    <button className="text-[#2997ff] text-lg hover:underline flex items-center gap-1">Take a closer look at the display <span>&gt;</span></button>
                </div>
                
                <div className="w-full lg:w-1/2 flex justify-center relative">
                    {/* Placeholder for Display */}
                    <div className="w-full max-w-md aspect-square relative rounded-full blur-[100px] bg-gradient-to-tr from-yellow-500 via-red-500 to-fuchsia-600 opacity-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    <div className="w-full max-w-md aspect-[4/3] bg-[#111] rounded-3xl border-2 border-[#333] shadow-2xl relative z-10 overflow-hidden flex items-center justify-center p-2">
                         <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-inner">
                            <span className="font-bold text-white/50 text-2xl tracking-widest uppercase">XDR Display</span>
                         </div>
                    </div>
                </div>
            </section>

            {/* Feature 2: M4 Chip */}
            <section ref={section2Ref} className="py-32 flex flex-col items-center text-center px-6 border-t border-white/10 overflow-hidden">
                <div className="chip-container w-48 h-48 md:w-64 md:h-64 relative mb-16">
                     <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full blur-3xl opacity-40 animate-pulse"></div>
                     <div className="relative w-full h-full bg-[#111] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden">
                         <div className="w-[85%] h-[85%] bg-black rounded-2xl border border-[#333] flex items-center justify-center">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 font-bold text-6xl md:text-8xl tracking-tighter">
                                M4
                            </span>
                         </div>
                     </div>
                </div>
                
                <div className="max-w-3xl">
                    <h2 className="text-5xl md:text-7xl font-semibold mb-8 tracking-tight">Outrageous performance.</h2>
                    <p className="text-xl md:text-2xl text-[#a1a1a6] mb-8 font-medium">The next-generation Apple silicon delivers up to 1.5x faster CPU performance. A true powerhouse for pro workflows.</p>
                </div>
            </section>
        </div>
    );
};

export default Features;
