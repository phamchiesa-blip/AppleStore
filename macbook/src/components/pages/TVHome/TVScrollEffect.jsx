import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function TVScrollEffect() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=120%",
        scrub: true,
        pin: true,
      },
    });

    // 1. Video + text fade out
    tl.to(videoRef.current, {
      opacity: 0,
      ease: "none",
    });

    tl.to(
      textRef.current,
      {
        opacity: 0,
        y: 40,
        ease: "none",
      },
      "<"
    );

    // 2. Image xuất hiện (TV nhỏ lại)
    tl.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.8,
        y: 100,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "none",
      },
      "<"
    );
  }, { scope: containerRef });

  return (
    <>
      {/* HERO */}
      <section ref={containerRef} className="relative h-[150vh]">
        {/* VIDEO */}
        <div
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-screen z-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://www.apple.com/105/media/ww/tv-home/2025/97945d8e-0757-4343-9bf2-7d0088d8ea1d/anim/services-1/large_2x.mp4"
              type="video/mp4" />
          </video>

          {/* TEXT nằm TRONG video */}
          <div
            ref={textRef}
            className="absolute bottom-10 left-0 w-full flex justify-center text-white z-20"
          >
            <div className="flex flex-col justify-center mb-2">
              <div className="flex flex-row text-center justify-center">
                <img src="/assets/images/apple.svg" width={30} />
                <h1 className="text-5xl mx-1 text-center">tv</h1>
                <h1 className="text-5xl text-center bg-gradient-to-br from-red-500 via-purple-300 to-yellow-300 bg-clip-text text-transparent">4k</h1>
              </div>

              <div className="text-5xl text-center text-white">
                <h1 className="mb-2">Experience Apple.</h1>
                <h1 className="">A truly cinematic experience that appeals to all the senses.</h1>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE (TV) */}
        <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center">
          <img
            ref={imageRef}
            src="/tvshow4k-removebg-preview.png"
            alt="Apple TV"
            className="opacity-0 w-[80%] md:w-[50%] lg:w-[60%] object-contain"
          />
        </div>
      </section>

      {/* CONTENT */}
      <section className="-mt-[66vh] px-6 text-center min-h-[60vh] text-xl font-bold">
        <h1 className="">Apple TV 4K combines your favorite Apple services with all your</h1>
        <h1 className="">streaming apps, delivering the best picture and sound quality ever.</h1>
        <h1 className="">Enjoy the FaceTime experience on your TV, connecting with your friends </h1>
        <h1 className="">and family right in your living room. Apple Music Single lets you use </h1>
        <h1 className="">your iPhone as a microphone. Interact seamlessly with all your smart home </h1>
        <h1 className="">devices and accessories-that's what you've always loved about Apple-now </h1>
        <h1 className="">with the all-new Liquid Glass interface on tvOS, delivering a truly immersive experience.</h1>
        <h1 className="mt-6">From $139</h1>
      </section>
    </>
  );
}

export default TVScrollEffect;