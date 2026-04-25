import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const products = [
  { name: "iPhone 17", category: "iphone", path: "/iphone" },
  { name: "TV 4K", category: "tv", path: "/tv4k" },
  { name: "Home App", category: "service", path: "/homeapp" },

  { name: "Apple Watch Series 11", category: "watch", path: "/detailwatchseries11" },
  { name: "Apple Watch SE 3", category: "watch", path: "/detailwatchse3" },
  { name: "Apple Watch Ultra 3", category: "watch", path: "/detailwatchsultra" },
  { name: "Apple Watch", category: "watch", path: "/watch" },

  { name: "iPad", category: "ipad", path: "/ipad" },
  { name: "MacBook", category: "mac", path: "/mac" },

  { name: "AirPods", category: "airpods", path: "/airpods" },
  { name: "AirPods Max", category: "airpods", path: "/airpods/max" },
  { name: "AirPods Pro 3", category: "airpods", path: "/airpods/pro3" },
  { name: "AirPods Pro 4", category: "airpods", path: "/airpods/pro4" },
];

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();

  // auto focus
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ESC để đóng
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filtered = products.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50">
      
      {/* CLICK OUTSIDE */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* CONTENT */}
      <div className="relative max-w-2xl mx-auto mt-32 px-5">
        
        {/* INPUT */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Apple products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent border-b border-gray-500 text-white text-2xl py-3 outline-none"
        />

        {/* RESULTS */}
        <div className="mt-6">
          {query && (
            filtered.length > 0 ? (
              filtered.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  className="py-3 text-gray-300 hover:text-white cursor-pointer transition"
                >
                  {item.name}
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-3">No results</p>
            )
          )}
        </div>

      </div>
    </div>
  );
};

export default SearchOverlay;