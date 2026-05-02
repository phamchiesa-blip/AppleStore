import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from 'react';
import BuyPopup from "../../BuyPopup";

function WatchProducts() {
    const [buyState, setBuyState] = useState({ product: null, img: null });
    const [dbProducts, setDbProducts] = useState({});

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        AOS.refresh();

        fetch('http://localhost:5000/api/products/category/watch')
            .then(r => r.json())
            .then(data => {
                const map = {};
                data.forEach(p => { map[p.name.toLowerCase()] = p; });
                setDbProducts(map);
            })
            .catch(() => {});
    }, []);

    const openBuy = (key, img) => {
        const product = dbProducts[key.toLowerCase()] || null;
        setBuyState({ product, img });
    };

    const watchItems = [
        {
            key: 'apple watch series 11',
            img: 'watch11.webp',
            title: 'Apple Watch Series 11',
            tagline: 'Your ultimate health care tool.',
            price: 'From $442 or $18/month for 24 months',
            learnMoreLink: '/detailwatchseries11',
            learnMoreLabel: 'Learn more about Series 11',
            dots: ['#989494','#F0EFF1','#F6D9CD','#010203','#E3DDD7','#F4DEC8','#47423D'],
        },
        {
            key: 'apple watch se 3',
            img: 'watchse3.png',
            title: 'Apple Watch SE 3',
            tagline: 'Essential health features at an attractive price.',
            price: 'From $269 or $11/month for 24 months',
            learnMoreLink: '/detailwatchse3',
            learnMoreLabel: 'Learn more about SE 3',
            dots: ['#010203','#E3DDD7'],
        },
        {
            key: 'apple watch ultra 3',
            img: 'watchul3.webp',
            title: 'Apple Watch Ultra 3',
            tagline: 'The ultimate watch for sports and adventure.',
            price: 'From $923 or $37/month for 24 months',
            learnMoreLink: '/detailwatchsultra',
            learnMoreLabel: 'Learn more about Ultra 3',
            dots: ['#010203','#F4DEC8'],
        },
    ];

    const aosDurations = ['1000','1500','2000'];

    return ( 
        <div className="container mx-auto px-5 2xl:px-0 mt-[136px]">
            <h1 data-aos="fade-right" className="md:text-6xl text-4xl py-2 font-bold bg-gradient-to-r from-green-300 via-purple-400 to-yellow-300 bg-clip-text text-transparent flex justify-center">
                Style with Apple Watch
            </h1>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-[55px]">
                {watchItems.map((item, i) => (
                    <div key={item.key} data-aos="fade-up" data-aos-duration={aosDurations[i]} className="flex flex-col items-center">
                        <Link to={item.learnMoreLink}>
                            <img src={item.img} alt={item.title} className="w-[370px] h-[400px] mt-3 transition-transform duration-500 hover:scale-105"/>
                        </Link>
                        <div className="flex mt-5">
                            {item.dots.map((color, di) => (
                                <div key={di} className="w-3 h-3 rounded-full mx-1 border border-gray-50" style={{ backgroundColor: color }}></div>
                            ))}
                        </div>
                        <h1 className="text-white mt-[22px] text-3xl font-semibold">{item.title}</h1>
                        <h1 className="text-white-300 mt-[22px]">{item.tagline}</h1>
                        <h1 className="text-white mt-[22px]">{item.price}</h1>
                        <Link to={item.learnMoreLink}>
                            <h3 className="text-white-900 text-xl mt-3 cursor-pointer hover:scale-105">{item.learnMoreLabel}</h3>
                        </Link>
                        <button
                            onClick={() => openBuy(item.key, item.img)}
                            className="px-7 py-3 bg-[#0076DF] rounded-4xl mt-[30px] mb-2 text-xl"
                        >
                            <h3 className="text-xl text-white cursor-pointer transition-transform duration-200 hover:scale-110">Buy</h3>
                        </button>
                    </div>
                ))}
            </div>

            <BuyPopup
                isOpen={!!buyState.product}
                onClose={() => setBuyState({ product: null, img: null })}
                product={buyState.product}
                overrideImage={buyState.img}
            />
        </div>
    );
}

export default WatchProducts;