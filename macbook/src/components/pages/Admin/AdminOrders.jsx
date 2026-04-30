import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Order status updated!");
        fetchOrders();
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/20';
      case 'Processing': return 'bg-blue-500/20 text-blue-500 border-blue-500/20';
      case 'Shipped': return 'bg-purple-500/20 text-purple-500 border-purple-500/20';
      case 'Delivered': return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20';
      case 'Cancelled': return 'bg-red-500/20 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">Order Management</h1>
      
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Total Price</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-white font-medium">#{order.id}</td>
                  <td className="p-4">
                    <p className="text-white">{order.customer_name}</p>
                    <p className="text-sm text-gray-400">{order.phone}</p>
                  </td>
                  <td className="p-4 text-white">${Number(order.total_price).toLocaleString()}</td>
                  <td className="p-4 text-gray-400">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4">
                    <select 
                      value={order.status || 'Pending'}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-neutral-900 border border-white/10 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2 outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
