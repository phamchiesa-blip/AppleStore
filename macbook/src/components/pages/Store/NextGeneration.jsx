import {imageAppleStore} from '../../../constants/index'

function NextGeneration() {
    return (
        <div className="container mx-auto px-5 2xl:px-0 mt-[100px]">
            <h1 className="text-4xl font-bold text-white">Latest Generation. See now what's new.</h1>

            {/* Nhớ Link như thẻ navbar! */}
           <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide mt-6 px-5 pb-4">
        {imageAppleStore.map((item, index) => (
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
            {item.name}
          </h2>

          <p className="text-gray-300 mt-1">
            {item.desc}
          </p>

          <p className="text-gray-400 mt-2">
            {item.price}
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
    )
}

export default NextGeneration