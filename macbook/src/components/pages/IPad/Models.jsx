import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const models = [
    { name: 'iPad Pro', desc: 'The ultimate iPad experience with the most advanced technology.', price: 'From $999', accent: 'from-blue-500 to-purple-600' },
    { name: 'iPad Air', desc: 'Serious performance in a thin and light design.', price: 'From $599', accent: 'from-blue-400 to-teal-400' },
    { name: 'iPad', desc: 'The colorful, all-screen iPad for everyday things.', price: 'From $349', accent: 'from-yellow-400 to-pink-500' },
    { name: 'iPad mini', desc: 'The full iPad experience designed to fit in one hand.', price: 'From $499', accent: 'from-purple-400 to-indigo-500' }
];

const Models = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        cardsRef.current.forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }, []);

    return (
        <section className="py-32 bg-black text-white relative">
            <div className="max-w-7xl mx-auto px-6">
                 <div className="mb-20 text-center md:text-left">
                     <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">Explore the line-up.</h2>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref={containerRef}>
                     {models.map((model, idx) => (
                         <div 
                             key={model.name} 
                             ref={el => cardsRef.current[idx] = el}
                             className="group bg-[#111111] rounded-[2rem] p-8 flex flex-col items-center text-center opacity-0 hover:bg-[#1a1a1a] transition-all duration-500 border border-white/5 relative overflow-hidden"
                         >
                             {/* Subtle glow effect on hover */}
                             <div className={`absolute -inset-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl bg-gradient-to-br ${model.accent}`}></div>

                             {/* Placeholder for iPad Image */}
                             <div className="w-full h-56 flex justify-center items-center mb-8 relative z-10">
                                 <div className={`w-[80%] h-[95%] bg-gradient-to-br ${model.accent} rounded-[1.5rem] p-[2px]`}>
                                     <div className="w-full h-full bg-black rounded-[1.4rem] shadow-inner"></div>
                                 </div>
                             </div>

                             <div className="flex flex-col flex-grow items-center w-full z-10">
                                 <h3 className="text-2xl font-semibold mb-3">{model.name}</h3>
                                 <p className="text-[#a1a1a6] mb-8 text-[15px] leading-relaxed flex-grow">{model.desc}</p>
                                 <p className="font-medium text-lg mb-6">{model.price}</p>
                                 
                                 <div className="flex flex-col w-full gap-3 mt-auto">
                                    <button className="bg-white text-black py-2.5 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors w-full">Buy</button>
                                    <button className="text-[#2997ff] hover:text-[#147ce6] transition-colors py-2 text-sm flex items-center justify-center gap-1">
                                        Learn more <span>&gt;</span>
                                    </button>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </section>
    );
};

export default Models;
