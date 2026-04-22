import React, { useEffect } from "react";
import NavBar from "../../../Navbar";
import Footer from "../../../Footer";

// Components
import MaxHero from "./components/MaxHero";
import VisualFeatures from "./components/VisualFeatures";
import BentoSpecs from "./components/BentoSpecs";
import CheckoutSection from "./components/CheckoutSection";

export default function AirpodsMaxPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-black text-white selection:bg-purple-500/30">
            <NavBar />
            
            <MaxHero />
            <VisualFeatures />
            <BentoSpecs />
            <CheckoutSection />
            
            <Footer />
        </main>
    );
}