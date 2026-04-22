import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { airpodsProData } from "../../../../../constants/airpodsData.jsx";

const IP54Graph = () => {
    const containerRef = useRef(null);
    useGSAP(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 80%", toggleActions: "play none none none" } });
        tl.fromTo(".droplet", { y: -100, scaleY: 1.2, opacity: 1 }, { y: 0, scaleY: 1, duration: 0.5, ease: "power1.in" })
            .to(".droplet", { scaleY: 0.5, scaleX: 1.5, duration: 0.15, y: 15, ease: "power2.out" })
            .to(".droplet", { y: -40, scaleY: 1.2, scaleX: 0.8, opacity: 0, duration: 0.4, ease: "power1.out" });
        tl.fromTo(".sheen", { xPercent: -100 }, { xPercent: 200, duration: 1, ease: "power2.inOut" }, 0.5);
    }, { scope: containerRef });
    return (
        <div ref={containerRef} className="relative w-32 h-32 flex items-end overflow-hidden justify-center my-4 group cursor-pointer transition-transform hover:scale-110">
            <svg className="droplet absolute bottom-12 w-10 h-12 text-cyan-400 z-20 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,21c-4.4,0-8-3.6-8-8c0-3.8,5.1-10.4,6.7-12.4c0.7-0.9,2-0.9,2.6,0C14.9,2.6,20,9.2,20,13C20,17.4,16.4,21,12,21z" />
            </svg>
            <div className="relative w-full h-16 bg-zinc-900 border-t-2 border-cyan-500/40 rounded-t-[50%] overflow-hidden shadow-[0_-10px_20px_rgba(34,211,238,0.1)]">
                <div className="sheen absolute inset-0 w-[150%] h-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent -skew-x-12 translate-x-[-100%]" />
            </div>
        </div>
    );
};

const BatterySection = () => {
    return (
        <section className="w-full bg-black py-32 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-white text-5xl md:text-7xl font-bold mb-20 tracking-tight">{airpodsProData.battery.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {airpodsProData.battery.stats.map((stat, i) => (
                        <div key={i} className="p-12 rounded-[3rem] bg-zinc-900/30 border border-white/5 flex flex-col items-center group hover:bg-zinc-900/50 transition-colors duration-500">
                            {i === 1 ? (
                                <IP54Graph />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-10 text-white group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                            )}
                            <p className="text-white text-6xl md:text-8xl font-black mb-4 tracking-tighter">{stat.value}</p>
                            <p className="text-gray-400 text-xl font-bold uppercase tracking-widest mb-2">{stat.label}</p>
                            <p className="text-zinc-500 max-w-xs">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BatterySection;
