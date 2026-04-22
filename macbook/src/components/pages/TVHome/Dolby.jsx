

const Dolby = () => {
  return (
    <>
        <div class="w-full overflow-hidden mt-[170px] relative">
            <img 
                src="/Dolby.jpg" 
                alt="banner"
                class="w-full h-[100vh] object-cover"
            />
            <div className="absolute top-[25vh] left-8 w-full flex justify-center">
                <h1 className="text-white text-3xl font-extrabold">A truly cinematic experience with</h1>
            </div>
            <div className="absolute top-[65vh] left-8 w-full flex justify-center text-center">
                <h1 className="text-white font-medium">
                4K picture quality. Stunning details stand out clearly in both 
                <br />
                the darkest and brightest areas in advanced HDR formats like 
                <br />
                Dolby Vision and HDR10+. So everything you watch deserves to 
                <br />
                be displayed on your biggest screen.
                </h1>
            </div>
        </div>

        <div className="mt-[155px] container mx-auto px-5 mb-[100px]">
            <h1 className="text-center text-white text-2xl mb-3">Collaboration is even better</h1>
            <h1 className="text-center text-white text-6xl ">The best supporting cast </h1>
            <h1 className="text-center text-white text-6xl ">for your TV.</h1>

            <div className="grid grid-cols-[480px_480px] gap-5 mt-[95px] flex-center">
                <div className="bg-[#151515] px-10 pt-10 rounded-2xl h-[555px]">
                    <h1 className="text-blue-600 text-xl">iPhone</h1>
                    <p class="text-gray-500 text-xl">
                        <span class="font-semibold text-white">
                        The multi-faceted remote {" "}
                        </span>
                    makes it easy to play, pause, fast forward, rewind, and adjust the volume on your TV, 
                    all from your iPhone's Lock Screen or in the Control Center. 
                    You can also use Face ID to make purchases or log into apps.
                    </p>
                    <div className="flex-center mt-9">
                        <img src="/control-removebg-preview.png" alt="" />
                    </div>
                </div>

                <div className="bg-[#151515] px-10 pt-10 rounded-2xl h-[555px]">
                    <h1 className="text-blue-600 text-xl"> Color calibration</h1>
                    <p class="text-gray-500 text-xl">
                        <span class="font-semibold text-white">
                       The perfect pairing. {" "}
                        </span>
                    Apple TV 4K works seamlessly with your iPhone to automatically adjust colors for the best
                     possible viewing experience. Simply point your iPhone's camera at the TV screen once, 
                     then enjoy your favorite shows and movies in stunning, true-to-life quality.
                    </p>
                    <div className="flex-center mt-2">
                        <img src="/colors.png" alt=""/>
                    </div>
                </div>

                <div className="bg-[#151515] px-10 pt-10 rounded-2xl h-[555px]">
                     <div className="flex-center ">
                        <img src="/coupleairpod.png" alt="" />
                    </div>
                    <h1 className="text-blue-600 text-xl mt-[105px]">Audio Sharing</h1>
                    <p class="text-gray-500 text-xl">
                        <span class="font-semibold text-white">
                        Listen together. {" "}
                        </span>
                    The Audio Sharing feature lets you seamlessly connect up to two AirPods in Spatial Sound mode,
                     with individual volume controls for each. This allows two people to continue watching even 
                     when the others are asleep.
                    </p>
                   
                </div>

                <div className="bg-[#151515] px-10 pt-10 rounded-2xl h-[555px]">
                    <div className="flex-center">
                        <img src="/shareplay.png" alt="" />
                    </div>
                    <h1 className="text-blue-600 text-xl">SharePlay</h1>
                    <p class="text-gray-500 text-xl">
                        <span class="font-semibold text-white">
                        Watching together.{" "}
                        </span>
                    SharePlay lets you and your 
                    friends watch movies and TV shows together in real time. And with Split Window, 
                    you'll be able to see everyone's reactions without missing a moment of the show.
                    </p>
                    
                </div>
            </div>
        </div>
    </>
  )
}

export default Dolby