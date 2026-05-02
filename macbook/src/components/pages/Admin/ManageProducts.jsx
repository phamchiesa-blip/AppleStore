import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    category: 'ipad',
    name: '',
    description: '',
    base_price: '',
    image_url: '',
    options: ''
  });

  const categories = ['All', 'mac', 'iphone', 'ipad', 'airpods', 'watch', 'tvhome'];

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
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

  const openAddModal = () => {
    setEditId(null);
    setFormData({
      category: selectedCategory === 'All' ? 'ipad' : selectedCategory,
      name: '',
      description: '',
      base_price: '',
      image_url: '',
      options: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditId(p.id);
    setFormData({
      category: p.category || 'ipad',
      name: p.name || '',
      description: p.description || '',
      base_price: p.base_price || '',
      image_url: p.image_url || '',
      options: typeof p.options === 'object' ? JSON.stringify(p.options) : (p.options || '')
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // Attempt to parse options if provided
    let parsedOptions = {};
    if (formData.options.trim()) {
      try {
        parsedOptions = JSON.parse(formData.options);
      } catch (err) {
        alert("Invalid JSON format in Options field");
        return;
      }
    }

    const payload = {
      ...formData,
      options: parsedOptions
    };

    try {
      const url = editId
        ? `http://localhost:5000/api/admin/ipad/${editId}`
        : 'http://localhost:5000/api/admin/ipad';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the product.');
    }
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Product Management</h2>
        <button
          onClick={openAddModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Product
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === cat
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
          >
            {cat === 'All' ? 'All Products' : cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-300">
              <th className="p-3 font-medium">ID</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Product Name</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Image</th>
              <th className="p-3 font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredProducts) && filteredProducts.map(p => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-3 text-gray-400">{p.id}</td>
                <td className="p-3 text-gray-400 uppercase text-xs font-semibold tracking-wider">{p.category}</td>
                <td className="p-3 text-gray-200 font-medium">{p.name}</td>
                <td className="p-3 text-gray-300">{p.price_string || `$${p.base_price}`}</td>
                <td className="p-3">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="h-10 w-auto object-contain" />
                  ) : (
                    <span className="text-gray-500 text-sm">No image</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  <button onClick={() => openEditModal(p)} className="text-blue-400 hover:text-blue-300 px-2 py-1 mr-2 text-sm font-medium">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 px-2 py-1 text-sm font-medium">Delete</button>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No products found in this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1c1c1e] p-6 rounded-xl w-full max-w-lg border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-white mb-4">
              {editId ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-white"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Product Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Base Price ($)</label>
                <input required type="number" step="0.01" value={formData.base_price} onChange={(e) => setFormData({ ...formData, base_price: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                <input type="text" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" placeholder="/images/example.png or http..." />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white" rows="2"></textarea>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Options (JSON string)</label>
                <textarea value={formData.options} onChange={(e) => setFormData({ ...formData, options: e.target.value })} className="w-full bg-black border border-white/10 rounded-lg p-2 text-white font-mono text-sm" rows="4" placeholder='{"models": ["11-inch"], "colors": ["Silver"]}'></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
                  {editId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageProducts;
