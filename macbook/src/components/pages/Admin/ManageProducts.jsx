import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/admin/ipad', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        navigate('/');
        return;
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xoá sản phẩm này?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/ipad/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Quản lý Sản phẩm (iPad)</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Thêm iPad
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-300">
              <th className="p-3 font-medium">ID</th>
              <th className="p-3 font-medium">Tên iPad</th>
              <th className="p-3 font-medium">Giá</th>
              <th className="p-3 font-medium">Hình ảnh</th>
              <th className="p-3 font-medium text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-3 text-gray-400">{p.id}</td>
                <td className="p-3 text-gray-200 font-medium">{p.name}</td>
                <td className="p-3 text-gray-300">{p.price_string}</td>
                <td className="p-3">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="h-10 w-auto object-contain" />
                  ) : (
                    <span className="text-gray-500 text-sm">Chưa có ảnh</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  <button className="text-blue-400 hover:text-blue-300 px-2 py-1 mr-2 text-sm font-medium">Sửa</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 px-2 py-1 text-sm font-medium">Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageProducts;
