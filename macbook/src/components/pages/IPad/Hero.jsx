import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '../../../context/useCart';

const Hero = () => {
    const { addToCart, setIsCartOpen } = useCart();

    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
          .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, "-=0.5")
          // Animation cho video mờ dần và hiện ra
          .fromTo(videoRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, "-=0.5");
    }, []);

    const ipadPro = {
        id: "ipad-pro", 
        name: "iPad Pro",
        price: 999,
        image: "/ipadprom4.png" 
    };

    return (
        <section className="relative h-screen w-full flex flex-col justify-start items-center bg-black text-white overflow-hidden pt-[15vh]">
            
            {/* Phân Text và Nút (Nằm đè lên trên video nhờ z-10) */}
            <div className="z-10 text-center flex flex-col items-center mt-10 md:mt-0">
                <h1 ref={titleRef} className="text-6xl md:text-[8rem] font-semibold tracking-tight mb-4 opacity-0">iPad Pro</h1>
                <p ref={subtitleRef} className="text-2xl md:text-4xl text-gray-300 font-medium mb-10 opacity-0 tracking-wide">Thinpossible.</p>
                <div className="flex gap-6">
                    <button 
                        onClick={() => {
                            addToCart(ipadPro);
                            setIsCartOpen(true);
                        }}
                        className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 cursor-pointer transition-colors text-lg"
                    >
                        Buy
                    </button>
                    <button className="text-green-500 hover:text-green-400 font-medium text-lg flex items-center gap-1 cursor-pointer transition-colors">
                        Learn more <span className="text-sm">&gt;</span>
                    </button>
                </div>
            </div>
            
            {/* Khu vực Video Background */}
            <div ref={videoRef} className="absolute translate-y-50 inset-0 w-full h-full opacity-0 pointer-events-none flex justify-center items-end z-0">
                
                {/* Lớp overlay gradient để text bên trên dễ đọc hơn (Tùy chọn) */}
                <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-black to-transparent z-10"></div>

                {/* Thẻ Video */}
                <video
                    autoPlay     /* Tự động chạy */
                   
                    muted        /* BẮT BUỘC PHẢI CÓ TẮT TIẾNG để trình duyệt cho phép autoplay */
                    playsInline  /* BẮT BUỘC để chạy mượt trên iPhone/iOS không bị phóng to toàn màn hình */
                    className="w-full h-full top-[20vh] object-cover md:object-contain object-bottom md:object-center"
                >
                    {/* Bỏ video vào thư mục public (vd: public/videos/ipad-pro-hero.mp4) */}
                    <source src="/videos/ipadvid.webm" type="video/webm" />
                    
                </video>

            </div>
        </section>
    );
};

export default Hero;