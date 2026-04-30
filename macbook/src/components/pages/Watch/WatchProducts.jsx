import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';
import { useCart } from '../../../context/useCart';


function WatchProducts() {
    const { addToCart, setIsCartOpen } = useCart();

     useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false
      });
    
      AOS.refresh(); 
    }, []);

    const w11 = {
    id: "watch-11", // nhớ unique
    name: "Apple Watch Series 11",
    price: 442,
    image: "/watch-11.png" // ảnh sai link đấy, nhớ sửa lại
    };

    const wse3 = {
    id: "watch-se3", // nhớ unique
    name: "Apple Watch SE 3",
    price: 269,
    image: "/watch-se3.png" // ảnh sai link đấy, nhớ sửa lại
    };

    const wu3 = {
    id: "watch-u3", // nhớ unique
    name: "Apple Watch Ultra 3",
    price: 923,
    image: "/watch-u3.png" // ảnh sai link đấy, nhớ sửa lại
    };


    return ( 
        <div className="container mx-auto px-5 2xl:px-0 mt-[136px]">
            <h1 data-aos="fade-right" className="md:text-6xl text-4xl py-2 font-bold bg-gradient-to-r from-green-300 via-purple-400 to-yellow-300 bg-clip-text text-transparent flex justify-center">
                Style with Apple Watch
            </h1>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-[55px]">
                
                <div data-aos="fade-up" data-aos-duration="1000" className="flex flex-col items-center">
                    <Link to="/detailwatchseries11">
                    <img src="watch11.webp" alt="" className="w-[370px] h-[400px] mt-3 transition-transform duration-500  hover:scale-105"/>
                    </Link>
                    <div className="flex mt-5">
                        <div className="w-3 h-3 bg-[#989494] rounded-full mx-1"></div>
                        <div className="w-3 h-3 bg-[#F0EFF1] rounded-full mx-1"></div>
                        <div className="w-3 h-3 bg-[#F6D9CD] rounded-full mx-1"></div>
                        <div className="w-3 h-3 bg-[#010203] rounded-full mx-1 border border-gray-50"></div>
                        <div className="w-3 h-3 bg-[#E3DDD7] rounded-full mx-1"></div>
                        <div className="w-3 h-3 bg-[#F4DEC8] rounded-full mx-1"></div>
                        <div className="w-3 h-3 bg-[#47423D] rounded-full mx-1"></div>
                    </div> 
                    <h1 className="text-white mt-[22px] text-3xl font-semibold">Apple Watch Series 11</h1>
                    <h1 className="text-white-300 mt-[22px]">Your ultimate health care tool.</h1>
                    <h1 className="text-white mt-[22px]">From $442 or $18/month for 24 months</h1>
                    <Link to="/detailwatchseries11">
                    <h3 className="text-white-900 text-xl mt-3 cursor-pointer hover:scale-105">👉🏻 Learn more about Series 11</h3>
                    </Link>
                    <button
                        onClick={() => {
                            addToCart(w11);
                            setIsCartOpen(true);
                        }}
                        className="px-7 py-3 bg-[#0076DF] rounded-4xl mt-[30px] mb-2 text-xl">
                        <h3 className="text-xl text-white cursor-pointer transition-transform duration-200  hover:scale-110">Buy 🛍️</h3> 
                    </button>
                </div>
                <div data-aos="fade-up" data-aos-duration="1500" className="flex flex-col items-center">
                    <Link to="/detailwatchse3">
                    <img src="watchse3.png" alt="" className="w-[370px] h-[400px] mt-3 transition-transform duration-500 hover:scale-105"/>
                    </Link>
                    <div className="flex mt-5">
                        <div className="w-3 h-3 bg-[#010203] rounded-full mx-1 border border-amber-50"></div>
                        <div className="w-3 h-3 bg-[#E3DDD7] rounded-full mx-1"></div>
                    </div> 
                    <h1 className="text-white mt-[22px] text-3xl font-semibold">Apple Watch SE 3</h1>
                    <h1 className="text-white-300 mt-[22px]">Essential health features at an attractive price.</h1>
                    <h1 className="text-white mt-[22px]">From $269 or $11/month for 24 months</h1>
                    <Link to="/detailwatchse3">
                    <h3 className="text-white-900 text-xl mt-3 cursor-pointer hover:scale-105">👉🏻 Learn more about SE 3</h3>
                    </Link>
                    <button 
                    onClick={() => {
                            addToCart(wse3);
                            setIsCartOpen(true);
                        }}
                    className="px-7 py-3 bg-[#0076DF] rounded-4xl mt-[30px] mb-2 text-xl">
                        <h3 className="text-xl text-white cursor-pointer hover:scale-110 transition-transform duration-200">Buy 🛍️</h3> 
                    </button>
                </div>
                <div data-aos="fade-up" data-aos-duration="2000" className="flex flex-col items-center">
                    <Link to="/detailwatchsultra">
                    <img src="watchul3.webp" alt="" className="w-[370px] h-[400px] mt-3 transition-transform duration-500 hover:scale-105"/>
                    </Link>
                    <div className="flex mt-5">
                        <div className="w-3 h-3 bg-[#010203] rounded-full mx-1 border border-amber-50"></div>
                        <div className="w-3 h-3 bg-[#F4DEC8] rounded-full mx-1"></div>
                    </div> 
                    <h1 className="text-white mt-[22px] text-3xl font-semibold">Apple Watch Ultra 3</h1>
                    <h1 className="text-white-300 mt-[22px]">The ultimate watch for sports and adventure.</h1>
                    <h1 className="text-white mt-[22px]">From $923 or $37/month for 24 months</h1>
                    <Link to="/detailwatchsultra">
                    <h3 className="text-white-900 text-xl mt-3 cursor-pointer hover:scale-105">👉🏻 Learn more about Ultra 3</h3>
                    </Link>
                    <button 
                        onClick={() => {
                            addToCart(wu3);
                            setIsCartOpen(true);
                        }}
                        className="px-7 py-3 bg-[#0076DF] rounded-4xl mt-[30px] mb-2 text-xl">
                        <h3 className="text-xl text-white cursor-pointer hover:scale-110 transition-transform duration-200">Buy 🛍️</h3> 
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WatchProducts;