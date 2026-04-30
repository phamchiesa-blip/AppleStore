import { useState, useEffect } from "react";
import { dn } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import SearchOverlay from "./SearchOverlay";
import { useCart } from "../context/useCart";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [openSearch, setOpenSearch] = useState(false);
    const { cart } = useCart();
    const { setIsCartOpen } = useCart();

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== "undefined") {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };


    return (
        <>
            <header className="fixed top-0 w-full z-[120] bg-black/80 backdrop-blur-md">
                {/* Thay px-10 thành px-5 cho điện thoại, lg:px-10 cho laptop */}
                <nav className="max-w-screen-2xl mx-auto flex items-center justify-between px-5 lg:px-10 h-14 relative">

                    {/* LEFT - Nút Hamburger (Hiện trên Mobile & iPad - lg:hidden) */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden flex flex-col justify-center items-center w-6 h-6 gap-1.5 z-[130] transition-all"
                    >
                        <span className={`bg-white h-[1.5px] w-5 transition-all ${menuOpen ? "rotate-45 translate-y-[7.5px]" : ""}`}></span>
                        <span className={`bg-white h-[1.5px] w-5 transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
                        <span className={`bg-white h-[1.5px] w-5 transition-all ${menuOpen ? "-rotate-45 -translate-y-[7.5px]" : ""}`}></span>
                    </button>

                    {/* CENTER tuyệt đối ở Mobile - Logo Apple */}
                    <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none flex items-center z-50">
                        <Link to="/" onClick={() => setMenuOpen(false)}>
                            <img src="/logo.svg" alt="Apple Logo" className="w-5" />
                        </Link>
                    </div>

                    {/* Nav Links (Chỉ hiện trên Laptop - màn hình lg trở lên) */}
                    <ul className="hidden lg:flex items-center gap-8 xl:gap-10 text-[15px] font-normal text-gray-200 nav-center">
                        <li><Link to="/" className="hover:text-white transition-colors">Store</Link></li>
                        <li><Link to="/mac" className="hover:text-white transition-colors">Mac</Link></li>
                        <li><Link to="/iphone" className="hover:text-white transition-colors">iPhone</Link></li>
                        <li><Link to="/ipad" className="hover:text-white transition-colors">iPad</Link></li>
                        <li><Link to="/airpods" className="hover:text-white transition-colors">AirPods</Link></li>
                        <li><Link to="/watch" className="hover:text-white transition-colors">Watch</Link></li>
                        <li><Link to="/tvhome" className="hover:text-white transition-colors">TV & Home</Link></li>
                    </ul>

                    {/* RIGHT - Search, Login, Cart */}
                    <div className="flex items-center gap-5 lg:gap-6 z-50">
                        <ul className="hidden lg:flex items-center gap-6 text-[15px]">
                            {user ? (
                                <>
                                    {user?.role === 'admin' && (
                                        <li><Link to="/admin/dashboard" className="text-purple-400 font-medium">Admin Panel</Link></li>
                                    )}
                                    <li><Link to="/user" className="font-medium">Hi, {user?.username.split(" ").pop()}</Link></li>
                                    <li><button onClick={handleLogout} className="text-red-500 font-medium">Log out</button></li>
                                </>
                            ) : (
                                dn.map((item, index) => (
                                    <li key={index}><Link to={item.link} className="font-medium hover:text-white">{item.label}</Link></li>
                                ))
                            )}
                        </ul>

                        <div className="flex items-center gap-4 lg:gap-5">
                            <button onClick={() => setOpenSearch(true)}>
                                <img src="/search.svg" alt="Search" className="w-5" />
                            </button>
                            <button className="relative" onClick={() => setIsCartOpen(true)}>
                                <img src="/cart.svg" alt="Cart" className="w-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold px-1.5 rounded-full">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* MOBILE MENU OVERLAY - Dùng translate-y-full để trượt lên trượt xuống */}
                <div
                    className={`fixed inset-0 lg:hidden z-[110] transition-all duration-500 ease-in-out ${menuOpen
                            ? "opacity-100 visible"
                            : "opacity-0 invisible pointer-events-none"
                        }`}
                >
                    {/* Background */}
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />

                    {/* Menu Content */}
                    <div
                        className={`relative pt-20 px-10 transition-all duration-500 ease-in-out ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
                            }`}
                    >
                        <ul className="flex flex-col gap-6 text-2xl font-semibold text-gray-200 bg-neutral-950/90 backdrop-blur-2xl border-b border-white/10 rounded-lg p-6">
                            <li><Link onClick={() => setMenuOpen(false)} to="/">Store</Link></li>
                            <li><Link onClick={() => setMenuOpen(false)} to="/mac">Mac</Link></li>
                            <li><Link onClick={() => setMenuOpen(false)} to="/iphone">iPhone</Link></li>
                            <li><Link onClick={() => setMenuOpen(false)} to="/ipad">iPad</Link></li>
                            <li><Link onClick={() => setMenuOpen(false)} to="/airpods">AirPods</Link></li>
                            <li><Link onClick={() => setMenuOpen(false)} to="/watch">Watch</Link></li>
                            <li><Link onClick={() => setMenuOpen(false)} to="/tvhome">TV & Home</Link></li>

                            {/* Divider */}
                            <li className="h-[1px] w-full bg-white/10 my-2 list-none"></li>

                            {/* Login / Logout */}
                            {user ? (
                                <>
                                    {user?.role === 'admin' && (
                                        <li>
                                            <Link
                                                onClick={() => setMenuOpen(false)}
                                                to="/admin/dashboard"
                                                className="text-purple-400 font-medium text-xl"
                                            >
                                                Admin Panel
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <Link
                                            onClick={() => setMenuOpen(false)}
                                            to="/user"
                                            className="text-xl font-medium"
                                        >
                                            Hi, {user?.username.split(" ").pop()}
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setMenuOpen(false);
                                            }}
                                            className="text-red-500 text-xl font-semibold"
                                        >
                                            Log out
                                        </button>
                                    </li>
                                </>
                            ) : (
                                dn.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            onClick={() => setMenuOpen(false)}
                                            to={item.link}
                                            className="text-xl font-medium"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </header>

            <SearchOverlay isOpen={openSearch} onClose={() => setOpenSearch(false)} />
        </>


    );
}

export default NavBar;
