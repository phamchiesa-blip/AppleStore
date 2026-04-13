import { reasons } from "../../../constants";

function Reasons() {
    return ( 
        <div className="container mx-auto px-5 2xl:px-0 mt-[145px]">
            <h1 className="text-5xl text-white">Why Apple is the best place to buy</h1>
            <h1 className="text-5xl mt-2 bg-gradient-to-r from-yellow-400 via-purple-500 to-green-400 bg-clip-text text-transparent">Apple Watch</h1>

             <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide mt-[45px] px-5 pb-4">
        {reasons.map((item, index) => (
    <div 
      key={index} 
      className="relative 
  w-[320px] h-[420px] 
  flex-shrink-0
  rounded-3xl 
  bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]
  shadow-[0_4px_20px_rgba(0,0,0,0.5)]
  p-6 
  overflow-hidden
  cursor-pointer
  group
  border border-white/10
  transition-all duration-300"
    >
        {/* TEXT */}
        <div className="z-10 relative">
          <h2 className="text-2xl font-semibold text-white">
            {item.title}
          </h2>

          <p className="text-gray-300 mt-1">
            {item.desc}
          </p>

          <p className="text-gray-400 mt-2">
            {item.bonus}
          </p>
        </div>

        {/* IMG */}
        <div className="absolute bottom-0 left-1/2 
          -translate-x-1/2
          w-full flex justify-center">
            <img 
                src={item.src} 
                className=" w-[90%] 
              transition-transform duration-500 
              group-hover:scale-105" 
            />
          </div>
    </div>
  ))}
           </div>
        </div>
    );
}

export default Reasons;