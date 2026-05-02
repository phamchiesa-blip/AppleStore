import React, { useState, useEffect } from 'react';
import { useCart } from '../context/useCart';

// Bảng màu hex cho các màu phổ biến của Apple
const COLOR_HEX_MAP = {
    'silver': '#E3E4E8',
    'space black': '#1C1C1E',
    'space gray': '#6E6E73',
    'starlight': '#F2E8DC',
    'midnight': '#1B2A3D',
    'sky blue': '#76B9E6',
    'blush': '#E8B4B8',
    'citrus': '#F2C438',
    'indigo': '#4B5DA0',
    'blue': '#2997FF',
    'green': '#30D158',
    'pink': '#FF6B8A',
    'yellow': '#FFD60A',
    'orange': '#FF9500',
    'purple': '#BF5AF2',
    'red': '#FF3B30',
    'white': '#F5F5F7',
    'black': '#1D1D1F',
    'natural titanium': '#B0A898',
    'black titanium': '#3C3C3C',
    'teal': '#40C8B0',
    'ultramarine': '#3B5FA0',
    'gold': '#D4AF37',
    'rose gold': '#C9867C',
    'titanium': '#8A8A8F',
    'standard': '#9D9D9F',
    'aluminum': '#B0B0B0',
};

const getHex = (colorName) => {
    return COLOR_HEX_MAP[colorName.toLowerCase()] || '#9D9D9F';
};

// Chuẩn hoá mảng: cả string lẫn object đều thành { name, price_modifier?, hex? }
const normalizeArray = (arr, type) => {
    if (!arr || arr.length === 0) return [];
    return arr.map(item => {
        if (typeof item === 'string') {
            if (type === 'color') return { name: item, hex: getHex(item) };
            if (type === 'storage') return { name: item, price_modifier: 0 };
            if (type === 'model') return { name: item, price_modifier: 0 };
        }
        // Đã là object
        if (type === 'storage') {
            // DB dùng {capacity, price_modifier} → đổi thành {name, price_modifier}
            const name = item.name || item.capacity || '';
            return { ...item, name };
        }
        if (type === 'color' && !item.hex) return { ...item, hex: getHex(item.name || '') };
        return item;
    });
};

const BuyPopup = ({ isOpen, onClose, product, overrideImage }) => {
    const { addToCart, setIsCartOpen } = useCart();
    
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setSelectedModel(null);
            setSelectedColor(null);
            setSelectedStorage(null);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen, product]);

    if (!isOpen || !product) return null;

    // Parse options từ string hoặc object
    let rawOptions = {};
    if (typeof product.options === 'string') {
        try { rawOptions = JSON.parse(product.options); } catch (e) { console.error(e); }
    } else if (typeof product.options === 'object' && product.options !== null) {
        rawOptions = product.options;
    }

    // Chuẩn hoá tất cả về dạng object (DB dùng 'storages', BuyPopup dùng 'storage' — hỗ trợ cả hai)
    const models   = normalizeArray(rawOptions.models, 'model');
    const colors   = normalizeArray(rawOptions.colors, 'color');
    const storages = normalizeArray(rawOptions.storages || rawOptions.storage, 'storage');

    const hasModels   = models.length > 0;
    const hasColors   = colors.length > 0;
    const hasStorages = storages.length > 0;

    const isReadyToAdd = (!hasModels || selectedModel) &&
                         (!hasColors || selectedColor) &&
                         (!hasStorages || selectedStorage);

    // Tính giá động
    let currentPrice = parseFloat((product.price_string || product.base_price || '0').toString().replace(/[^0-9.]/g, '')) || 0;
    if (selectedModel?.price_modifier)   currentPrice += Number(selectedModel.price_modifier);
    if (selectedStorage?.price_modifier) currentPrice += Number(selectedStorage.price_modifier);

    const handleAddToCart = () => {
        if (!isReadyToAdd) return;
        
        let customName = product.name;
        if (selectedModel)   customName += ` - ${selectedModel.name}`;
        if (selectedStorage) customName += ` (${selectedStorage.name})`;
        if (selectedColor)   customName += ` - ${selectedColor.name}`;

        addToCart({
            id: `${product.id}-${selectedModel?.name || ''}-${selectedColor?.name || ''}-${selectedStorage?.name || ''}`,
            name: customName,
            price: currentPrice,
            image: overrideImage || product.image_url,
            color: selectedColor?.name,
            colorHex: selectedColor?.hex,
            storage: selectedStorage?.name,
        });
        onClose();
        setIsCartOpen(true);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity pointer-events-auto" 
                onClick={onClose}
            ></div>

            {/* Popup */}
            <div className="relative w-full sm:max-w-4xl bg-[#1c1c1e] text-white rounded-t-[2.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto pointer-events-auto animate-[slideUp_0.4s_ease-out]">
                
                {/* Close */}
                <button onClick={onClose} className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-[#2c2c2e] hover:bg-[#3a3a3c] rounded-full flex items-center justify-center transition-colors text-gray-400 hover:text-white z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* Left: Image & Price */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                    <div className="relative w-full flex justify-center mb-6">
                        <div className={`absolute inset-0 blur-3xl opacity-20 bg-gradient-to-br ${product.accent_color || 'from-gray-600 to-gray-800'}`}></div>
                        {(overrideImage || product.image_url) ? (
                            <img src={overrideImage || product.image_url} alt={product.name} className="w-full max-w-[280px] object-contain relative z-10 drop-shadow-2xl" />
                        ) : (
                            <div className={`w-[250px] h-[300px] bg-gradient-to-br ${product.accent_color || 'from-gray-600 to-gray-800'} rounded-3xl p-1 relative z-10`}>
                                <div className="w-full h-full bg-black rounded-[1.4rem]"></div>
                            </div>
                        )}
                    </div>
                    <div className="text-center mt-4 hidden md:block">
                        <p className="text-gray-400 text-sm mb-1">Total Price</p>
                        <p className="text-3xl font-bold text-white">${currentPrice.toFixed(2)}</p>
                    </div>
                </div>

                {/* Right: Options */}
                <div className="w-full md:w-1/2 flex flex-col gap-6 pb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Buy {product.name}</h2>
                        <p className="text-gray-400">Customize your perfect device.</p>
                    </div>

                    {/* Model */}
                    {hasModels && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Model</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {models.map((m, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setSelectedModel(m)}
                                        className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all text-left ${selectedModel?.name === m.name ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-500 bg-transparent'}`}
                                    >
                                        <span className="font-medium">{m.name}</span>
                                        {m.price_modifier > 0 && <span className="text-gray-400 text-sm">+${m.price_modifier}</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Color */}
                    {hasColors && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Color — <span className="font-normal text-gray-300">{selectedColor ? selectedColor.name : 'Select'}</span></h3>
                            <div className="flex flex-wrap gap-4">
                                {colors.map((c, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setSelectedColor(c)}
                                        title={c.name}
                                        className={`w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center ${selectedColor?.name === c.name ? 'border-blue-500 scale-110' : 'border-transparent hover:scale-105'}`}
                                    >
                                        <div className="w-10 h-10 rounded-full shadow-inner border border-white/10" style={{ backgroundColor: c.hex }}></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Storage */}
                    {hasStorages && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Storage</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {storages.map((s, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => setSelectedStorage(s)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${selectedStorage?.name === s.name ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-500 bg-transparent'}`}
                                    >
                                        <span className="font-semibold text-lg">{s.name || s.capacity}</span>
                                        {s.price_modifier > 0 && <span className="text-gray-400 text-xs mt-1">+${s.price_modifier}</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mobile Price */}
                    <div className="flex md:hidden justify-between items-center mt-4 border-t border-gray-800 pt-4">
                        <p className="text-gray-400">Total</p>
                        <p className="text-2xl font-bold">${currentPrice.toFixed(2)}</p>
                    </div>

                    {/* Add to Cart */}
                    <div className="mt-2">
                        {isReadyToAdd ? (
                            <button onClick={handleAddToCart} className="w-full bg-white text-black py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors">
                                Add to Cart
                            </button>
                        ) : (
                            <button disabled className="w-full bg-[#2c2c2e] text-gray-500 py-4 rounded-full font-bold text-lg cursor-not-allowed">
                                Please select all options
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}} />
        </div>
    );
};

export default BuyPopup;


