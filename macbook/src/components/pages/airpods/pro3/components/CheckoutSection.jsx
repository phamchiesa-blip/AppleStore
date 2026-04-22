import React from "react";

const CheckoutSection = () => {
    return (
        <section className="h-[70vh] bg-black flex flex-col items-center justify-center space-y-12 border-t border-white/5">
            <h2 className="text-6xl md:text-9xl font-black text-center tracking-tighter uppercase italic opacity-20">
                Precision Sound.
            </h2>
            <button className="px-12 py-5 bg-white text-black font-black rounded-full hover:bg-zinc-200 transition-all scale-125 shadow-[0_0_80px_rgba(255,255,255,0.15)]">
                Secure Yours Now
            </button>
        </section>
    );
};

export default CheckoutSection;
