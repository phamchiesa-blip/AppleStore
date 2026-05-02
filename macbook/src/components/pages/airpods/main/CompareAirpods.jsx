import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import BuyPopup from "../../../BuyPopup";

gsap.registerPlugin(ScrollTrigger);

const CompareAirpods = () => {
    const sectionRef = useRef(null);
    const [buyState, setBuyState] = useState({ product: null, img: null });
    const [dbProducts, setDbProducts] = useState({});

    const openBuy = (key, img) => {
        const product = dbProducts[key.toLowerCase()] || null;
        setBuyState({ product, img });
    };

    const products = [
        {
            name: "AirPods 4",
            dbKey: "airpods",
            img: "/AP-4-1.png",
            tagline: "Breakthrough audio and comfort.",
            price: "$129.00",
            iconDesc: "—",
            desc: "No Active Noise Cancellation",
        },
        {
            name: "AirPods 4",
            dbKey: "airpods",
            sub: "Active Noise Cancellation",
            img: "/AP4-2.png",
            tagline: "Breakthrough audio, comfort, and noise control.",
            price: "$179.00",
            iconDesc: "Active Noise Cancellation",
            desc: "Adaptive Audio and Transparency mode",
        },
        {
            name: "AirPods Pro 3",
            dbKey: "airpods pro",
            img: "/AP-3.png",
            tagline: "Active Noise Cancellation you've never heard before.",
            price: "$249.00",
            iconDesc: "Active Noise Cancellation",
            desc: "Up to 4x more effective noise cancellation",
        },
        {
            name: "AirPods Max 2",
            dbKey: "airpods max",
            isNew: true,
            img: "https://www.apple.com/v/airpods/shared/compare/b/images/compare/compare_airpods_max__b14s2x6q07rm_large.png",
            tagline: "A perfectly personal over-ear listening experience.",
            price: "$549.00",
            iconDesc: "Active Noise Cancellation",
            desc: "Up to 2x more effective noise cancellation, Spatial Audio.",
        }
    ];

    useEffect(() => {
        gsap.fromTo(".compare-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            }
        );

        // Fetch airpods products from DB for BuyPopup
        fetch('http://localhost:5000/api/products/category/airpods')
            .then(r => r.json())
            .then(data => {
                const map = {};
                data.forEach(p => { map[p.name.toLowerCase()] = p; });
                setDbProducts(map);
            })
            .catch(() => {});
    }, []);

    const getDbProduct = (key) => dbProducts[key.toLowerCase()] || null;

    return (
        <section ref={sectionRef} className="w-full flex flex-col items-center justify-center pt-20 px-5 mb-20">
            <h2 className="text-4xl md:text-6xl text-white font-semibold mb-16 text-center">Compare AirPods models</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl w-full">
                {products.map((product, idx) => (
                    <div key={idx} className="compare-card flex flex-col items-center text-center">
                        <div className="h-48 flex items-end justify-center mb-6">
                            <img src={product.img} alt={product.name} className="max-h-full object-contain mix-blend-screen drop-shadow-2xl" />
                        </div>

                        {product.isNew && <p className="text-[#e25c11] text-xs font-semibold mb-1">New</p>}

                        <h3 className="text-2xl text-white font-semibold mb-1">{product.name}</h3>
                        {product.sub && <p className="text-white text-sm mb-2">{product.sub}</p>}

                        <p className="text-gray-400 text-xs my-4 px-2 min-h-[50px]">{product.tagline}</p>

                        <p className="text-white text-sm mb-4">{product.price}</p>

                        <button
                            onClick={() => openBuy(product.dbKey, product.img)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-2 transition-all"
                        >
                            Buy
                        </button>
                        <a href="#" className="text-blue-500 hover:underline text-xs mb-8 border-b-2 border-transparent hover:border-blue-500">Learn more &gt;</a>

                        <div className="w-full h-[1px] bg-white/20 mb-8"></div>

                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 mb-4 opacity-70">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828 2.828a9 9 0 002.828 2.828M12 12a3 3 0 110-6 3 3 0 010 6z" />
                                </svg>
                            </div>
                            <p className="text-white text-sm font-medium mb-1">{product.iconDesc}</p>
                            <p className="text-gray-400 text-xs px-2">{product.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <BuyPopup
                isOpen={!!buyState.product}
                onClose={() => setBuyState({ product: null, img: null })}
                product={buyState.product}
                overrideImage={buyState.img}
            />
        </section>
    );
};

export default CompareAirpods;
