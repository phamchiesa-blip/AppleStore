import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        navigate('/');
        return;
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        fetchUsers();
      } else {
        const errorData = await res.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10">
      <h2 className="text-2xl font-semibold mb-6 text-white">User management</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-gray-300">
              <th className="p-3 font-medium">ID</th>
              <th className="p-3 font-medium">Username</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-3 text-gray-400">{u.id}</td>
                <td className="p-3 text-gray-200">{u.username}</td>
                <td className="p-3 text-gray-300">{u.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${u.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {u.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {u.role !== 'admin' && (
                    <button
                      onClick={() => handleStatusChange(u.id, u.status === 'active' ? 'banned' : 'active')}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${u.status === 'active' ? 'bg-red-500/20 hover:bg-red-500/40 text-red-400' : 'bg-green-500/20 hover:bg-green-500/40 text-green-400'}`}
                    >
                      {u.status === 'active' ? 'Ban' : 'Unban'}
                    </button>
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

export default ManageUsers;
