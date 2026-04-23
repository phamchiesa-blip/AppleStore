import React, { useState, useEffect } from "react";
import { dn } from "../constants";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    <header className="z-50">
      <nav>
        {/* LEFT */}
        <div className="nav-left">
          <img src="/logo.svg" alt="Apple Logo" />
        </div>

        {/* CENTER */}
        <ul className="nav-center">
          <li><Link onClick={() => window.scrollTo({top:0, behavior:'smooth'})} to="/">Store</Link></li>
          <li><Link onClick={() => window.scrollTo({top:0, behavior:'smooth'})} to="/mac">Mac</Link></li>
          <li><Link onClick={() => window.scrollTo({top:0, behavior:'smooth'})} to="/iphone">iPhone</Link></li>
          <li><Link onClick={() => window.scrollTo({top:0, behavior:'smooth'})} to="/ipad">iPad</Link></li>
          <li><Link onClick={() => window.scrollTo({top:0, behavior:'smooth'})} to="/airpods">AirPods</Link></li>
          <li><Link onClick={() => window.scrollTo({top:0, behavior:'smooth'})} to="/watch">Watch</Link></li>
          <li><Link onClick={() => window.scrollTo({top:0, behavior:'smooth'})} to="/tvhome">TV & Home</Link></li>
        </ul>

        {/* RIGHT */}
        <div className="nav-right flex items-center gap-6">
          <ul className="flex items-center gap-4">
            {user ? (
              <>
                <li>
                  <Link to="/user" className="hover:text-blue-400 transition-colors">
                    Hi, {user?.username.trim().split(" ").pop()}
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="font-bold text-sm text-red-500 hover:text-red-700 transition-colors">
                    Log out
                  </button>
                </li>
              </>
            ) : (
              dn.map((item, index) => (
                <li key={index}>
                  <Link to={item.link} className="font-bold">
                    {item.label}
                  </Link>
                </li>
              ))
            )}
          </ul>

          <div className="flex items-center gap-3">
            <button>
              <img src="/search.svg" alt="Search" />
            </button>
            <button>
              <img src="/cart.svg" alt="Cart" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
