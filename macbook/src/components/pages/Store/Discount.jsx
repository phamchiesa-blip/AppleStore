import React, { useState, useRef, useContext } from 'react';
import { CartContext } from "../../../context/CartContext";
import Toast from "../../Toast";

// Hook tái sử dụng cho mỗi khối upload ảnh
function useImageUpload() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveClick = () => {
    if (image) {
      alert("Save image successfully!");
    }
  };

  return { image, fileInputRef, handleImageUpload, handleUploadClick, handleSaveClick };
}

// Component con: Vùng upload ảnh dùng chung
function ImageUploadZone({ image, fileInputRef, handleImageUpload, handleUploadClick, handleSaveClick, containerClassName, emptyLabel = "Tải ảnh lên" }) {
  return (
    <div className={containerClassName}>
      {image ? (
        <>
          <img src={image} alt="Thiết bị của bạn" className="w-full h-full object-contain p-2" />
          <button
            onClick={handleUploadClick}
            className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs py-1.5 px-3 rounded-full hover:bg-black border border-gray-600 transition-colors"
          >
            Change image
          </button>
          <button
            onClick={handleSaveClick}
            className="absolute bottom-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-transform hover:scale-105"
          >
            Save image
          </button>
        </>
      ) : (
        <div className="text-center">
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
            <i className="fa-solid fa-camera text-gray-400"></i>
          </div>
          <p className="text-gray-500 text-xs mb-3">{emptyLabel}</p>
          <button
            onClick={handleUploadClick}
            className="bg-white text-black font-semibold text-[12px] py-1 px-2 mt-1 rounded-full hover:bg-gray-200 transition-colors"
          >
            Choose image
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
}

// Chỗ Xác Thực xem xét làm BackEnd hay gì đó...
export default function Discount() {
  // Mỗi khối có state & ref riêng biệt
  const { setDiscount } = useContext(CartContext);
  const [toast, setToast] = useState(null);
  
  const handleVerify = () => {
    setDiscount({
      percent: 10
    });
    setToast({ message: "Discount applied successfully 🎉", type: "success" });
  };

  const block1 = useImageUpload();
  const block2 = useImageUpload();
  const block3 = useImageUpload();

  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">

        {/* Tiêu đề chính */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Endow. <br />
            <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
             Save money your way.
            </span>
          </h2>
        </div>

        {/* Lưới Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* KHỐI 1: Ưu đãi Giáo dục */}
          <div className="md:col-span-2 bg-[#1d1d1f] rounded-3xl p-10 flex flex-col md:flex-row items-center border border-gray-800 hover:border-gray-700 transition-all">
            <div className="md:w-1/2">
              <span className="text-orange-400 font-semibold mb-4 block">For education</span>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Learning has no limits. <br /> Deep discounts for students.
              </h3>
              <p className="text-gray-400 text-lg mb-8">
               Save up to <span className="text-white font-bold">$192</span> when you own a Mac. Plus, get 3 months of free Apple Music and Apple TV+.
              </p>
              <button 
              onClick={handleVerify}
              className="bg-sky-500 text-black font-semibold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors">
                Verify now
              </button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <ImageUploadZone
                {...block1}
                containerClassName="relative w-full h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center border border-gray-700 overflow-hidden"
                emptyLabel="Insert MacBook/iPad Lifestyle image"
              />
            </div>
          </div>

          {/* KHỐI 2: Định giá thiết bị */}
          <div className="bg-[#1d1d1f] rounded-3xl p-8 border border-gray-800 flex flex-col justify-between group hover:bg-[#222224] transition-colors">
            <div>
              <h3 className="text-xl font-bold mb-2">Equipment valuation</h3>
              <p className="text-gray-400 text-sm">Upload a photo of your old device to see the upgrade subsidy.</p>
              <button 
              onClick={handleVerify}
              className="bg-sky-500 text-black font-semibold text-[12px] py-1.5 px-2.5 rounded-full hover:bg-gray-200 transition-colors mt-7">
                Verify now
              </button>
              
            </div>
            <ImageUploadZone
              {...block2}
              containerClassName="mt-8 h-56 bg-black/40 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-700 relative overflow-hidden"
              emptyLabel="Upload image"
            />
          </div>

          {/* KHỐI 3: Phụ kiện */}
          <div className="lg:col-span-3 bg-gradient-to-r from-[#000000] to-[#1d1d1f] border border-gray-800 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-2 text-blue-400">Complete the collection</h3>
              <p className="text-gray-400">
                Discount <span className="text-white font-bold">20%</span> for Apple Watch cases, bands, and fast chargers when purchased with the main device.
              </p>
              <button 
              onClick={handleVerify}
              className="bg-sky-500 text-black font-semibold py-1.5 px-2.5 text-[12px] rounded-full hover:bg-gray-200 transition-colors mt-7">
                Verify now
              </button>
            </div>
            <div className="mt-6 md:mt-0">
              <ImageUploadZone
                {...block3}
                containerClassName="relative w-42 h-30 bg-gray-800/50 rounded-lg border border-gray-700 flex items-center justify-center overflow-hidden"
                emptyLabel="Download accessory images"
              />
            </div>
          </div>

        </div>
      </div>

       {/* TOAST POPUP */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
