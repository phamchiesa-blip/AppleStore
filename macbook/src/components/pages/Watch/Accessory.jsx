import AOS from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";

function Accessory() {
     useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false
      });
    
      AOS.refresh(); 
    }, []);
    return ( 
        <div className="container mx-auto px-5 2xl:px-0 mt-[145px]">
            <h1 className="lg:text-6xl text-4xl font-bold bg-gradient-to-r from-green-300 via-purple-400 to-yellow-300 bg-clip-text text-transparent">Essential accessories <br /> for the Apple Watch</h1>
        
            <div data-aos="zoom-in" className="w-full py-10 rounded-xl bg-gradient-to-br from-[#0f0f0f] to-[#343434] mt-[50px]">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    <div className="mt-[170px] text-center">
                        <h1 className="text-4xl">It's time for spring colors.</h1>
                        <h2 className="text-xl mt-4">Discover the latest strap designs with fresh colors and materials.</h2>
                        <h3 className="mt-4 cursor-pointer text-blue-600">Buy Apple Watch straps 🎗️</h3>
                    </div>
                    <div className="flex-center">
                        <img src="daydeo-removebg-preview.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Accessory;