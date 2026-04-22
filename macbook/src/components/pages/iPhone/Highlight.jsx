import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import VideoCarousel from './VideoCarousel';

function Highlight() {
    useGSAP(() => {
        gsap.to('#title', {
            opacity: 1, 
            y: 0
        })
    }, []);

    return ( 
        <section id="highlights" className="w-screen overflow-hidden h-[90vh] sm:py-32 py-20 sm:px-10 px-5 bg-zinc-900 rounded-3xl">
            <div className="screen-max-width">
                <div className='mb-12 w-full'>
                    <h1 id="title" className="text-gray lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 mt-[-60px] font-medium opacity-0 translate-y-20">
                        Get the highlights.
                    </h1>

                </div>
            <VideoCarousel />   
            </div>
        </section>
     );
}

export default Highlight;