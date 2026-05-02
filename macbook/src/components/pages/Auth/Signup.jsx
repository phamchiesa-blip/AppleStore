import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../../../store/authStore';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password did not match when re-entered!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Sign up successfully!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        navigate('/');
      } else {
        toast.error(data.message || 'Error Sign Up');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error connect server');
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-y-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] w-full max-w-md my-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white-900 tracking-tight">Create an Apple account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white-900 mb-1">User name</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
              placeholder="FirstName LastName"
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium text-white-900 mb-1">Enter password again!</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-white-900">
          Already have an Apple ID?{' '}
          <Link to="/login" className="text-blue-400 font-medium cursor-pointer hover:underline">Sign In.</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
