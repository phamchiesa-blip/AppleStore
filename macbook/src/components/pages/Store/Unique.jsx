// 1. Import Component của Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from 'react';

function Unique() {
    useEffect(() => {
  AOS.init({
    duration: 1000,
    once: false
  });

  AOS.refresh();
}, []);
    return ( 
        <div className="container mx-auto px-5 2xl:px-0 mt-[70px]">
            <h1 className="text-3xl text-white">Apple Stores make all the difference.</h1>
            <h1> Even more reasons to shop with us.</h1>

            <div className="grid grid-cols-3 gap-6 mt-6">
                <div data-aos="fade-right" className="p-4 border rounded-lg shadow-lg flex flex-col items-center">
                    <div className="text-center text-5xl">💱</div> 
                        <p className='text-xl mt-3'><strong className='font-bold bg-gradient-to-r from-orange-400 via-purple-500 to-green-400 bg-clip-text text-transparent'>Exchange old equipment, </strong>get credit points to buy new equipment.</p>
                </div>
                <div data-aos="fade-down" className="p-4 border rounded-lg shadow-sm flex flex-col items-center">
                    <div className="text-center text-5xl">💷</div> 
                        <p className='text-xl mt-3'>Monthly payments are easy. Includes a <strong className='font-bold bg-gradient-to-r from-red-400 via-blue-500 to-green-400 bg-clip-text text-transparent'>0% interest </strong>option.</p>
                </div>
                <div data-aos="fade-left" className="p-4 border rounded-lg shadow-sm flex flex-col items-center">
                    <div className="text-center text-5xl">😊</div> 
                        <p className='text-xl mt-3'>Add your own personal touch. <strong className='font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent'>Combine with emojis, names, and numbers for free.</strong></p>
                </div>
                <div data-aos="fade-down-right" className="p-4 border rounded-lg shadow-sm flex flex-col items-center">
                    <div className="text-center text-5xl">📦</div> 
                        <p className='text-xl mt-3'><strong className='font-bold bg-gradient-to-r from-green-600 via-red-500 to-orange-400 bg-clip-text text-transparent'>Free </strong>delivery everywhere.</p>
                </div>
                <div data-aos="fade-up" className="p-4 border rounded-lg shadow-sm flex flex-col items-center">
                    <div className="text-center text-5xl">🛒</div> 
                        <p className='text-xl mt-3'>Enjoy a <strong className='font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent'>secure shopping experience </strong>with the
                        <strong className='font-bold bg-gradient-to-r from-red-400 via-yellow-500 to-green-400 bg-clip-text text-transparent'> Apple Store app. </strong>
                        </p>
                </div>
                <div data-aos="fade-down-left" className="p-4 border rounded-lg shadow-sm flex flex-col items-center">
                    <div className="text-center text-5xl">💻</div> 
                        <p className='text-xl mt-3'><strong className='font-bold bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent'>Customize </strong>your Mac and personalize your Apple Watch.</p>
                </div>
                
            </div>
        </div>
    );
}

export default Unique;