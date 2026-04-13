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

    });

    return () => ctx.revert(); // 🔥 QUAN TRỌNG
  }
}, [isTablet]);

  return (
    <section id="showcase">
        <div className="media">
            {/* Phát video lặp liên tục, tắt tiếng, tự động phát */}
            <video src="/videos/game.mp4" loop muted autoPlay playsInline />
            <div className="mask">
                <img src="/mask-logo.svg"/>
            </div>
        </div>

        <div className="content">
            <div className="wrapper">
                <div className="lg:max-w-md">
                    <h2>Rocket Chip</h2>

                    <div className="space-y-5 mt-7 pe-10">
                        <p>
                            Introducing {" "}
                            <span className="text-white">M4, the next generation of Apple silicon</span>
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
                        <a href="https://www.apple.com/vn/apple-intelligence/">
                            <p className="text-primary">
                                Learn more about Apple Intelligence
                            </p>
                        </a>
                    </div>
                </div>

                <div className="max-w-3xs space-y-14">
                    <div className="space-y-2">
                        <p>Up to</p>
                        <h3 className="text-white">4x faster</h3>
                        <p>pro rendering performance than M2</p>
                    </div>
                     <div className="space-y-2">
                        <p>Up to</p>
                        <h3 className="text-white">1.5x faster</h3>
                        <a>CPU performance than M2</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Showcase