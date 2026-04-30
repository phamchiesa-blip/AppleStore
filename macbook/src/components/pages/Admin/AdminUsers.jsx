import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role: newRole })
      });
      const data = await response.json();
      if (data.success) {
        toast.success("User role updated!");
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      toast.error("Error updating role");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        toast.success("User status updated!");
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">User Management</h1>
      
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">User Info</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-gray-400 font-medium">#{u.id}</td>
                  <td className="p-4">
                    <p className="text-white font-medium">{u.username}</p>
                    <p className="text-sm text-gray-400">{u.email}</p>
                  </td>
                  <td className="p-4">
                    {/* Role Select */}
                    <select 
                      value={u.role}
                      disabled={u.id === currentUser.id} // Don't let admin demote themselves
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className={`bg-neutral-900 border ${u.role === 'admin' ? 'border-purple-500/50 text-purple-400' : 'border-white/10 text-gray-300'} text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2 outline-none ${u.id === currentUser.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">
                    {/* Status Select */}
                    <select 
                      value={u.status}
                      disabled={u.id === currentUser.id}
                      onChange={(e) => handleStatusChange(u.id, e.target.value)}
                      className={`bg-neutral-900 border ${u.status === 'banned' ? 'border-red-500/50 text-red-400' : 'border-emerald-500/50 text-emerald-400'} text-sm rounded-lg block p-2 outline-none ${u.id === currentUser.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <option value="active">Active</option>
                      <option value="banned">Banned</option>
                    </select>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
