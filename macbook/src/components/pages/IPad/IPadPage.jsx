import React, { useEffect } from 'react';
import Footer from '../../Footer';
import Hero from './Hero';
import Models from './Models';
import Features from './Features';

const IPadPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-black min-h-screen overflow-x-hidden">
            <main>
                <Hero />
                <Features />
                <Models />
            </main>
            <Footer />
        </div>
    );
};

export default IPadPage;
