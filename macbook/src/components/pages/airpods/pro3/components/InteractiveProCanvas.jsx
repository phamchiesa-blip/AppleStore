import React, { useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Waves } from "lucide-react";

gsap.registerPlugin(MotionPathPlugin);

const InteractiveProCanvas = () => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);

    const [mousePos, setMousePos] = useState({ left: { x: 50, y: 50 }, right: { x: 50, y: 50 } });

    const handleMouseMove = (e, side) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos(prev => ({ ...prev, [side]: { x, y } }));
    };

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=4000",
                    scrub: 1,
                    pin: true,
                }
            });

            const vw = window.innerWidth;
            const vh = window.innerHeight;

            gsap.set(".pod-wrap", { opacity: 0, scale: 0.2, y: vh * 0.3 });
            gsap.set(".case-lid", { rotationX: 0 });

            gsap.to(".wave-circle", {
                scale: 1.1, opacity: 0.5, duration: 2, yoyo: true, repeat: -1, ease: "sine.inOut"
            });

            tl.to(".case-lid", { rotationX: -120, duration: 0.5, ease: "power2.in" })
                .to(".status-light", { backgroundColor: "#10b981", boxShadow: "0 0 10px #10b981" }, "<")
                .to("#pod-left", {
                    motionPath: {
                        path: [{ x: 0, y: vh * 0.3 }, { x: -vw * 0.1, y: 0 }, { x: -vw * 0.25, y: -vh * 0.1 }],
                        curviness: 1.5
                    },
                    scale: 1, opacity: 1, rotation: -15, duration: 2, ease: "power2.out"
                }, "fly")
                .to("#pod-right", {
                    motionPath: {
                        path: [{ x: 0, y: vh * 0.3 }, { x: vw * 0.1, y: 0 }, { x: vw * 0.25, y: -vh * 0.1 }],
                        curviness: 1.5
                    },
                    scale: 1, opacity: 1, rotation: 15, duration: 2, ease: "power2.out"
                }, "fly")
                .to(".hero-text", { opacity: 0, y: -50, duration: 1 }, "fly")
                .to(".case-wrapper", { y: vh, opacity: 0, duration: 2, ease: "power2.in" }, "fly+=0.5");

            tl.to(".wave-circle", {
                strokeWidth: (i) => 20 + i * 5,
                stroke: "#3b82f6",
                r: (i) => 300 + i * 80,
                opacity: 0.8, duration: 2, ease: "power2.out"
            }, "anc")
                .to(".anc-text-block", { opacity: 1, y: 0, duration: 1 }, "anc");

            tl.to(".wave-circle", { duration: 1 });

            tl.to(".anc-text-block", { opacity: 0, y: -50, duration: 1 }, "spatial")
                .to(".wave-container", {
                    rotateX: 75, scale: 1.5, duration: 2, ease: "power2.inOut"
                }, "spatial")
                .to(".wave-circle", {
                    strokeWidth: 2, stroke: "#8b5cf6", opacity: 0.6, stagger: 0.1, duration: 2
                }, "spatial")
                .to(".spatial-text-block", { opacity: 1, y: 0, duration: 1 }, "spatial+=1");

            gsap.to(".wave-container", { rotationZ: 360, duration: 30, repeat: -1, ease: "linear" });

            timelineRef.current = tl;
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden perspective-[1000px]">
            <div className="wave-container absolute inset-0 flex items-center justify-center -z-10 transform-style-[preserve-3d]">
                <svg className="w-[1000px] h-[1000px] overflow-visible" viewBox="0 0 1000 1000">
                    {[...Array(8)].map((_, i) => (
                        <circle key={i} className="wave-circle" cx="500" cy="500" r={100 + i * 60} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                    ))}
                </svg>
            </div>

            <div className="hero-text absolute inset-x-0 top-32 flex flex-col items-center pointer-events-none z-10">
                <h1 className="text-white text-5xl md:text-8xl font-black tracking-tighter text-center">Magical.</h1>
                <p className="text-zinc-400 text-lg md:text-2xl mt-4">Scroll to release.</p>
            </div>

            <div className="anc-text-block absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 translate-y-10 z-10 px-6">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                    <Waves className="w-4 h-4" /> Active Noise Cancellation
                </div>
                <h2 className="text-white text-4xl md:text-7xl font-bold leading-tight text-center max-w-4xl">Build a wall<br />of silence.</h2>
            </div>

            <div className="spatial-text-block absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0 translate-y-10 z-30 px-6">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                    Personalized Spatial Audio
                </div>
                <h2 className="text-white text-4xl md:text-7xl font-bold leading-tight text-center max-w-4xl">Sound all around.<br />And then some.</h2>
            </div>

            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="case-wrapper absolute inset-0 flex items-center justify-center mt-64">
                    <div className="relative w-48 h-32 bg-gradient-to-b from-white to-zinc-300 rounded-[3rem] shadow-[0_20px_50px_rgba(255,255,255,0.15)] border-b-8 border-zinc-400 flex flex-col items-center justify-start perspective-[500px]">
                        <div className="case-lid absolute inset-x-0 top-0 h-10 border-b border-zinc-400 bg-gradient-to-t from-white to-zinc-100 rounded-t-[3rem] origin-bottom will-change-transform z-10" />
                        <div className="w-[80%] h-4 bg-zinc-900 rounded-full mt-4 shadow-inner" />
                        <div className="status-light w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316] mt-4 transition-colors duration-500" />
                    </div>
                </div>

                <div id="pod-left" className="pod-wrap absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-auto cursor-crosshair group" onMouseMove={(e) => handleMouseMove(e, 'left')}>
                    <div className="relative w-32 md:w-64 h-auto aspect-square">
                        <img src="/images/airpods_pro3_earbud_left.png" alt="Left" className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] z-10 duration-700 transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 z-20 w-[60%] h-[60%] left-[20%] top-[20%] rounded-[3rem] bg-zinc-900/90 backdrop-blur-xl border-2 border-emerald-500/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-90"
                            style={{
                                maskImage: `radial-gradient(circle 50px at ${mousePos.left.x}% ${mousePos.left.y}%, black 50%, transparent 100%)`,
                                WebkitMaskImage: `radial-gradient(circle 50px at ${mousePos.left.x}% ${mousePos.left.y}%, black 50%, transparent 100%)`
                            }}
                        >
                            <div className="w-[70%] h-2 bg-emerald-500 rounded-full mb-4 shadow-[0_0_10px_#10b981] animate-pulse" />
                            <div className="w-[50%] h-[30%] border border-emerald-400 bg-emerald-900/50 rounded-lg flex items-center justify-center">
                                <span className="text-emerald-400 font-bold text-[10px]">H2</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="pod-right" className="pod-wrap absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-auto cursor-crosshair group" onMouseMove={(e) => handleMouseMove(e, 'right')}>
                    <div className="relative w-32 md:w-64 h-auto aspect-square">
                        <img src="/images/airpods_pro3_earbud_right.png" alt="Right" className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] z-10 duration-700 transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 z-20 w-[60%] h-[60%] left-[20%] top-[20%] rounded-[3rem] bg-zinc-900/90 backdrop-blur-xl border-2 border-emerald-500/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none scale-90"
                            style={{
                                maskImage: `radial-gradient(circle 50px at ${mousePos.right.x}% ${mousePos.right.y}%, black 50%, transparent 100%)`,
                                WebkitMaskImage: `radial-gradient(circle 50px at ${mousePos.right.x}% ${mousePos.right.y}%, black 50%, transparent 100%)`
                            }}
                        >
                            <div className="w-[70%] h-2 bg-emerald-500 rounded-full mb-4 shadow-[0_0_10px_#10b981] animate-pulse delay-100" />
                            <div className="w-[50%] h-[30%] border border-emerald-400 bg-emerald-900/50 rounded-lg flex items-center justify-center">
                                <span className="text-emerald-400 font-bold text-[10px]">H2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-8 right-8 z-50 pointer-events-none">
                <p className="text-emerald-400/80 font-mono text-xs uppercase tracking-widest border border-emerald-500/30 px-3 py-1 rounded-full bg-emerald-900/10">Hover to X-Ray</p>
            </div>
        </section>
    );
};

export default InteractiveProCanvas;
