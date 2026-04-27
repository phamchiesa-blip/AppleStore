import {useGSAP} from "@gsap/react"
import { useMediaQuery } from 'react-responsive';
import gsap from "gsap";

const Showcase = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

 useGSAP(() => {
  if (!isTablet) {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "+=1500",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      timeline
        .to('.mask img', { scale: 1.05 })
        .to('.content', { opacity: 1, y: 0 });

    }, [isTablet]);

    return () => ctx.revert(); 
  }
}, [isTablet]);

  return (
    <section id="showcase" className="relative w-full">
        <div className="media relative w-full flex justify-center items-center">
            {/* Phát video lặp liên tục, tắt tiếng, tự động phát */}
            <video className="w-full object-cover" src="/videos/game.mp4" loop muted autoPlay playsInline />
            <div className="mask absolute inset-0 pointer-events-none">
                <img className="w-full h-full object-cover" src="/mask-logo.svg" alt="mask" />
            </div>
        </div>

        {/* Nội dung Content */}
        <div className="content relative z-10 px-5 md:px-10 mt-10 lg:mt-0">
            {/* Thêm flex-col cho mobile và flex-row cho PC */}
            <div className="wrapper flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-20 max-w-screen-xl mx-auto">
                
                <div className="lg:max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">Rocket Chip</h2>

                    {/* Thêm text-gray-400 hoặc text-gray-300 ở đây để chữ hiện lên trên nền đen */}
                    <div className="space-y-5 mt-7 lg:pe-10 text-gray-400 text-lg">
                        <p>
                            Introducing {" "}
                            <span className="text-white font-semibold">M4, the next generation of Apple silicon</span>
                            . M4 powers
                        </p>
                        <p>
                            It drives Apple Intelligence on iPad Pro, so you can write, 
                            create, and accomplish more with ease. 
                            All in a design that’s unbelievably thin, light, and powerful.
                        </p>
                        <p>
                            A brand-new display engine delivers breathtaking precision, 
                            color accuracy, and brightness. And a next-gen GPU with hardware-accelerated ray tracing 
                            brings console-level graphics to your fingertips.
                        </p>
                        <a href="https://www.apple.com/vn/apple-intelligence/" className="inline-block mt-2">
                            <p className="text-primary font-medium hover:underline cursor-pointer">
                                Learn more about Apple Intelligence
                            </p>
                        </a>
                    </div>
                </div>

                {/* Các chỉ số hiệu năng */}
                <div className="max-w-sm space-y-10 lg:space-y-14">
                    <div className="space-y-2 text-gray-400">
                        <p className="text-xl">Up to</p>
                        <h3 className="text-white text-5xl font-bold">4x faster</h3>
                        <p className="text-lg">pro rendering performance than M2</p>
                    </div>
                     <div className="space-y-2 text-gray-400">
                        <p className="text-xl">Up to</p>
                        <h3 className="text-white text-5xl font-bold">1.5x faster</h3>
                        <p className="text-lg">CPU performance than M2</p>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
  )
}

export default Showcase