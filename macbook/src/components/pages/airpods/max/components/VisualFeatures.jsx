import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { airpodsMaxData } from "../../../../../constants/airpodsData.jsx";

const VisualFeatures = () => {
    const sectionRef = useRef(null);
    const circuitRef = useRef(null);
    const wavesRef = useRef(null);
    const ancRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(".circuit-path",
            { strokeDasharray: 300, strokeDashoffset: 300 },
            { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut", scrollTrigger: { trigger: circuitRef.current, start: "top 70%" } }
        );
        gsap.to(".chip-core", {
            boxShadow: "0 0 50px 15px rgba(16, 185, 129, 0.4)", backgroundColor: "rgba(16, 185, 129, 0.2)",
            duration: 1.5, yoyo: true, repeat: -1, ease: "sine.inOut", scrollTrigger: { trigger: circuitRef.current, start: "top 70%" }
        });

        gsap.to(".sound-wave", {
            scale: 3, opacity: 0, duration: 2, stagger: 0.6, repeat: -1, ease: "circ.out",
            scrollTrigger: { trigger: wavesRef.current, start: "top 70%" }
        });

        const particles = gsap.utils.toArray(".particle");
        particles.forEach((p, i) => {
            gsap.fromTo(p,
                { x: (i % 2 === 0 ? -150 : 150), y: gsap.utils.random(-150, 150), opacity: 0, scale: gsap.utils.random(0.5, 1.5) },
                {
                    x: (i % 2 === 0 ? -40 : 40), y: "random(-20, 20)", opacity: 1, duration: gsap.utils.random(1.5, 2.5), ease: "power1.in",
                    scrollTrigger: { trigger: ancRef.current, start: "top 80%" },
                    onComplete: function () {
                        const shatter = () => {
                            gsap.to(p, {
                                opacity: 0, scale: 0, duration: 0.2, ease: "power2.out", onComplete: () => {
                                    gsap.fromTo(p,
                                        { x: (i % 2 === 0 ? -150 : 150), y: gsap.utils.random(-150, 150), opacity: 0, scale: gsap.utils.random(0.5, 1.5) },
                                        { x: (i % 2 === 0 ? -40 : 40), y: "random(-20, 20)", opacity: 1, duration: gsap.utils.random(1.5, 2.5), ease: "power1.in", onComplete: shatter }
                                    );
                                }
                            });
                        };
                        shatter();
                    }
                }
            );
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full bg-black py-32 px-6 md:px-12 lg:px-24 border-t border-zinc-900 z-10 relative">
            <div className="max-w-[1200px] mx-auto space-y-32">
                {/* H2 Chip */}
                <div ref={circuitRef} className="flex flex-col md:flex-row items-center gap-16 justify-between">
                    <div className="flex-1 space-y-6">
                        <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm">H2 Silicon</p>
                        <h3 className="text-white text-4xl md:text-5xl font-bold">A powerful mind<br />for sound.</h3>
                        <p className="text-gray-400 text-lg max-w-md">{airpodsMaxData.teardown[2].desc}</p>
                    </div>
                    <div className="flex-1 relative h-64 w-full flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full opacity-40 z-0" viewBox="0 0 400 200" preserveAspectRatio="none">
                            <path className="circuit-path" d="M0,100 L150,100 L180,60 L220,60" fill="none" stroke="#10b981" strokeWidth="3" />
                            <path className="circuit-path" d="M400,100 L250,100 L220,140 L180,140" fill="none" stroke="#10b981" strokeWidth="3" />
                            <path className="circuit-path" d="M50,30 L120,30 L160,80 L200,80" fill="none" stroke="#10b981" strokeWidth="1.5" />
                            <path className="circuit-path" d="M350,170 L280,170 L240,120 L200,120" fill="none" stroke="#10b981" strokeWidth="1.5" />
                        </svg>
                        <div className="chip-core z-10 w-24 h-24 bg-zinc-900 border border-emerald-500/50 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-emerald-500/10" />
                            <span className="text-emerald-400 font-black text-2xl z-10">H2</span>
                        </div>
                    </div>
                </div>

                <hr className="border-white/10" />

                {/* 50mm Driver */}
                <div ref={wavesRef} className="flex flex-col md:flex-row-reverse items-center gap-16 justify-between">
                    <div className="flex-1 space-y-6">
                        <p className="text-purple-400 font-bold tracking-widest uppercase text-sm">Custom Driver</p>
                        <h3 className="text-white text-4xl md:text-5xl font-bold">Uncompromising<br />fidelity.</h3>
                        <p className="text-gray-400 text-lg max-w-md">{airpodsMaxData.teardown[1].desc}</p>
                    </div>
                    <div className="flex-1 relative h-80 w-full flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center z-0">
                            <div className="sound-wave absolute w-24 h-24 rounded-full border border-purple-500" />
                            <div className="sound-wave absolute w-24 h-24 rounded-full border border-purple-400" />
                            <div className="sound-wave absolute w-24 h-24 rounded-full border border-pink-500" />
                        </div>
                        <div className="z-10 w-40 h-40 rounded-full bg-gradient-to-br from-zinc-800 to-black border-4 border-zinc-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-[#121212] shadow-inner border border-white/5" />
                        </div>
                    </div>
                </div>

                <hr className="border-white/10" />

                {/* ANC */}
                <div ref={ancRef} className="flex flex-col md:flex-row items-center gap-16 justify-between">
                    <div className="flex-1 space-y-6">
                        <p className="text-blue-400 font-bold tracking-widest uppercase text-sm">Active Noise Cancellation</p>
                        <h3 className="text-white text-4xl md:text-5xl font-bold">Immersive<br />silence.</h3>
                        <p className="text-gray-400 text-lg max-w-md">{airpodsMaxData.anc.desc}</p>
                    </div>
                    <div className="flex-1 relative h-80 w-full flex items-center justify-center overflow-hidden">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className="particle absolute w-2 h-2 bg-blue-500 rounded-full blur-[1px] opacity-0" />
                        ))}
                        <div className="z-10 w-48 h-48 rounded-full border-2 border-blue-500/30 bg-blue-900/10 backdrop-blur-md flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.15)] relative">
                            <span className="text-blue-400 font-bold tracking-widest text-2xl">ANC</span>
                            <div className="absolute inset-[-15px] rounded-full border border-blue-500/20" />
                            <div className="absolute inset-[15px] rounded-full border border-blue-500/10" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisualFeatures;
