import React, { useEffect } from "react";

import Footer from "../../../Footer";

// Components
import HeaderBanner from "./components/HeaderBanner";
import HotspotViewer from "./components/HotspotViewer";
import SliderComparison from "./components/SliderComparison";
import DynamicBentoGrid from "./components/DynamicBentoGrid";
import CheckoutSection from "./components/CheckoutSection";

export default function Airpods4Page() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-black text-white selection:bg-zinc-600/30">
        
            
            <HeaderBanner />
            <HotspotViewer />
            <SliderComparison />
            <DynamicBentoGrid />
            <CheckoutSection />
            
            <Footer />
        </main>
    );
}