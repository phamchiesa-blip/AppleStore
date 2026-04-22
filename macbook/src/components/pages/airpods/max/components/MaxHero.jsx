import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MaxHero = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=250%",
                scrub: 1,
                pin: true,
            }
        });

        gsap.set(".text-symphony", { y: 150, opacity: 0 });
        gsap.set(".text-colors", { scale: 0.9, opacity: 0 });
        gsap.set(".spec-card-1", { x: -80, opacity: 0 });
        gsap.set(".spec-card-2", { x: 80, opacity: 0 });

        tl.to(".text-symphony", { y: -30, opacity: 1, duration: 2, ease: "power2.out" })
            .to(".text-symphony", { y: -100, opacity: 0, duration: 1 }, "+=0.5");

        tl.to(".max-image", { scale: 1.08, duration: 2, ease: "power1.inOut" }, "-=1")
            .to(".text-colors", { scale: 1, opacity: 1, duration: 1.5 }, "-=1.5")
            .to(".text-colors", { opacity: 0, scale: 1.05, duration: 1 }, "+=0.5");

        tl.to(".max-image", { scale: 1.12, opacity: 0.35, duration: 2, ease: "power2.inOut" })
            .to(".spec-card-1", { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=1.5")
            .to(".spec-card-2", { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=1.2");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
            {/* Layer 0: Background Typography */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 mt-32">
                <h1 className="text-symphony text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 text-[12vw] xl:text-[180px] font-black tracking-tighter leading-none text-center drop-shadow-2xl">
                    Symphony<br /><span className="text-[9vw] xl:text-[130px] text-zinc-500">Aluminum</span>
                </h1>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 mt-10">
                <h2 className="text-colors text-white text-[7vw] md:text-7xl font-bold tracking-tight text-center drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
                    Five colors.<br /><span className="text-zinc-500">One masterpiece.</span>
                </h2>
            </div>

            {/* Layer 1: Image Layer */}
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none z-10">
                <img
                    src="/images/Apple-AirPods-Max-2.jpg"
                    alt="AirPods Max"
                    className="max-image w-[150vw] md:w-[100vw] h-auto max-h-[125vh] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)] will-change-transform mt-10 md:mt-20"
                />
            </div>

            {/* Layer 2: Specifications Cards */}
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-24 z-20 pointer-events-none">
                <div className="spec-card-1 w-full md:w-80 bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto transform-gpu mt-[50vh] md:mt-0">
                    <div className="w-10 h-1 bg-white/20 rounded-full mb-6" />
                    <h3 className="text-white text-3xl font-bold mb-3 tracking-tight">Active Noise Cancellation</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed">Cancels up to 2x more background noise than the previous generation.</p>
                </div>
                <div className="spec-card-2 w-full md:w-80 bg-zinc-900/40 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto mt-6 md:mt-0 transform-gpu">
                    <div className="w-10 h-1 bg-white/20 rounded-full mb-6" />
                    <h3 className="text-white text-3xl font-bold mb-3 tracking-tight">Spatial Audio</h3>
                    <p className="text-zinc-400 text-lg leading-relaxed">Personalized spatial audio tailored precisely to your unique ear geometry.</p>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-30" />
        </section>
    );
};

export default MaxHero;
