import React, { useRef, useEffect } from 'react'
import {chipImg, frameImg, frameVideo} from '../../utils/index'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap';
import AOS from "aos";
import "aos/dist/aos.css";

const HowItWork = () => {
    const videoRef = useRef();
    
    useEffect(() => {
          AOS.init({
            duration: 1000,
            once: false
          });
        
          AOS.refresh(); 
        }, []);

    useGSAP(() => {
        gsap.from('#chip', {
            scrollTrigger: {
                start: '20% bottom',
                trigger: '#chip'
            },
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: 'power2.inOut'
        })
    }, []);

  return (
    <div className='sm:py-32 py-20 sm:px-10 px-5'>
        <div className="screen-max-width">
            <div id="chip" className='flex-center w-full my-20'>
                <img src={chipImg} alt="địt mẹ FPT" width={180} height={180} />
            </div>
        </div>

        <div className="flex flex-col items-center">
            <h2 className="text-4xl py-3 md:text-7xl font-semibold text-center bg-gradient-to-r from-yellow-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
                A17 Pro chip.
                <br />
                A Monster win for gaming.
            </h2>
            <p className="text-gray font-semibold text-xl md:text-2xl py-10 text-center">
                It's here. The biggest redesign in the history of Apple GPUs.
            </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
            <div className="relative h-full flex-center">
                <div className="overflow-hidden">
                    <img src={frameImg} alt="địt mẹ FPT"
                     className='bg-transparent relative z-10' />       
                </div>
                <div className="absolute w-[84%] h-[90%] rounded-[56px] overflow-hidden">
                        <video className='pointer-events-none w-full h-full '
                        playsInline preload='none' muted autoPlay loop ref={videoRef}
                        >
                            <source 
                                src={frameVideo} type='video/mp4'
                            />
                        </video>
                </div>
            </div>
            <p className="text-gray font-semibold text-center mt-5 text-2xl">
                Honkai: Star Rail
            </p>
        </div>
             <div className="flex flex-col justify-around gap-24 flex-center">
                <div className="flex flex-1 justify-center flex-col">
                  <p data-aos="zoom-out-down" className="text-gray text-3xl font-normal md:font-semibold">
                    A17 Pro is an entirely new class of iPhone chip <br /> that delivers our {' '}
                    <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent">
                      best graphic performance by far
                    </span>.
                  </p>

                  <p data-aos="zoom-out-down" className="text-gray text-2xl mt-5 font-normal md:font-semibold">
                   Mobile {' '}
                    <span className="bg-gradient-to-r from-blue-400 via-yellow-500 to-green-400 bg-clip-text text-transparent">
                      games will look and feel so immersive
                    </span>,
                    <br />
                     with incredibly detailed environments and characters.
                  </p>
                </div>
              

              <div data-aos="zoom-out-down" className="flex-1 flex justify-center flex-col">
                <p className="text-gray text-xl font-normal md:font-semibold">New</p>
                <p className="text-sky-300 text-3xl md:text-5xl font-normal md:font-semibold my-2">Pro-class GPU</p>
                <p className="text-gray text-xl font-normal md:font-semibold">with 6 cores</p>
              </div>
            </div>
    </div>
  )
}

export default HowItWork