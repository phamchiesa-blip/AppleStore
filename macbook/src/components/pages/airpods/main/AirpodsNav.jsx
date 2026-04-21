const AirpodsNav = () => {
    const navItems = [
        { name: "AirPods", icon: "M10 5a5 5 0 00-5 5v5a2 2 0 004 0v-2a3 3 0 013-3h.5V5H10zm9 0h-.5v5H19a3 3 0 013 3v2a2 2 0 004 0v-5a5 5 0 00-5-5z" }, // Mock icon
        { name: "AirPods Pro", icon: "M8 5a6 6 0 00-6 6v4a3 3 0 006 0v-2a4 4 0 014-4h.5V5H8zm11 0h-.5v4H19a4 4 0 014 4v2a3 3 0 006 0v-4a6 6 0 00-6-6z" },
        { name: "AirPods Max", isNew: true, icon: "M12 3c-4.97 0-9 4.03-9 9v5a3 3 0 006 0v-3H6v-2c0-3.31 2.69-6 6-6s6 2.69 6 6v2h-3v3a3 3 0 006 0v-5c0-4.97-4.03-9-9-9z" }, 
        { name: "Compare", icon: "M3 4h4v16H3V4zm6 4h4v12H9V8zm6-6h4v18h-4V2z" },
        { name: "Accessories", icon: "M12 2v6m0 0a4 4 0 100 8m0-8a4 4 0 110 8m0 0v6" },
        { name: "Apple Music", icon: "M9 18V5l12-2v13a4 4 0 11-8 0V7l-8 1.33V18a4 4 0 11-8 0z" },
    ];

    return (
        <div className="w-full bg-black border-b border-gray-800 py-3 sticky top-[72px] z-40 bg-black/80 backdrop-blur-md">
            <div className="max-w-4xl mx-auto flex justify-between items-start px-2 overflow-x-auto no-scrollbar">
                {navItems.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center min-w-[70px] sm:min-w-[90px] cursor-pointer group">
                        <svg className="w-10 h-10 text-white opacity-80 group-hover:opacity-100 transition-opacity mb-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d={item.icon} />
                        </svg>
                        <span className="text-[11px] sm:text-xs text-white opacity-80 group-hover:opacity-100 transition-opacity">
                            {item.name}
                        </span>
                        {item.isNew && (
                            <span className="text-[10px] text-orange-500 font-semibold mt-0.5">New</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AirpodsNav;
