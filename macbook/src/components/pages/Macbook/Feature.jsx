import { Canvas } from "@react-three/fiber";
import StudioLights from "./StudioLights";
import { features } from "../../../constants";
import clsx from "clsx";
import { useRef, useEffect } from "react";
import { Suspense } from "react";
import { Html, Preload } from "@react-three/drei";
import MacbookModel from "../../models/Macbook";
import useMediaQuery from "react-responsive";
import useMacbookStore from "../../../store/index";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const ModelScroll = () => {
    const groupRef = useRef();
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
    const {setTexture} = useMacbookStore();

    useEffect(() => {
        features.forEach((feature) => {
            const v = document.createElement("video");

            Object.assign(v, {
                src: feature.videoPath,
                muted: true,
                crossOrigin: "anonymous",
                preload: "auto",
                playsInline: true,
            });

            v.load();
        })
    });

    useGSAP(() => {
        // 3D model rotation animation: 
        // Khi luồng cuộn được kích hoạt, mô hình sẽ quay 360 độ quanh trục Y.
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
            }
        }); 

        // Sync the feature content
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: "top center",
                end: "bottom top",
                scrub: 1,
            }
        }); 

        // 3D spin
        if(groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, {
                y: Math.PI * 2,
                ease: "power1.inOut",
            });
        }

        // Content and text sync
        // Video sẽ hiện lên theo thứ tự của features, 
        // mỗi video sẽ hiển thị khi cuộn đến phần nội dung tương ứng.
        timeline
        .call(() => setTexture('/videos/feature-1.mp4'))
        .to('.box1', { opacity: 1, y: 0, delay: 1})

        .call(() => setTexture('/videos/feature-2.mp4'))
        .to('.box2', { opacity: 1, y: 0})

        .call(() => setTexture('/videos/feature-3.mp4'))
        .to('.box3', { opacity: 1, y: 0})
        
        .call(() => setTexture('/videos/feature-4.mp4'))
        .to('.box4', { opacity: 1, y: 0})

        .call(() => setTexture('/videos/feature-5.mp4'))
        .to('.box5', { opacity: 1, y: 0})
    }, []);

    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase">💻</h1></Html>}>
                <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]}/>
            </Suspense>
        </group>
    )
}
const Feature = () => {
  return (
    <section id="features">
        <h2>See it all in a new light.</h2>

        <Canvas id="f-canvas" camera={{}}>
            <StudioLights />
            <ambientLight intensity={0.5} />
            <ModelScroll />
        </Canvas>

        <div className="absolute inset-0">
            {features.map((feature, index) => (
                <div key={index} className={clsx("box", `box${index + 1}`, feature.styles)}>
                  <img src={feature.icon} alt="icon" />
                  <p>
                    <span className="text-white">{feature.highlight} </span>
                    {feature.text}
                  </p>
                </div>
            ))}
        </div>
    </section>
  )
}

export default Feature