import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { airpodsProData } from "../../../../../constants/airpodsData.jsx";
import { Sparkles } from "lucide-react";

// ─── Minigraph 1: Health / Body Temp ───────────────────────────────────────
const HealthGraph = ({ isActive }) => {
    const thermRef = useRef(null);
    useGSAP(() => {
        if (!isActive) return;
        const tl = gsap.timeline();
        tl.fromTo(".therm-mercury", { yPercent: 100 }, { yPercent: 10, duration: 2, ease: "power2.out" });
        tl.fromTo(".therm-glow", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 1, ease: "bounce.out" }, "-=0.5");
    }, [isActive]);
    return (
        <div ref={thermRef} className="w-full h-full flex items-center justify-center">
            <div className="relative w-20 h-72 border-[6px] border-zinc-800 rounded-full p-2 bg-black overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.1)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-blue-500 via-orange-400 to-red-500 therm-mercury translate-y-full rounded-full" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full z-10" />
                <div className="therm-glow absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-red-500 rounded-full blur-[15px] opacity-0 z-0" />
                <div className="absolute left-3 top-10 bottom-16 flex flex-col justify-between py-2 z-20">
                    {[...Array(10)].map((_, i) => (<div key={i} className="w-3 h-0.5 bg-white/40" />))}
                </div>
            </div>
        </div>
    );
};

// ─── Minigraph 2: Adaptive Audio ───────────────────────────────────────────
const AdaptiveAudioGraph = ({ isActive }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.to(".orb-amber", { x: "random(-50, 50)", y: "random(-50, 50)", scale: "random(1, 1.5)", duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".orb-blue", { x: "random(-50, 50)", y: "random(-50, 50)", scale: "random(1, 1.5)", duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
        if (isActive) {
            gsap.to(".orb-amber, .orb-blue", { opacity: 0.4, duration: 1.5 });
        } else {
            gsap.to(".orb-amber, .orb-blue", { opacity: 0.1, duration: 1 });
        }
    }, { scope: containerRef, dependencies: [isActive] });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;
        const particles = Array.from({ length: 40 }, () => ({ x: Math.random() * 400, y: Math.random() * 250, vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2, size: Math.random() * 2 + 1 }));
        const state = { noise: 1 };
        gsap.to(state, { noise: isActive ? 0 : 1, duration: 2, ease: "power2.inOut" });

        const draw = () => {
            time += 0.05;
            const { width: w, height: h } = canvas;
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            particles.forEach(p => {
                const chaos = state.noise * 5;
                p.x += p.vx * state.noise + (Math.random() - 0.5) * chaos;
                p.y += p.vy * state.noise + (Math.random() - 0.5) * chaos;
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
                ctx.globalAlpha = state.noise * 0.3;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
            });
            ctx.lineWidth = 3;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                const r = 245, g = 158 + (isActive ? -76 : 0), b = 11 + (isActive ? 235 : 0);
                ctx.strokeStyle = `rgba(${r},${g},${b}, 1)`;
                ctx.globalAlpha = 1 - i * 0.3;
                for (let x = 0; x <= w; x += 2) {
                    const freq = 0.02 + i * 0.01;
                    const amp = (30 + i * 10) * (1 - state.noise * 0.5);
                    const y = h / 2 + Math.sin(x * freq + time + i) * amp + (Math.random() - 0.5) * 40 * state.noise;
                    if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            animationFrameId = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isActive]);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="orb-amber absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="orb-blue absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 w-full flex flex-col items-center">
                <canvas ref={canvasRef} width={400} height={250} className="w-full h-auto drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]" />
                <div className={`mt-8 flex items-center gap-2 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <Sparkles size={16} className="text-amber-400" />
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest leading-none">Intelligent Mixing Active</p>
                </div>
            </div>
        </div>
    );
};

// ─── Minigraph 3: Conversation Awareness ────────────────────────────────────
const ConversationGraph = ({ isActive }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;
        const state = { intensity: 0 };
        if (isActive) gsap.to(state, { intensity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" });
        else gsap.to(state, { intensity: 0, duration: 1, ease: "power2.out" });

        const render = () => {
            time += 0.05;
            const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2;
            ctx.clearRect(0, 0, w, h);
            for (let x = 30; x < w; x += 25) {
                for (let y = 30; y < h; y += 25) {
                    const dx = x - cx, dy = y - cy, dist = Math.sqrt(dx * dx + dy * dy);
                    const repulsion = Math.max(0, 100 - dist) * state.intensity;
                    const angle = Math.atan2(dy, dx);
                    const px = x + Math.cos(angle) * repulsion, py = y + Math.sin(angle) * repulsion;
                    const isCenter = dist < 50;
                    const radius = isCenter ? (2 + Math.sin(time * 5) * 2) * state.intensity + 2 : 2;
                    ctx.beginPath(); ctx.arc(px, py, radius, 0, Math.PI * 2);
                    ctx.fillStyle = isCenter ? `rgba(168, 85, 247, ${state.intensity})` : `rgba(255, 255, 255, ${Math.max(0.1, 1 - repulsion/50)*0.3})`;
                    ctx.fill();
                }
            }
            animationFrameId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isActive]);
    return (
        <div className="w-full h-full flex items-center justify-center p-8 relative bg-zinc-900/40">
            <canvas ref={canvasRef} width={400} height={300} className="w-full h-auto z-10" />
        </div>
    );
};

// ─── Minigraph 4: Touch/Force Sensor ───────────────────────────────────────
const TouchGraph = ({ isActive }) => {
    const canvasRef = useRef(null);
    const pointer = useRef({ x: 100, y: 150, targetY: 150 });

    const handlePointerMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        pointer.current.targetY = ((e.clientY - rect.top) / rect.height) * canvasRef.current.height;
    };
    const handlePointerLeave = () => { pointer.current.targetY = canvasRef.current.height / 2; };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        if (isActive) gsap.fromTo(pointer.current, { targetY: 50 }, { targetY: 250, duration: 2, ease: "sine.inOut", yoyo: true, repeat: 1 });

        const render = () => {
            const { width: w, height: h } = canvas;
            ctx.fillStyle = 'rgba(24, 24, 27, 0.2)'; ctx.fillRect(0, 0, w, h);
            pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.1;
            ctx.fillStyle = '#3f3f46'; ctx.beginPath(); ctx.roundRect(w / 2 - 20, 20, 40, h - 40, 20); ctx.fill();
            ctx.beginPath(); ctx.arc(w / 2, pointer.current.y, 15, 0, Math.PI * 2); ctx.fillStyle = '#10b981'; ctx.shadowBlur = 30; ctx.shadowColor = '#10b981'; ctx.fill(); ctx.shadowBlur = 0;
            ctx.beginPath(); ctx.moveTo(w / 2, pointer.current.y - 20); ctx.lineTo(w / 2, pointer.current.y + 20); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.strokeStyle = '#ffffff'; ctx.stroke();
            animationFrameId = requestAnimationFrame(render);
        };
        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isActive]);

    return (
        <div className="w-full h-full flex items-center justify-center p-8 relative bg-zinc-900/40">
            <div className="absolute top-4 left-0 w-full text-center pointer-events-none z-20">
                <span className="text-emerald-500/70 text-xs font-mono uppercase tracking-widest animate-pulse">Swipe Up/Down</span>
            </div>
            <canvas ref={canvasRef} width={200} height={300} className="w-auto h-[80%] cursor-ns-resize z-10 touch-none" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} />
        </div>
    );
};

// ─── SpecPager ──────────────────────────────────────────────────────────────
const SpecPager = () => {
    const containerRef = useRef(null);
    const pinWrapperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useGSAP(() => {
        ScrollTrigger.create({ trigger: containerRef.current, start: "top top", end: "bottom bottom", pin: pinWrapperRef.current, pinSpacing: false });
        const triggers = gsap.utils.toArray('.spec-trigger-block');
        triggers.forEach((trigger, i) => {
            ScrollTrigger.create({ trigger: trigger, start: "top 50%", end: "bottom 50%", onEnter: () => setActiveIndex(i), onEnterBack: () => setActiveIndex(i) });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full bg-[#0a0a0a] px-6 md:px-12 lg:px-24">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start gap-12 lg:gap-24 relative">
                <div className="flex-1 w-full space-y-[50vh] pb-[50vh] pt-[30vh]">
                    {airpodsProData.specs.map((spec, i) => (
                        <div key={i} className={`spec-trigger-block space-y-6 transition-opacity duration-500 ${activeIndex === i ? 'opacity-100' : 'opacity-30'}`}>
                            <div className={`p-4 rounded-2xl ${spec.bg} inline-block ${spec.color}`}>{spec.icon}</div>
                            <h3 className="text-white text-4xl md:text-6xl font-bold tracking-tight">{spec.title}</h3>
                            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg">{spec.desc}</p>
                        </div>
                    ))}
                </div>
                <div ref={pinWrapperRef} className="flex-1 w-full h-screen flex items-center justify-center pointer-events-none">
                    <div className="w-full h-[65vh] md:h-[70vh] pointer-events-auto relative flex items-center justify-center bg-zinc-900/30 rounded-[3.5rem] border border-white/5 backdrop-blur-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${activeIndex === 0 ? 'opacity-100 z-10 scale-100' : 'opacity-0 -z-10 scale-95'}`}><HealthGraph isActive={activeIndex === 0} /></div>
                        <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${activeIndex === 1 ? 'opacity-100 z-10 scale-100' : 'opacity-0 -z-10 scale-95'}`}><AdaptiveAudioGraph isActive={activeIndex === 1} /></div>
                        <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${activeIndex === 2 ? 'opacity-100 z-10 scale-100' : 'opacity-0 -z-10 scale-95'}`}><ConversationGraph isActive={activeIndex === 2} /></div>
                        <div className={`absolute inset-0 transition-all duration-700 ease-in-out ${activeIndex === 3 ? 'opacity-100 z-10 scale-100' : 'opacity-0 -z-10 scale-95'}`}><TouchGraph isActive={activeIndex === 3} /></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecPager;
