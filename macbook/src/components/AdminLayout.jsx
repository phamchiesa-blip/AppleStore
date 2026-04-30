import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Orders", path: "/admin/orders", icon: "📦" },
    { name: "Users", path: "/admin/users", icon: "👥" },
  ];

  return (
    <div className="flex h-screen bg-neutral-900 text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <img src="/logo.svg" alt="Apple" className="w-5" />
            Admin
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname.includes(item.path)
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-neutral-950">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-black border-b border-white/10">
           <Link to="/" className="text-xl font-bold flex items-center gap-2">
            <img src="/logo.svg" alt="Apple" className="w-4" />
            Admin
          </Link>
           <button onClick={handleLogout} className="text-sm text-red-400">Logout</button>
        </header>

        {/* Mobile Nav */}
        <nav className="md:hidden flex overflow-x-auto p-4 gap-2 bg-neutral-900 border-b border-white/10 hide-scrollbar">
           {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                location.pathname.includes(item.path)
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 text-gray-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
