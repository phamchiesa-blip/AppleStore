import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import BuyPopup from './BuyPopup';

gsap.registerPlugin(ScrollTrigger);

const ExploreLineup = ({ category, learnMoreBehavior, defaultLearnMoreLink }) => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBuyModel, setSelectedBuyModel] = useState(null); 

    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    cardsRef.current = [];
    
    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/category/${category}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setModels(data);
                } else {
                    console.error(`Invalid data format for ${category}:`, data);
                    setModels([]);
                }
            } catch (error) {
                console.error(`Failed to fetch ${category} models:`, error);
                setModels([]);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, [category]);

    useEffect(() => {
        if (!loading && models.length > 0) {
            const timer = setTimeout(() => {
                cardsRef.current.forEach((card) => {
                    if (card) {
                        gsap.fromTo(card,
                            { opacity: 0, y: 50 },
                            {
                                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                                scrollTrigger: { trigger: card, start: "top 85%", toggleActions: 'play none none reverse' }
                            }
                        );
                    }
                });
                ScrollTrigger.refresh();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [loading, models]);

    const getInternalLink = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('watch series 11')) return '/detailwatchseries11';
        if (lower.includes('watch se')) return '/detailwatchse3';
        if (lower.includes('ultra 3')) return '/detailwatchsultra';
        if (lower.includes('airpods max')) return '/airpods-max';
        if (lower.includes('airpods pro')) return '/airpods-pro';
        if (lower.includes('airpods')) return '/airpods';
        if (lower.includes('tv 4k')) return '/tv4k';
        return '/';
    };

    return (
        <section className="py-32 bg-black text-white relative">
            <div className="max-w-7xl mx-auto px-6">
                 <div className="mb-20 text-center md:text-left flex items-center gap-4">
                     <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">Explore the line-up.</h2>
                     {loading && <div className="w-8 h-8 rounded-full border-2 border-gray-600 border-t-white animate-spin mt-2"></div>}
                 </div>
                 
                 {!loading && models.length === 0 && (
                     <p className="text-gray-400 text-xl">Products are not available right now.</p>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref={containerRef}>
                     {models.map((model) => (
                         <div 
                             key={model.id} 
                             ref={addToRefs}
                             className="group bg-[#111111] rounded-[2rem] p-8 flex flex-col items-center text-center opacity-0 hover:bg-[#1a1a1a] transition-all duration-500 border border-white/5 relative overflow-hidden"
                         >
                             <div className={`absolute -inset-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl bg-gradient-to-br ${model.accent_color || 'from-gray-600 to-gray-800'}`}></div>

                             <div className="w-full h-56 flex justify-center items-center mb-8 relative z-10">
                                 {model.image_url ? (
                                     <img src={model.image_url} alt={model.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                 ) : (
                                     <div className={`w-[80%] h-[95%] bg-gradient-to-br ${model.accent_color || 'from-gray-600 to-gray-800'} rounded-[1.5rem] p-[2px]`}>
                                         <div className="w-full h-full bg-black rounded-[1.4rem] shadow-inner flex items-center justify-center">
                                             <div className="w-2 h-2 rounded-full bg-[#333] absolute top-4"></div>
                                         </div>
                                     </div>
                                 )}
                             </div>

                             <div className="flex flex-col flex-grow items-center w-full z-10">
                                 <h3 className="text-2xl font-semibold mb-3">{model.name}</h3>
                                 <p className="text-[#a1a1a6] mb-8 text-[15px] leading-relaxed flex-grow">{model.description}</p>
                                 <p className="font-medium text-lg mb-6">{model.price_string}</p>
                                 
                                 <div className="flex flex-col w-full gap-3 mt-auto">
                                    <button 
                                        onClick={() => setSelectedBuyModel(model)}
                                        className="bg-white text-black py-2.5 px-6 rounded-full font-medium hover:bg-gray-200 cursor-pointer transition-colors w-full"
                                    >
                                        Buy
                                    </button>
                                    
                                    {learnMoreBehavior === 'external' ? (
                                        <a 
                                            href={defaultLearnMoreLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#2997ff] hover:text-[#147ce6] transition-colors py-2 text-sm flex items-center justify-center gap-1 cursor-pointer"
                                        >
                                            Learn more <span>&gt;&gt;</span>
                                        </a>
                                    ) : (
                                        <Link 
                                            to={getInternalLink(model.name)}
                                            className="text-[#2997ff] hover:text-[#147ce6] transition-colors py-2 text-sm flex items-center justify-center gap-1 cursor-pointer"
                                        >
                                            Learn more <span>&gt;&gt;</span>
                                        </Link>
                                    )}
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>

            <BuyPopup 
                isOpen={!!selectedBuyModel} 
                onClose={() => setSelectedBuyModel(null)} 
                product={selectedBuyModel} 
            />
        </section>
    );
};

export default ExploreLineup;
