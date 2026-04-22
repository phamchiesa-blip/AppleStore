import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Headphones } from "lucide-react";
import { airpodsMaxData } from "../../../../../constants/airpodsData.jsx";

const BatteryVisual = () => {
    const fillRef = useRef(null);
    const counterRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 85%", toggleActions: "play none none none" } });
        tl.fromTo(fillRef.current, { height: "0%" }, { height: "90%", duration: 2, ease: "power2.out" });
        let target = { val: 0 };
        tl.to(target, {
            val: 30, duration: 2, ease: "circ.out",
            onUpdate: () => { if (counterRef.current) counterRef.current.innerText = Math.floor(target.val); }
        }, "<");
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="flex flex-col gap-4 mt-2">
            <div className="flex items-end gap-6 h-24">
                <div className="relative w-12 h-20 border-2 border-emerald-500/50 rounded-lg p-1 flex flex-col justify-end bg-black/50">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-emerald-500/50 rounded-t-sm" />
                    <div ref={fillRef} className="w-full bg-emerald-500 rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                </div>
                <div className="flex items-baseline leading-none">
                    <span ref={counterRef} className="text-white text-5xl md:text-6xl font-bold tracking-tighter">0</span>
                    <span className="text-emerald-400 text-xl font-medium ml-1">hrs</span>
                </div>
            </div>
            <p className="text-gray-400 text-sm">{airpodsMaxData.bento[0].desc}</p>
        </div>
    );
};

const BentoSpecs = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.to(".ripple", { scale: 3, opacity: 0, duration: 2.5, stagger: 0.8, repeat: -1, ease: "power2.out" });
        gsap.fromTo(".case-img",
            { y: 100, rotation: -5 },
            { y: -50, rotation: 5, scrollTrigger: { trigger: ".case-block", start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.from(".bento-item", {
            y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        });
    }, { scope: sectionRef });

    const standardBentoData = airpodsMaxData.bento.filter(item => item.id !== 'battery');

    return (
        <section ref={sectionRef} className="w-full bg-zinc-950 pt-32 pb-48 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto">
                <h2 className="text-white text-5xl md:text-7xl font-semibold tracking-tight mb-16">
                    Advanced<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">capability.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[320px]">
                    <div className="bento-item case-block lg:col-span-2 lg:row-span-2 rounded-[2.5rem] bg-zinc-900 border border-white/5 overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="absolute top-10 left-10 z-20">
                            <p className="text-purple-400 text-sm font-bold tracking-widest uppercase mb-2">Smart Case</p>
                            <h3 className="text-white text-3xl md:text-5xl font-semibold mb-3 max-w-sm">Ultra‑low power state.</h3>
                            <p className="text-gray-400 max-w-sm text-lg">Keeps your AirPods Max 2 in a ready state with zero drain.</p>
                        </div>
                        <div className="absolute inset-0 flex items-end justify-end overflow-hidden">
                            <img src={`/images/usb.jpg`} alt="Case" className="case-img w-[80%] md:w-full h-full object-cover object-top scale-125 mix-blend-screen opacity-90 translate-y-10" />
                        </div>
                    </div>

                    <div className="bento-item rounded-[2.5rem] bg-zinc-900/80 border border-white/5 flex flex-col justify-between p-8 relative overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-20 -mt-20`} />
                        <div>
                            <p className={`text-emerald-400 text-sm font-bold tracking-widest uppercase mb-2`}>{airpodsMaxData.bento[0].label}</p>
                            <BatteryVisual />
                        </div>
                    </div>

                    {standardBentoData.map((item) => (
                        <div key={item.id} className="bento-item rounded-[2.5rem] bg-zinc-900/80 border border-white/5 flex flex-col justify-between p-8 relative overflow-hidden group">
                            <div className={`absolute top-0 right-0 w-64 h-64 ${item.bg} rounded-full blur-[80px] -mr-20 -mt-20`} />
                            <div>
                                <p className={`${item.color} text-sm font-bold tracking-widest uppercase mb-2`}>{item.label}</p>
                                <h3 className="text-white text-2xl font-semibold leading-tight">{item.title}</h3>
                            </div>
                            <div className="flex items-center gap-4 z-10">
                                <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center`}>
                                    {item.icon}
                                </div>
                                <p className="text-xs text-gray-400 flex-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}

                    <div className="bento-item rounded-[2.5rem] bg-zinc-900/80 border border-white/5 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center z-0">
                            <div className="ripple absolute w-24 h-24 border border-indigo-500 rounded-full mix-blend-screen" />
                            <div className="ripple absolute w-24 h-24 border border-blue-400 rounded-full mix-blend-screen" />
                        </div>
                        <Headphones className="w-12 h-12 text-white mb-6 z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
                        <h3 className="text-white text-2xl font-semibold text-center z-10">Enhanced Spatial Audio.</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BentoSpecs;
