function Product() {
    return (
        <div className="container mx-auto px-5 2xl:px-0 mt-[136px]">
            <div className="flex flex-wrap justify-between">
                <h1 className="text-8xl font-bold text-white">Store</h1>
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold">The best way to buy<br />the product you like.</h1>
                    <a href="https://support.apple.com/vi-vn" className="text-blue-400">Connect with an Expert</a>
                </div>
            </div>

            <div className="mt-[95px]">
                <div className="flex flex-row flex-wrap justify-between items-start">
                    {/* Có thể dùng Link để chuyển sang trang khác */}
                    <div className="flex flex-col items-center cursor-pointer group">
                        <img src="mac-removebg-preview.png" className="max-w-28 transition-transform duration-300 group-hover:scale-110" />
                        <h5 className="mt-3 text-center group-hover:text-white">Mac</h5>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer group">
                        <img src="iphone-removebg-preview.png" className="max-w-28 transition-transform duration-300 group-hover:scale-110" />
                        <h5 className="mt-3 text-center group-hover:text-white">iPhone</h5>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer group">
                        <img src="ipad-removebg-preview.png" className="max-w-28 transition-transform duration-300 group-hover:scale-110" />
                        <h5 className="mt-3 text-center group-hover:text-white">iPad</h5>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer group">
                        <img src="apods-removebg-preview.png" className="max-w-28 transition-transform duration-300 group-hover:scale-110" />
                        <h5 className="mt-3 text-center group-hover:text-white">AirPods</h5>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer group">
                        <img src="watch-removebg-preview.png" className="max-w-28 transition-transform duration-300 group-hover:scale-110" />
                        <h5 className="mt-3 text-center group-hover:text-white">Watch</h5>
                    </div>

                    <div className="flex flex-col items-center cursor-pointer group">
                        <img src="tvhome-removebg-preview.png" className="max-w-28 transition-transform duration-300 group-hover:scale-110" />
                        <h5 className="mt-3 text-center group-hover:text-white">TV&Home</h5>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Product