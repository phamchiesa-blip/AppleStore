import { performanceImages } from "../../../constants"
import {useRef} from "react"
import {gsap} from "gsap"
import {useGSAP} from "@gsap/react"
import {ScrollTrigger} from "gsap/all"
import { performanceImgPositions } from "../../../constants"
import useMediaQuery from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const sectionRef = useRef(null);

  useGSAP(() => {
    const sectionEl = sectionRef.current;
        if (!sectionEl) return;
        
    gsap.fromTo(
    ".content p",
    {opacity: 0, y: 10},
    {opacity: 1, y: 0, duration: 0.8, ease: "power2.out", 
    scrollTrigger: {
      trigger: '.content p',
      start: "top bottom",
      end: 'top center',
      scrub: true,
      invalidateOnRefresh: true,
    }}
    );

    if (isMobile) return;

    const tl = gsap.timeline({
        defaults: {ease: "power1.inOut", duration: 2, overwrite: "auto"},
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",   
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
        },
    });

    performanceImgPositions.forEach((pos) => {
        if(pos.id === 'p5') return;
        // gsap.set(`.${pos.id}`, {y: 100, autoAlpha: 0});

        const toVars = {y: 0, autoAlpha: 1};
        if(pos.left !== undefined) toVars.left = `${pos.left}%`;
        if(pos.right !== undefined) toVars.right = `${pos.right}%`;
        if(pos.bottom !== undefined) toVars.bottom = `${pos.bottom}%`;
        if(pos.transform !== undefined) toVars.transform = pos.transform;

        tl.to(`.${pos.id}`, toVars, 0);
    }, {scope: sectionRef, dependencies: [isMobile]});

  });

  return (
    <section id="performance">
        <h2>Next-level graphics performance. Game on.</h2>

        <div className="wrapper">
            {performanceImages.map(({ id, src }) => (
                <img key={id} className={id} src={src} alt="Performance" />
            ))}
        </div>

        <div className="content">
            <span className="text-white">
                <p>Experience stunning visuals and smooth gameplay with our cutting-edge graphics technology.</p>
                <p>Whether you're a gamer, a creative professional, or simply want the best visual experience, our performance delivers.</p>
            </span>
        </div>
    </section>
  )
}

export default Performance