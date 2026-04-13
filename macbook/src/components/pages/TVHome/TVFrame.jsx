export default function TVFrame() {
  return (

    <>
        <div className="container mx-auto px-5 2xl:px-0 mt-[72px]">
            <h1 className="text-6xl text-white text-center mt-[167px]">Watch, sing, play, and practice.</h1>
            <h1 className="text-6xl text-white text-center">On the big screen.</h1>
        </div>
        <div className="flex items-center justify-center min-h-screen">
    
          {/* Wrapper có bóng đổ */}
          <div className="relative">
    
            {/* Bóng đổ lệch phải + xuống */}
            <div className="absolute z-10 bg-[#1a1a1a] px-1.5 py-3 pb-10 w-full max-w-[900px]" />
    
            {/* Thân TV */}
            <div className="relative z-10 bg-[#1a1a1a] p-1 pb-10 w-full max-w-[1100px]">
    
              {/* Màn hình */}
              <div className="relative overflow-hidden bg-black aspect-video">
    
                {/* Phản chiếu */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent z-10 pointer-events-none" /> */}
    
                <video
                  src="https://www.apple.com/105/media/ww/tv-home/2025/97945d8e-0757-4343-9bf2-7d0088d8ea1d/anim/services-1/large_2x.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
    
              {/* Chân TV - lớp trên */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[38%] h-1.5 bg-[#2a2a2a]" />
              {/* Chân TV - lớp dưới */}
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-[52%] h-1 bg-[#111]" />
    
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-5 2xl:px-0 mt-[60px]">
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-[260px_260px_260px_260px] gap-x-5 text-center">
                    <div>
                        <h1 className="font-bold text-4xl bg-gradient-to-r from-yellow-300 to-green-700 bg-clip-text text-transparent">Apple TV</h1>
                        <h2 className="text-white mt-2">Watch award-winning Apple Originals shows online on all your screens.</h2>
                    </div>
                    <div>
                        <h1 className="font-bold text-4xl bg-gradient-to-r from-red-300 via-purple-500 to-pink-300 bg-clip-text text-transparent">Apple Music</h1>
                        <h2 className="text-white mt-2">All genres of music. Excellent sound quality. No ads.</h2>
                    </div>
                    <div>
                        <h1 className="font-bold text-4xl bg-gradient-to-r from-gray-300 to-green-400 bg-clip-text text-transparent">Arcade</h1>
                        <h2 className="text-white mt-2">The best mobile game collection for all gamers.</h2>
                    </div>
                    <div>
                        <h1 className="font-bold text-4xl bg-gradient-to-r from-yellow-300 via-pink-600 to-green-700 bg-clip-text text-transparent">Fitness+</h1>
                        <h2 className="text-white mt-2">From HIIT to meditation, there are exercises for everyone.</h2>
                    </div>
                </div>
              </div>

              <div className="flex justify-center">
                 <div className="grid grid-cols-2 gap-10 mt-[88px] mb-[60px]">
                    <div className="text-center">
                        <h1 className="text-5xl">🚚</h1>
                        <h1 className="text-2xl font-semibold text-sky-200 mt-3">Free next-day delivery</h1>
                        <h1 className="mt-2">Applicable only at</h1>
                        <h1 className="mt-1"><strong className="bg-gradient-to-r from-green-300 via-yellow-600 to-sky-700 bg-clip-text text-transparent">Hanoi City</strong> in relation to</h1>
                        <h1 className="mt-1">some Apple products are available</h1>
                        <h1 className="mt-1">for pre-order before <strong className="bg-gradient-to-r from-red-300 to-orange-400 bg-clip-text text-transparent">3:00 PM.</strong></h1>
                        
                    </div>
                    <div className="text-center">
                    <h1 className="text-5xl">📦</h1>
                    <h1 className="text-2xl font-semibold text-sky-200 mt-3">Purchase support</h1>
                    <h1 className="mt-2">Do you have any questions? Please call </h1>
                    <h1 className="mt-1">Expert advice or online chat.</h1>
                    </div>
                </div>
              </div>
        </div>
    </>
  )
}