import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useCart } from '../../../../context/useCart';

gsap.registerPlugin(ScrollTrigger);

const HeroAirpodsPro = () => {
    const { addToCart, setIsCartOpen } = useCart();

    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imgRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "top 30%",
                scrub: 1,
            }
        });

        tl.fromTo(imgRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
            .fromTo(textRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5");

    }, []);

    const appro3 = {
    id: "airpods-pro3", // nhớ unique
    name: "AirPods Pro 3",
    price: 249,
    image: "/airpods-pro3.png"
    };

    return (
        <section ref={containerRef} className="w-full flex justify-center mt-6 px-4 mb-20 relative">
            <div className="w-[95%] max-w-[1600px] h-[60vh] md:h-[80vh] rounded-[3rem] overflow-hidden relative flex flex-col justify-between p-10 md:p-14 bg-black border border-white/10 mx-auto">



                {/* Product Video Background */}
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
                    <video
                        ref={imgRef}
                        src="/videos/introduce-airpod 3.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover mix-blend-screen opacity-90"
                    />
                </div>

                {/* Content Overlay */}
                <div ref={textRef} className="relative z-10 w-full flex flex-col md:flex-row justify-between items-end opacity-0 pointer-events-auto mt-auto">
                    <div className="text-black drop-shadow-sm">
                        <h1 className="text-black font-semibold text-5xl md:text-7xl mb-2 tracking-tight">AirPods Pro 3</h1>
                        <p className="text-xl md:text-2xl font-bold mb-4 text-black">Active Noise Cancellation you've never heard before.</p>
                        <p className="text-black text-lg">$249.00</p>
                    </div>

                    <div className="flex gap-4 mt-6 md:mt-0">
                        <button onClick={() => navigate("/airpods/pro3")} className="bg-white text-black hover:bg-gray-200 px-6 py-2.5 rounded-full text-sm font-semibold transition-all">Learn more</button>
                        <button
                            onClick={() => {
                                addToCart(appro3);
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

export default HeroAirpodsPro;
