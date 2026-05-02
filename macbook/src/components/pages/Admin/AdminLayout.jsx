import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import ManageUsers from './ManageUsers';
import ManageOrders from './ManageOrders';
import ManageProducts from './ManageProducts';

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'admin') {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsAdmin(true);
      } else {
        navigate('/'); // Không phải admin -> về trang chủ
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!isAdmin) return null; // Không render gì cả trong lúc đợi chuyển hướng

  const navItems = [
    { path: '/admin/users', label: 'User Management', icon: '👤' },
    { path: '/admin/orders', label: 'Order Management', icon: '📦' },
    { path: '/admin/products', label: 'Product Management', icon: '💻' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex pt-14">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-white/10 hidden md:block">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">ADMIN PANEL</h2>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${location.pathname.startsWith(item.path)
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Render child routes */}
        <Routes>
          <Route path="/" element={
            <div className="text-center mt-20">
              <h1 className="text-4xl font-bold text-gray-300">Welcome to Admin Dashboard</h1>
              <p className="text-gray-500 mt-4 text-lg">Please select a function in the sidebar on the left</p>
            </div>
          } />
          <Route path="users" element={<ManageUsers />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="products" element={<ManageProducts />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminLayout;
