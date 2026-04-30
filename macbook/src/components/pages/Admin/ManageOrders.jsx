import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
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

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10">
      <h2 className="text-2xl font-semibold mb-6 text-white">Quản lý Đơn hàng</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-300">
              <th className="p-3 font-medium">Order ID</th>
              <th className="p-3 font-medium">Khách hàng</th>
              <th className="p-3 font-medium">SĐT</th>
              <th className="p-3 font-medium">Tổng tiền</th>
              <th className="p-3 font-medium">Thanh toán</th>
              <th className="p-3 font-medium">Ngày đặt</th>
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
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">{o.payment_method}</span>
                </td>
                <td className="p-3 text-gray-400 text-sm">{new Date(o.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageOrders;
