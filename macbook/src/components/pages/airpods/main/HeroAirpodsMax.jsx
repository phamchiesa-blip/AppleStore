import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Link } from "react-router-dom";
import { useCart } from '../../../../context/useCart';

gsap.registerPlugin(ScrollTrigger);

const HeroAirpodsMax = () => {
    const { addToCart, setIsCartOpen } = useCart();

    const imgRef = useRef(null);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    const togglePlay = () => {
        if (imgRef.current) {
            if (isPlaying) {
                imgRef.current.pause();
            } else {
                imgRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        // Animation for the text moving up
        gsap.to(textRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: 0.5,
        });

        // Intro animation for the video
        gsap.fromTo(imgRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
        );
    }, []);

    const apmax = {
    id: "airpods-max", // nhớ unique
    name: "AirPods Max",
    price: 549,
    image: "/airpods-max.png"
    };

    return (
        <section ref={containerRef} className="w-full flex justify-center pt-24 px-4 pb-10 bg-black relative">
            
            {/* Top promo text - keeping it outside the rounded box or anchored top */}
            <div className="absolute top-[7vh] w-full flex justify-center z-40 p-4 bg-black/50 backdrop-blur-md">
                <p className="text-white text-xs sm:text-sm text-center border-b border-transparent">
                    Get 3 months of Apple Fitness+ and Apple Music free with purchase of AirPods Pro 3. <a href="#" className="text-blue-500 hover:underline">Buy &gt;</a>
                </p>
            </div>

            <div className="w-[95%] max-w-[1600px] h-[75vh] md:h-[85vh] rounded-[3rem] overflow-hidden relative flex flex-col justify-between p-10 md:p-14 border border-white/10 mx-auto bg-black mt-4">
                
                <div className="absolute top-5 right-5 z-40 pointer-events-auto">
                    <button 
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all backdrop-blur-md cursor-pointer"
                    >
                        {isPlaying ? "||" : "▶"}
                    </button>
                </div>

                {/* Video Background */}
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <video
                        ref={imgRef}
                        src="/videos/introduce-airpod-max-2.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-90 mix-blend-screen"
                    />
                </div>

                {/* Bottom Content */}
                <div
                    ref={textRef}
                    className="relative z-30 flex flex-col md:flex-row items-start md:items-end justify-between w-full opacity-0 pointer-events-auto gap-6 mt-auto"
                >
                    <div className="text-center md:text-left drop-shadow-sm">
                        <h1 className="text-black font-semibold text-5xl md:text-7xl tracking-tight mb-2">AirPods Max 2</h1>
                        <h2 className="text-lg md:text-2xl font-semibold mb-2 text-black">New smart features. More immersive listening.</h2>
                        <p className="text-black text-base md:text-lg">$549.00</p>
                    </div>

                    <div className="flex gap-4">
                        <Link to="/airpods/max" className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-full text-sm font-semibold transition-all">Learn more</Link>
                        <button
                            onClick={() => {
                                addToCart(apmax);
                                setIsCartOpen(true);
                            }}
                            className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroAirpodsMax;

