import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SliderComparison = () => {
    const containerRef = useRef(null);
    const handleRef = useRef(null);
    const topLayerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    useGSAP(() => {
        gsap.to(".slider-noise-fast", { rotate: 360, duration: 2.5, repeat: -1, ease: "linear", scrollTrigger: { trigger: containerRef.current, toggleActions: "play pause resume pause" } });
        gsap.to(".slider-noise-reverse", { rotate: -360, duration: 4, repeat: -1, ease: "linear", scrollTrigger: { trigger: containerRef.current, toggleActions: "play pause resume pause" } });
    }, { scope: containerRef });

    useEffect(() => {
        const handlePointerMove = (e) => {
            if (!isDragging) return;
            const rect = containerRef.current.getBoundingClientRect();
            let x = e.clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percentage = (x / rect.width) * 100;
            if (handleRef.current) handleRef.current.style.left = `${percentage}%`;
            if (topLayerRef.current) topLayerRef.current.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
        };
        const endDrag = () => setIsDragging(false);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", endDrag); window.addEventListener("pointercancel", endDrag);
        return () => { window.removeEventListener("pointermove", handlePointerMove); window.removeEventListener("pointerup", endDrag); window.removeEventListener("pointercancel", endDrag); };
    }, [isDragging]);

    return (
        <section className="w-full bg-black py-48 px-6 lg:px-0 flex flex-col items-center relative overflow-hidden">
            <h2 className="text-zinc-100 text-5xl md:text-7xl font-bold tracking-tighter mb-20 text-center">Slide to silence.</h2>
            <div ref={containerRef} className="relative w-full max-w-[1200px] h-[60vh] md:h-[80vh] cursor-col-resize select-none overflow-hidden touch-none rounded-[3rem] border border-white/10" onPointerDown={() => setIsDragging(true)}>
                <div className="absolute inset-0 bg-[#141010] flex items-center justify-center pointer-events-none">
                    <div className="slider-noise-fast absolute w-[400px] md:w-[700px] aspect-square border-4 border-dashed border-red-500/40 rounded-full mix-blend-color-dodge" />
                    <div className="slider-noise-reverse absolute w-[300px] md:w-[500px] aspect-square border-[8px] border-dotted border-orange-500/30 rounded-full mix-blend-color-dodge" />
                    <img src="/AP4-2.png" alt="Standard" className="absolute w-[80%] md:w-[60%] lg:w-[45%] object-contain drop-shadow-2xl opacity-80 mix-blend-screen" />
                    <div className="absolute top-6 right-6 md:top-auto md:bottom-12 md:right-12 z-20 flex flex-col items-end">
                        <div className="text-orange-500 font-bold uppercase tracking-widest bg-zinc-900/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-2 rounded-full border border-orange-500/40 text-[10px] md:text-sm shadow-[0_0_30px_rgba(249,115,22,0.2)]">Normal Mode</div>
                        <p className="hidden md:block text-orange-200/50 text-sm mt-3 font-medium bg-black/60 px-4 py-1 rounded-full backdrop-blur-md">Chaotic Background Noise</p>
                    </div>
                </div>
                <div ref={topLayerRef} className="absolute inset-0 bg-[#000000] flex items-center justify-center pointer-events-none will-change-transform z-10" style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}>
                    <div className="absolute w-[300px] md:w-[500px] aspect-square rounded-full bg-cyan-500/10 shadow-[0_0_200px_rgba(6,182,212,0.4)] animate-pulse duration-[3000ms]" />
                    <div className="absolute w-[200px] md:w-[400px] aspect-square rounded-full border border-cyan-400/20" />
                    <img src="/AP4-2.png" alt="ANC" className="absolute w-[80%] md:w-[60%] lg:w-[45%] object-contain drop-shadow-[0_0_80px_rgba(6,182,212,0.2)] scale-105" />
                    <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-20 flex flex-col items-start">
                        <div className="text-cyan-400 font-bold uppercase tracking-widest bg-cyan-950/80 backdrop-blur-md px-4 py-2 md:px-6 md:py-2 rounded-full border border-cyan-500/50 text-[10px] md:text-sm shadow-[0_0_40px_rgba(6,182,212,0.4)]">With ANC</div>
                        <p className="hidden md:block text-cyan-400/70 text-sm mt-3 font-medium bg-black/40 px-4 py-1 rounded-full backdrop-blur-md border border-cyan-500/10">Pure Silence</p>
                    </div>
                </div>
                <div ref={handleRef} className="absolute top-0 bottom-0 w-[2px] bg-white/50 backdrop-blur-sm -translate-x-1/2 flex flex-col justify-center items-center z-50 pointer-events-none transition-shadow shadow-[0_0_20px_#fff]" style={{ left: "50%" }}>
                    <div className="w-10 h-24 bg-zinc-900/90 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center gap-1 shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-auto cursor-grab active:cursor-grabbing">
                        <div className="h-10 w-[2px] bg-zinc-300 rounded-full" /> <div className="h-10 w-[2px] bg-zinc-300 rounded-full" />
                    </div>
                </div>
            </div>
            <p className="text-zinc-500 text-sm md:text-base font-medium mt-10 tracking-widest uppercase opacity-60">Drag to compare environments</p>
        </section>
    );
};

export default SliderComparison;
