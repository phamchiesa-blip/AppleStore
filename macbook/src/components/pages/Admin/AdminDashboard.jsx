import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: "👥", color: "bg-blue-500/10 text-blue-500" },
    { title: "Total Orders", value: stats.totalOrders, icon: "📦", color: "bg-purple-500/10 text-purple-500" },
    { title: "Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: "💰", color: "bg-emerald-500/10 text-emerald-500" },
    { title: "Products (iPad)", value: stats.totalProducts, icon: "📱", color: "bg-orange-500/10 text-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm text-gray-400 font-medium">{card.title}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[300px] flex items-center justify-center">
         <p className="text-gray-400">Charts & Analytics can be placed here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
