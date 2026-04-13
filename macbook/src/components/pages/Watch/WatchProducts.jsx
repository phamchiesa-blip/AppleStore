
function WatchProducts() {
    return ( 
        <div className="container mx-auto px-5 2xl:px-0 mt-[136px]">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-green-300 via-purple-400 to-yellow-300 bg-clip-text text-transparent flex justify-center">Style with Apple Watch</h1>

            <div className="grid grid-cols-3 gap-4 mt-[55px]">
                
                <div className="flex flex-col items-center">
                    <img src="watch11.webp" alt="" className="w-[370px] h-[400px] mt-3 transition-transform duration-500  hover:scale-105"/>
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
                    <h3 className="text-white-900 text-xl mt-3 cursor-pointer hover:scale-105">👉🏻 Learn more about Series 11</h3>
                    <button className="px-7 py-3 bg-[#0076DF] rounded-4xl mt-[30px] mb-2 text-xl">
                        <h3 className="text-xl text-white cursor-pointer transition-transform duration-200  hover:scale-110">Buy 🛍️</h3> 
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <img src="watchse3.png" alt="" className="w-[370px] h-[400px] mt-3 transition-transform duration-500 hover:scale-105"/>
                    <div className="flex mt-5">
                        <div className="w-3 h-3 bg-[#010203] rounded-full mx-1 border border-amber-50"></div>
                        <div className="w-3 h-3 bg-[#E3DDD7] rounded-full mx-1"></div>
                    </div> 
                    <h1 className="text-white mt-[22px] text-3xl font-semibold">Apple Watch SE 3</h1>
                    <h1 className="text-white-300 mt-[22px]">Essential health features at an attractive price.</h1>
                    <h1 className="text-white mt-[22px]">From $269 or $11/month for 24 months</h1>
                    <h3 className="text-white-900 text-xl mt-3 cursor-pointer hover:scale-105">👉🏻 Learn more about SE 3</h3>
                    <button className="px-7 py-3 bg-[#0076DF] rounded-4xl mt-[30px] mb-2 text-xl">
                        <h3 className="text-xl text-white cursor-pointer hover:scale-110 transition-transform duration-200">Buy 🛍️</h3> 
                    </button>
                </div>
                <div className="flex flex-col items-center">
                    <img src="watchul3.webp" alt="" className="w-[370px] h-[400px] mt-3 transition-transform duration-500 hover:scale-105"/>
                    <div className="flex mt-5">
                        <div className="w-3 h-3 bg-[#010203] rounded-full mx-1 border border-amber-50"></div>
                        <div className="w-3 h-3 bg-[#F4DEC8] rounded-full mx-1"></div>
                    </div> 
                    <h1 className="text-white mt-[22px] text-3xl font-semibold">Apple Watch Ultra 3</h1>
                    <h1 className="text-white-300 mt-[22px]">The ultimate watch for sports and adventure.</h1>
                    <h1 className="text-white mt-[22px]">From $923 or $37/month for 24 months</h1>
                    <h3 className="text-white-900 text-xl mt-3 cursor-pointer hover:scale-105">👉🏻 Learn more about Ultra 3</h3>
                    <button className="px-7 py-3 bg-[#0076DF] rounded-4xl mt-[30px] mb-2 text-xl">
                        <h3 className="text-xl text-white cursor-pointer hover:scale-110 transition-transform duration-200">Buy 🛍️</h3> 
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WatchProducts;