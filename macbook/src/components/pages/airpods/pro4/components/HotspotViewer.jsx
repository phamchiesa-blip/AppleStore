import React, { useRef, useState } from "react";
import gsap from "gsap";

const HotspotViewer = () => {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const [activeSpot, setActiveSpot] = useState(null);

    const hotspots = [
        { id: 1, x: 29, y: 15, title: "Acoustic Architecture", desc: "Redesigned vents equalizes pressure for maximum comfort across different ear shapes.", origin: "29% 15%", tooltipPos: "left-full ml-8 md:ml-12 top-1/2 -translate-y-1/2" },
        { id: 2, x: 55, y: 70, title: "Force Sensor", desc: "Precise control with a simple pinch on the stem to play music or answer calls.", origin: "55% 70%", tooltipPos: "right-full mr-8 md:mr-12 top-1/2 -translate-y-1/2" },
        { id: 3, x: 45, y: 40, title: "H2 Silicon", desc: "Located directly behind the driver, computing audio adjustments 48,000 times a second.", origin: "45% 40%", tooltipPos: "left-full ml-8 md:ml-12 top-1/2 -translate-y-1/2" },
    ];

    const handleDotClick = (spot) => {
        if (activeSpot?.id === spot.id) {
            gsap.to(imgRef.current, { scale: 1, duration: 1, ease: "power3.inOut" });
            setActiveSpot(null);
        } else {
            setActiveSpot(spot);
            gsap.to(imgRef.current, { transformOrigin: spot.origin, scale: 2.8, duration: 1.2, ease: "power3.inOut" });
        }
    };

    return (
        <section ref={containerRef} className="w-full bg-black py-32 relative overflow-hidden flex flex-col items-center min-h-[120vh]">
            <div className="text-center z-20 mb-20 px-6">
                <h2 className="text-zinc-100 text-4xl md:text-6xl font-black tracking-tighter mb-4">Discover the details.</h2>
                <p className="text-zinc-500 text-xl font-medium tracking-tight">Click highlighted zones to explore specific hardware.</p>
            </div>
            <div className="relative w-[85%] md:w-[600px] lg:w-[800px] h-auto z-10 perspective-[1000px]">
                <div className="w-full h-full transform-style-[preserve-3d]">
                    <div ref={imgRef} className="relative w-full h-auto will-change-transform transform-gpu">
                        <img src="/AP-4-1.png" alt="Zoomable Map" className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(255,255,255,0.05)]" />
                        {hotspots.map((spot) => (
                            <div key={spot.id} className="absolute w-3 h-3 md:w-4 md:h-4 -translate-x-1/2 -translate-y-1/2 z-20" style={{ left: `${spot.x}%`, top: `${spot.y}%` }}>
                                <div className={`absolute inset-0 rounded-full cursor-pointer transition-colors duration-300 ${activeSpot?.id === spot.id ? 'bg-white shadow-[0_0_20px_#fff]' : 'bg-red-500 shadow-[0_0_15px_#ef4444]'}`} onClick={() => handleDotClick(spot)}>
                                    <div className={`absolute inset-0 bg-red-500 rounded-full animate-ping opacity-70 ${activeSpot?.id === spot.id ? 'hidden' : 'block'}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {activeSpot && (
                    <div className="absolute z-50 flex items-center justify-center pointer-events-none" style={{ left: `${activeSpot.x}%`, top: `${activeSpot.y}%` }}>
                        <div className={`absolute ${activeSpot.tooltipPos} w-[220px] md:w-[320px] p-6 bg-zinc-900/95 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] pointer-events-auto animate-in fade-in zoom-in duration-500`}>
                            <h4 className="text-white font-bold text-lg md:text-2xl mb-2 tracking-tight leading-tight">{activeSpot.title}</h4>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{activeSpot.desc}</p>
                            <button className="mt-5 w-full bg-white text-black font-bold py-3 rounded-full hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all" onClick={() => handleDotClick(activeSpot)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            <div className={`absolute inset-0 z-0 bg-black/80 pointer-events-none transition-opacity duration-1000 ${activeSpot ? 'opacity-100' : 'opacity-0'}`} />
        </section>
    );
};

export default HotspotViewer;
