import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../../../store/authStore';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Login successfully!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/'); // Redirect to Home
      } else {
        toast.error(data.message || 'Login Error');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error connect server');
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-y-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] w-full max-w-md my-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white-900 tracking-tight">Login an Apple account</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white-900 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white-900 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full py-3 mt-4 rounded-lg 
          bg-gradient-to-r from-blue-500 to-indigo-500 
          text-white font-medium
          transition-all duration-300
          hover:from-blue-600 hover:to-indigo-600
          hover:scale-[1.02]
          active:scale-[0.98]
          shadow-lg hover:shadow-blue-500/30">
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white-900">
          New user of Apple?{' '}
          <Link to="/signup" className="text-blue-400 font-medium cursor-pointer hover:underline">Create an account now!</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
