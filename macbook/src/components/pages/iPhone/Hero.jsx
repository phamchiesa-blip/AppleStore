import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import {heroVideo, smallHeroVideo} from '../../utils/index'
import { useEffect, useState } from 'react';

function Hero() {
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
    const handleVideo = () => {
        if(window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo);
        } else {
            setVideoSrc(heroVideo);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleVideo);
        return () => {
            window.removeEventListener('resize', handleVideo);
        }
    }, []);

    useGSAP(() => {
        gsap.to('#hero', {
            opacity: 1,
            delay: 1,
            ease: 'power1.inOut'
        })
         gsap.to('#cta', {
            opacity: 1,
            y: -50,
            delay: 1
        })
    }, []);

    return ( 
        <section className="w-full h-[calc(100vh-60px)] relative">
            <div className="h-5/6 w-full flex-center flex-col">
                <h1 id="hero" className='text-center font-semibold text-5xl text-white opacity-0 max-md:mb-10'>iPhone 17 Pro</h1>
                <div className="md:w-10/12 w-9/12">
                    <video className='pointer-events-none' autoPlay muted playsInline={true} key={videoSrc}>
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>
            </div>

            <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
                <a href="#highlights" 
                className='px-5 py-2 rounded-3xl my-5 bg-blue-200 text-black'>
                    Buy
                </a>
                <p className='font-normal text-xl'>From $199.month or $999</p>
            </div>
        </section>
     );
}

export default Hero;