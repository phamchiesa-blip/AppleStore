import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        navigate('/');
        return;
      }
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'Delivering': return 'bg-blue-500/20 text-blue-400';
      case 'Delivered': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10">
      <h2 className="text-2xl font-semibold mb-6 text-white">Order Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-300">
              <th className="p-3 font-medium">Order ID</th>
              <th className="p-3 font-medium">Customer</th>
              <th className="p-3 font-medium">Phone</th>
              <th className="p-3 font-medium">Total Price</th>
              <th className="p-3 font-medium">Payment Method</th>
              <th className="p-3 font-medium">Order Date</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-3 text-gray-400">#{o.id}</td>
                <td className="p-3 text-gray-200">{o.customer_name}</td>
                <td className="p-3 text-gray-400">{o.phone}</td>
                <td className="p-3 text-white font-medium">${o.total_price}</td>
                <td className="p-3 text-gray-300">
                  <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded text-xs">{o.payment_method}</span>
                </td>
                <td className="p-3 text-gray-400 text-sm">{new Date(o.created_at).toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(o.status || 'Pending')}`}>
                    {o.status || 'Pending'}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {(o.status === 'Pending' || !o.status) && (
                    <button
                      onClick={() => updateStatus(o.id, 'Delivering')}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                  {o.status === 'Delivering' && (
                    <button
                      onClick={() => updateStatus(o.id, 'Delivered')}
                      className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                    >
                      Completed
                    </button>
                  )}
                  {o.status === 'Delivered' && (
                    <span className="text-gray-500 text-xs italic">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageOrders;
