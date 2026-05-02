import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Cable, Droplets, Fingerprint } from "lucide-react";

const DynamicBentoGrid = () => {
    const sectionRef = useRef(null);
    useGSAP(() => {
        gsap.fromTo(".usb-cable", { y: 80, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power2.out", stagger: 0,
            scrollTrigger: { trigger: ".bento-usb", toggleActions: "play pause resume pause" },
            onComplete: function () {
                gsap.to(".usb-glow", { opacity: 1, scale: 1.5, duration: 0.5, yoyo: true, repeat: 1 });
                gsap.to(".usb-cable", { y: 80, opacity: 0, duration: 1, ease: "power2.in", delay: 1, onComplete: () => this.restart() });
            }
        });
        gsap.to(".stem-core", {
            scaleX: 0.6, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut",
            scrollTrigger: { trigger: ".bento-stem", toggleActions: "play pause resume pause" },
            onComplete: function () {
                gsap.fromTo(".stem-ripple", { scale: 0.2, opacity: 1 }, { scale: 3, opacity: 0, duration: 1, ease: "power2.out" });
                gsap.delayedCall(1.5, () => this.restart());
            }
        });
        gsap.to(".bento-splash", {
            y: 0, scaleY: 1, opacity: 1, duration: 0.4, ease: "power1.in",
            scrollTrigger: { trigger: ".bento-ip54", toggleActions: "play pause resume pause" },
            onComplete: function () {
                gsap.to(".bento-splash", {
                    scaleY: 0.3, scaleX: 1.5, duration: 0.1, y: 10, ease: "power2.out", onComplete: () => {
                        gsap.to(".bento-splash", {
                            y: -50, scaleY: 1.2, scaleX: 0.8, opacity: 0, duration: 0.5, ease: "power1.out", onComplete: () => {
                                gsap.set(".bento-splash", { y: -80, opacity: 1 });
                                gsap.delayedCall(1, () => this.restart());
                            }
                        });
                    }
                });
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="w-full bg-black pb-48 px-6 md:px-12 lg:px-24">
            <div className="max-w-[1200px] mx-auto border-t border-white/[0.05] pt-32">
                <h2 className="text-zinc-100 text-5xl md:text-7xl font-bold mb-20 tracking-tighter">Dynamic features.</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bento-usb group md:col-span-2 relative bg-zinc-900/40 border border-white/[0.05] rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden backdrop-blur-2xl hover:bg-zinc-800/60 transition-colors duration-500 min-h-[350px] md:min-h-[450px] flex flex-col justify-between">
                        <div className="absolute right-6 top-6 md:right-24 md:top-24 w-24 h-36 md:w-32 md:h-48 border-[6px] border-zinc-800 rounded-3xl flex items-end justify-center pb-4 z-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] overflow-hidden bg-black/50">
                            <div className="usb-cable w-12 h-16 md:w-16 md:h-24 bg-zinc-300 rounded-t-xl relative border-t-8 border-zinc-400">
                                <div className="absolute top-2 w-full h-1 bg-zinc-400/50" />
                                <div className="absolute -bottom-16 md:-bottom-24 left-1/2 -translate-x-1/2 w-6 h-16 md:w-8 md:h-24 bg-zinc-400" />
                            </div>
                            <div className="usb-glow absolute w-full h-full bg-blue-500/10 opacity-0 z-10" />
                        </div>
                        <div className="relative z-10 w-[55%] md:w-[50%] lg:w-[60%]">
                            <Cable className="w-8 h-8 md:w-10 md:h-10 text-zinc-400 mb-4 md:mb-6 drop-shadow-md" />
                            <h3 className="text-zinc-100 text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 tracking-tight">USB-C Charging</h3>
                            <p className="text-zinc-500 text-base md:text-xl lg:text-2xl max-w-sm">Universal connectivity for all your Apple devices. Fast and robust.</p>
                        </div>
                    </div>
                    <div className="bento-stem group md:col-span-1 relative bg-zinc-900/40 border border-white/[0.05] rounded-[3rem] p-12 lg:p-16 overflow-hidden backdrop-blur-2xl hover:bg-zinc-800/60 transition-colors duration-500 min-h-[350px] md:min-h-[450px] flex flex-col justify-between items-center text-center">
                        <div className="relative z-0 h-40 w-full flex items-center justify-center mt-4">
                            <div className="stem-ripple absolute w-8 h-8 border border-white/50 rounded-full opacity-0 pointer-events-none" />
                            <div className="stem-core w-6 h-32 bg-zinc-300 rounded-b-full rounded-t-xl flex items-center justify-center shadow-[inset_-3px_0_10px_rgba(0,0,0,0.5)] z-10">
                                <div className="w-[3px] h-[50%] bg-zinc-400 rounded-full mr-1 opacity-50" />
                            </div>
                        </div>
                        <div className="relative z-10 flex flex-col items-center mt-auto w-full">
                            <Fingerprint className="w-8 h-8 text-zinc-400 mb-4" />
                            <h3 className="text-zinc-100 text-3xl font-bold mb-3 tracking-tight">Force Sensor</h3>
                            <p className="text-zinc-500 text-lg">Intuitive pinch controls.</p>
                        </div>
                    </div>
                    <div className="bento-ip54 group md:col-span-3 relative bg-zinc-900/40 border border-white/[0.05] rounded-[3rem] p-12 py-16 lg:py-24 overflow-hidden backdrop-blur-2xl hover:bg-zinc-800/60 transition-colors duration-500 flex flex-col items-center text-center">
                        <div className="relative z-0 h-40 w-full flex items-end justify-center mb-10 overflow-hidden">
                            <svg className="bento-splash absolute top-0 w-12 h-14 text-cyan-400 z-20 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12,21c-4.4,0-8-3.6-8-8c0-3.8,5.1-10.4,6.7-12.4c0.7-0.9,2-0.9,2.6,0C14.9,2.6,20,9.2,20,13C20,17.4,16.4,21,12,21z" />
                            </svg>
                            <div className="w-64 h-24 bg-gradient-to-t from-cyan-900/20 to-transparent border-t border-cyan-500/20 rounded-t-[50%] shadow-[inset_0_10px_30px_rgba(34,211,238,0.05)]" />
                        </div>
                        <div className="relative z-10">
                            <Droplets className="w-12 h-12 text-zinc-400/50 mx-auto mb-6" />
                            <h3 className="text-zinc-100 text-5xl md:text-6xl font-bold mb-6 tracking-tighter">IP54 Rating</h3>
                            <p className="text-zinc-500 text-xl lg:text-2xl max-w-2xl mx-auto">Dust, sweat, and water resistant for absolute reliability anywhere you go in the entire world.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DynamicBentoGrid;
