import React, { useEffect } from "react";
import NavBar from "../../../Navbar";
import Footer from "../../../Footer";

// Components
import InteractiveProCanvas from "./components/InteractiveProCanvas";
import SpecPager from "./components/SpecPager";
import BatterySection from "./components/BatterySection";
import CheckoutSection from "./components/CheckoutSection";

export default function AirpodsProPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-black text-white selection:bg-blue-500/30 font-sans">
            <NavBar />
            
            <InteractiveProCanvas />
            <SpecPager />
            <BatterySection />
            <CheckoutSection />
            
            <Footer />
        </main>
    );
}