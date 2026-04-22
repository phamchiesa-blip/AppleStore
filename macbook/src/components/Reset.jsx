import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

export default function GSAPReset() {
    const location = useLocation();

    useEffect(() => {
        // 🔥 reset scroll về đầu trang
        window.scrollTo(0, 0);

        // 🔥 kill toàn bộ animation cũ
        ScrollTrigger.getAll().forEach(t => t.kill());
        gsap.killTweensOf("*");

        // 🔥 clear cache scroll của GSAP
        ScrollTrigger.clearScrollMemory();

        // 🔥 delay nhẹ để DOM render xong rồi mới refresh
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 50);

    }, [location]);

    return null;
}