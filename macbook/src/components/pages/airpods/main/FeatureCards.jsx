import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const FeatureCards = () => {
    const sectionRef = useRef(null);

    const features = [
        {
            title: "Heart Rate Sensor",
            desc: "Track your heart rate and burned calories while working out.",
            img: "https://www.apple.com/v/airpods/ae/images/overview/consider/card_heart_rate_sensing__exas9s71qo4m_large.jpg",
            darkColor: "bg-zinc-900"
        },
        {
            title: "Active Noise Cancellation",
            desc: "Control what you hear. And what you don't.",
            img: "https://www.apple.com/v/airpods/ae/images/overview/consider/card_noise_cancellation__bcl69t06noci_large.jpg",
            darkColor: "bg-zinc-900"
        },
        {
            title: "Hearing Health",
            desc: "Get a clear picture of your hearing health.",
            img: "https://www.apple.com/v/airpods/ae/images/overview/consider/card_hearing_health__ss2uxyv3j5m6_large.jpg",
            darkColor: "bg-zinc-900"
        },
        {
            title: "Personalized Spatial Audio",
            desc: "Immersive sound. Tuned just for you.",
            img: "https://www.apple.com/v/airpods/ae/images/overview/consider/card_personalized_spatial_audio__d9ghs2utja82_large.jpg",
            darkColor: "bg-black"
        }
    ];

    useEffect(() => {
        gsap.fromTo(".feature-card", 
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
    }, []);

    return (
        <section ref={sectionRef} className="w-full flex flex-col items-center justify-center pt-20 px-5 pb-20">
            <h2 className="text-4xl md:text-6xl text-white font-semibold mb-12 text-center">Get to know AirPods.</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
                {features.map((feature, idx) => (
                    <div 
                        key={idx} 
                        className={`feature-card ${feature.darkColor} rounded-3xl overflow-hidden flex flex-col relative min-h-[400px] border border-white/10`}
                    >
                        <div className="p-8 z-10 relative">
                            <p className="text-gray-400 text-xs font-semibold mb-2">{feature.title}</p>
                            <h3 className="text-white text-xl md:text-2xl font-semibold leading-tight">{feature.desc}</h3>
                        </div>
                        
                        <div className="flex-1 flex items-end justify-center z-0 relative w-full h-full min-h-[250px]">
                            <img 
                                src={feature.img} 
                                alt={feature.title} 
                                className="w-full h-full object-cover object-bottom"
                                style={{
                                    // Some CSS to invert slightly or blend well with black cards if they are white backgrounds
                                    mixBlendMode: idx === 1 ? "screen" : "normal"
                                }}
                            />
                        </div>
                        
                        <div className="absolute bottom-5 right-5 z-20">
                            <button className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition-all font-bold">
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeatureCards;
