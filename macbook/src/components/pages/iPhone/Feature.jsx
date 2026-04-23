import { explore1Img, explore2Img, exploreVideo } from '../../utils/index';
import React, { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { animateWithGsap } from '../../utils/animations';
import gsap from 'gsap';
import AOS from "aos";
import "aos/dist/aos.css";

const Feature = () => {
    const videoRef = useRef();

    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false
      });
    
      AOS.refresh(); 
    }, []);
    
    useGSAP(() => {
    gsap.to('#exploreVideo', {
      scrollTrigger: {
        trigger: '#exploreVideo',
        toggleActions: 'play pause reverse restart',
        start: '-10% bottom',
      },
      onComplete: () => {
        videoRef.current.play();
      }
    })

    animateWithGsap('#feature_title', { y:0, opacity:1})
    animateWithGsap(
      '.g_grow',
      { scale: 1, opacity: 1, ease: 'power1' },
      { scrub: 5.5 }
    );
  }, []);

  return (
    <div className='bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] h-full sm:py-32 py-20 sm:px-10 px-5 relative overflow-hidden'>
        <div className="screem-max-width">
            <div className="mb-12 w-full">
                <h1 id="feature_title" className='text-gray-400 lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium'>
                    Explore the full story.
                </h1>
            </div>

            <div className="flex flex-col justify-center items-center overflow-hidden">
                <div className="mt-32 mb-24 pl-24">
                    <h1 className="text-4xl lg:text-6xl font-semibold text-white">iPhone.</h1>
                    <h1 className="text-4xl lg:text-6xl font-semibold text-white">Forged in Titanium.</h1>
                </div>

                <div className="flex-col flex-center sm:px-10">
                    <div className="relative h-[50vh] w-full flex items-center">
                        <video playsInline id="exploreVideo" className='w-full h-full object-cover object-center' preload='none' muted autoPlay ref={videoRef}>
                            <source src={exploreVideo} type="video/mp4" />
                        </video>
                    </div>

                    <div className='flex flex-col w-full relative'>
                        <div className=" w-full flex flex-col md:flex-row gap-5 items-center">
                            <div className="overflow-hidden flex-1 h-[50vh]">
                                <img src={explore1Img} alt="đm FPT" 
                                className='w-full h-full object-cover object-center scale-150 opacity-0 g_grow'/>
                            </div>
                            <div className="overflow-hidden flex-1 h-[50vh]">
                                <img src={explore2Img} alt="đm FPT" 
                                className='w-full h-full object-cover object-center scale-150 opacity-0 g_grow'/>
                            </div>
                        </div>

                        <div className="w-full flex-center flex-col md:flex-row mt-10 md:mt-16 gap-5">
                            <div className="flex-1 flex-center">
                                <p data-aos="fade-up" className="text-gray max-w-md text-lg md:text-xl font-semibold">
                                    iPhone 17 Pro is {' '}
                                    <span className='text-white'>
                                        the first iPhone to feature an aerospace=grade titanium design
                                    </span>, 
                                    using the same alloy that spacecrafts use for missions to the Mas.
                                </p>
                            </div>
                            <div className="flex-1 flex-center">
                                <p data-aos="fade-up" className="text-gray max-w-md text-lg md:text-xl font-semibold">
                                    Titanium has one of the best strength-to-weight ratios of any metal, making these our {' '}
                                    <span className="text-white">
                                        lightest Pro models ever.
                                    </span>
                                        You'll notice the difference the moment you pick one up.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Feature