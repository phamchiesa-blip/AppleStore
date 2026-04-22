import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";


const Airpods4 = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(contentRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                }
            }
        );
    }, []);

    return (
        <section className="w-full flex justify-center mt-20 px-4 mb-20 relative">
            <div
                ref={containerRef}
                className="w-[95%] max-w-[1600px] h-[60vh] md:h-[80vh] rounded-[3rem] overflow-hidden relative flex items-end justify-between p-10 md:p-14 border border-white/10 mx-auto"
                style={{
                    background: "radial-gradient(circle at 50% 50%, #ff8c42, #d15a1a)",
                }}
            >
                <div className="absolute top-5 right-5 z-40">
                    <button className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/30 transition-all">
                        ||
                    </button>
                </div>

                <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
                    <video
                        src="/videos/introduce-airpod-4.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover mix-blend-screen opacity-90"
                    />
                </div>

                <div ref={contentRef} className="relative z-30 w-full flex flex-col md:flex-row justify-between items-end pointer-events-none">
                    <div className="text-black drop-shadow-sm pointer-events-auto">
                        <h2 className="text-6xl md:text-8xl font-semibold mb-2">AirPods 4</h2>
                        <p className="text-xl md:text-2xl font-bold mb-4">Iconic. And sound.</p>
                        <div className="flex flex-col md:flex-row gap-4 text-sm font-medium">
                            <span>From $129.00</span>
                            <span className="hidden md:inline">|</span>
                            <span>With Active Noise Cancellation $179.00</span>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6 md:mt-0">
                        <Link to="/airpods/pro4" className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-all pointer-events-auto">Learn more</Link>
                        <button className="border border-white text-white hover:bg-white hover:text-black px-5 py-2 rounded-full text-sm font-medium transition-all pointer-events-auto">Buy</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Airpods4;

