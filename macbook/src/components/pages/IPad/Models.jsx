import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../../../context/useCart';

gsap.registerPlugin(ScrollTrigger);

const Models = () => {
    const { addToCart, setIsCartOpen } = useCart();
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 💥 1. Khai báo State để quản lý Modal
    // Nếu null: Modal đóng. Nếu chứa object iPad: Modal mở và hiện thông tin con iPad đó
    const [selectedModel, setSelectedModel] = useState(null); 

    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    cardsRef.current = [];
    
    const addToRefs = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/ipad');
                const data = await response.json();
                if (data.success) {
                    setModels(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch iPad models:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    // ... (Giữ nguyên phần useEffect của GSAP như cũ)
    useEffect(() => {
        if (!loading && models.length > 0) {
            const timer = setTimeout(() => {
                cardsRef.current.forEach((card) => {
                    if (card) {
                        gsap.fromTo(card,
                            { opacity: 0, y: 50 },
                            {
                                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                                scrollTrigger: { trigger: card, start: "top 85%", toggleActions: 'play none none reverse' }
                            }
                        );
                    }
                });
                ScrollTrigger.refresh();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [loading, models]);

    // 💥 2. Khóa cuộn trang nền khi Modal đang mở
    useEffect(() => {
        if (selectedModel) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedModel]);

    return (
        <section className="py-32 bg-black text-white relative min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                 {/* Header... */}
                 <div className="mb-20 text-center md:text-left flex items-center gap-4">
                     <h2 className="text-5xl md:text-6xl font-semibold tracking-tight">Explore the line-up.</h2>
                     {loading && <div className="w-8 h-8 rounded-full border-2 border-gray-600 border-t-white animate-spin mt-2"></div>}
                 </div>
                 
                 {!loading && models.length === 0 && (
                     <p className="text-gray-400 text-xl">Dữ liệu sản phẩm không có sẵn.</p>
                 )}

                 {/* Lưới sản phẩm */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref={containerRef}>
                     {models.map((model) => (
                         <div 
                             key={model.id} 
                             ref={addToRefs}
                             className="group bg-[#111111] rounded-[2rem] p-8 flex flex-col items-center text-center opacity-0 hover:bg-[#1a1a1a] transition-all duration-500 border border-white/5 relative overflow-hidden"
                         >
                             <div className={`absolute -inset-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl bg-gradient-to-br ${model.accent_color}`}></div>

                             <div className="w-full h-56 flex justify-center items-center mb-8 relative z-10">
                                 {model.image_url ? (
                                     <img src={model.image_url} alt={model.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                 ) : (
                                     <div className={`w-[80%] h-[95%] bg-gradient-to-br ${model.accent_color} rounded-[1.5rem] p-[2px]`}>
                                         <div className="w-full h-full bg-black rounded-[1.4rem] shadow-inner flex items-center justify-center">
                                             <div className="w-2 h-2 rounded-full bg-[#333] absolute top-4"></div>
                                         </div>
                                     </div>
                                 )}
                             </div>

                             <div className="flex flex-col flex-grow items-center w-full z-10">
                                 <h3 className="text-2xl font-semibold mb-3">{model.name}</h3>
                                 <p className="text-[#a1a1a6] mb-8 text-[15px] leading-relaxed flex-grow">{model.description}</p>
                                 <p className="font-medium text-lg mb-6">{model.price_string}</p>
                                 
                                 <div className="flex flex-col w-full gap-3 mt-auto">
                                   <button 
                        onClick={() => {
                            // Chúng ta tạo một object "sạch" theo đúng định dạng giỏ hàng cần
                            const productToAdd = {
                                id: model.id,
                                name: model.name,
                                // Vì price_string là "From $999", ta cần lấy con số để tính toán
                                price: parseFloat(model.price_string.replace(/[^0-9.]/g, '')),
                                image: model.image_url // Đường dẫn ảnh từ database
                            };
                            
                            addToCart(productToAdd);
                            setIsCartOpen(true); // Mở sidebar giỏ hàng ngay lập tức
                        }}
                        className="bg-white text-black py-2.5 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors w-full"
                    >
                        Buy
                    </button>
                                    
                                    {/* 💥 3. Nút Learn More mở Modal */}
                                    <button 
                                        onClick={() => setSelectedModel(model)} 
                                        className="text-[#2997ff] hover:text-[#147ce6] transition-colors py-2 text-sm flex items-center justify-center gap-1"
                                    >
                                        Learn more <span>&gt;</span>
                                    </button>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>

            {/* 💥 4. GIAO DIỆN MODAL (Chỉ render khi selectedModel có dữ liệu) */}
            {selectedModel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    
                    {/* Lớp nền mờ (Click vào đây cũng sẽ đóng Modal) */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity" 
                        onClick={() => setSelectedModel(null)}
                    ></div>

                    {/* Khung nội dung Modal */}
                    <div className="relative bg-[#1c1c1e] w-full max-w-4xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-800 flex flex-col md:flex-row items-center gap-10 animate-[fadeInUp_0.3s_ease-out]">
                        
                        {/* Nút Close chữ X (Góc trên phải) */}
                        <button 
                            onClick={() => setSelectedModel(null)}
                            className="absolute top-6 right-6 w-10 h-10 bg-[#2c2c2e] hover:bg-[#3a3a3c] rounded-full flex items-center justify-center transition-colors text-gray-400 hover:text-white z-20"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Cột trái: Ảnh sản phẩm to */}
                        <div className="w-full md:w-1/2 flex justify-center items-center relative">
                            {/* Hiệu ứng Glow phía sau ảnh trong Modal */}
                            <div className={`absolute inset-0 blur-3xl opacity-30 bg-gradient-to-br ${selectedModel.accent_color}`}></div>
                            
                            {selectedModel.image_url ? (
                                <img src={selectedModel.image_url} alt={selectedModel.name} className="w-full max-w-[300px] h-auto object-contain relative z-10 drop-shadow-2xl" />
                            ) : (
                                <div className={`w-[250px] h-[350px] bg-gradient-to-br ${selectedModel.accent_color} rounded-3xl p-1 relative z-10`}>
                                     <div className="w-full h-full bg-black rounded-[1.4rem]"></div>
                                </div>
                            )}
                        </div>

                        {/* Cột phải: Thông số chi tiết */}
                        <div className="w-full md:w-1/2 flex flex-col z-10 text-center md:text-left">
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${selectedModel.accent_color} font-semibold uppercase tracking-wider text-sm mb-3`}>
                                The pinnacle of technology
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{selectedModel.name}</h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                {selectedModel.long_description} 
                            </p>
                            
                            <div className="bg-black/50 border border-gray-800 rounded-2xl p-6 mb-8 flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Starting price</p>
                                    <p className="text-2xl font-semibold text-white">{selectedModel.price_string}</p>
                                </div>
                                <button className="bg-white text-black py-2.5 px-8 rounded-full font-semibold hover:bg-gray-200 transition-colors">
                                    Buy Now
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
            
            {/* Cần thêm một chút CSS tùy chỉnh cho hiệu ứng trượt lên của Modal (Để vào file index.css của bạn) 
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            */}

        </section>
    );
};

export default Models;