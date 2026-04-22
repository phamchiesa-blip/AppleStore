import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const HeaderBanner = () => {
    const containerRef = useRef(null);
    useGSAP(() => {
        gsap.to(".hero-text-fade", {
            y: 50, opacity: 0,
            scrollTrigger: { trigger: containerRef.current, start: "top top", end: "+=100%", scrub: 1 }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full h-[60vh] md:h-[80vh] bg-black flex items-center justify-center overflow-hidden border-b border-white/[0.05]">
            <div className="absolute inset-0 flex"><div className="w-1/2 bg-[#050505]" /><div className="w-1/2 bg-[#020202]" /></div>
            <div className="hero-text-fade relative z-10 text-center pointer-events-none mt-20">
                <p className="text-zinc-500 font-bold tracking-[0.4em] uppercase mb-4 text-xs md:text-sm mix-blend-screen mix-blend-plus-lighter">A new benchmark</p>
                <h1 className="text-zinc-100 text-[18vw] md:text-[14rem] font-black tracking-tighter leading-none text-center">
                    AirPods 4
                </h1>
                <p className="text-zinc-400 text-xl md:text-3xl mt-4 font-medium tracking-tight">The choice is yours.</p>
            </div>
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
        </section>
    );
};

export default HeaderBanner;
