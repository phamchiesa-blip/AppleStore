import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import { useCart } from '../../../context/useCart';

function IntroHomeTV() {
    const { addToCart, setIsCartOpen } = useCart();

    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false
      });
    
      AOS.refresh(); 
    }, []);

    const tv = {
    id: "tv-1", // nhớ unique
    name: "Apple TV 4K",
    price: 132,
    image: "/tv-1.png" // ảnh sai link đấy, nhớ sửa lại
    };

    return ( 
        <div className="container mx-auto px-5 2xl:px-0 mt-[100px]">
            <div className="flex justify-center gap-x-[20px]">
                <div className="flex flex-col items-center cursor-pointer group">
                    <img src="tvhome-removebg-preview.png" className="w-[60px] h-[36px]" />
                    <h3 className="text-white mt-2 group-hover:text-blue-200">Apple TV</h3>
                </div>
                <div className="flex flex-col items-center cursor-pointer group">
                    <img src="home.png" className="w-[36px] h-[36px]" />
                    <h3 className="text-white mt-2 group-hover:text-blue-200">Home App</h3>
                </div>
            </div>

            {/* 2 cái thanh giới thiệu */}
            <div className="mt-[50px]">
                <div className="grid grid-cols-2 gap-2">
                    <div data-aos="fade-up"
                    data-aos-duration="500" className="rounded-3xl flex flex-col items-center
                    bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]
                    shadow-[0_4px_20px_rgba(0,0,0,0.5)]
                    p-6 
                    
                    border border-white/10
                    ">
                        <h1 className="text-3xl">💒 📲</h1>
                        <h1 className="text-3xl mt-2 text-white">Home App.</h1>
                        <h1 className="text-3xl mt-2 text-white">A solid foundation for a</h1>
                        <h1 className="mt-3 text-3xl bg-gradient-to-r from-gray-300 via-white-300 to-blue-300 bg-clip-text text-transparent">smart home.</h1>
                        <div className="flex flex-col items-center">
                            <Link to="/homeapp">
                            <p className="mt-6 text-blue-500 cursor-pointer hover:text-amber-100 transition-all duration-300">Learn more</p>
                            </Link>
                        </div>
                        <img src="homeapp__cpc1k972xys2_large_2x-removebg-preview.png" className="mt-[90px] w-[470px] h-[370px]" />
                    </div>

                    <div data-aos="fade-up"
                    data-aos-duration="1000" className="rounded-3xl flex flex-col items-center
                    bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]
                    shadow-[0_4px_20px_rgba(0,0,0,0.5)]
                    p-6 
                    
                    border border-white/10
                    ">
                        <h1 className="text-2xl bg-gradient-to-tr from-red-400 via-green-400 to-purple-400 bg-clip-text text-transparent">📺 TV 4K</h1>
                        <h1 className="text-3xl mt-2 text-white">Experience Apple.</h1>
                        <h1 className="text-3xl mt-2 text-white">A truly cinematic experience that appeals to all</h1>
                        <h1 className="text-3xl mt-2 bg-gradient-to-r from-yellow-300 via-green-300 to-pink-300 bg-clip-text text-transparent">the senses.</h1>
                        <h1 className="mt-3 text-xl">From $132</h1>
                        <div className="flex flex-col items-center">
                            <button 
                                onClick={() => {
                                    addToCart(tv);
                                    setIsCartOpen(true);
                                }}
                                className="text-center bg-blue-300 rounded-full px-6 py-2 text-white text-xl mt-[22px] cursor-pointer hover:scale-110 transition-all duration-300">Buy</button>
                            <Link to="/tv4k"><p className="mt-6 text-blue-500 cursor-pointer hover:text-amber-100 transition-all duration-300">Learn more</p></Link>
                        </div>
                        <img src="tvhome-removebg-preview.png" className="mt-[90px] w-[408px] h-[275px]" />
                    </div>
                </div>
            </div>
        </div>
     );
}

export default IntroHomeTV;