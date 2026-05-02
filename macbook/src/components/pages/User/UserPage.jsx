import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import useAuthStore from '../../../store/authStore';

/* ————————————————— Small icon components —————————————————————— */
const Icon = ({ children, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        strokeLinejoin="round" className={`w-5 h-5 ${className}`}>
        {children}
    </svg>
);

const UserIcon = () => <Icon><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></Icon>;
const MailIcon = () => <Icon><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Icon>;
const PhoneIcon = () => <Icon><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.05 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.32-1.34a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></Icon>;
const MapIcon = () => <Icon><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Icon>;
const NameIcon = () => <Icon><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></Icon>;
const ShoppingBagIcon = () => <Icon><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" x2="21" y1="6" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></Icon>;
const PencilIcon = () => <Icon><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></Icon>;
const CheckIcon = () => <Icon><path d="M20 6 9 17l-5-5" /></Icon>;
const XIcon = () => <Icon><path d="M18 6 6 18M6 6l12 12" /></Icon>;
const PictureIcon = () => <Icon><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></Icon>;


/* ————————————————— Info Field (view mode) ———————————————————————————————————————————————— */
const ProfileField = ({ icon, label, value }) => (
    <div className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-200">
        <div className="mt-0.5 w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-white/12 transition-colors">
            {icon}
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-1">{label}</p>
            {value
                ? <p className="text-[15px] text-white font-medium leading-snug break-words">{value}</p>
                : <p className="text-[15px] text-gray-600 italic">Not updated</p>}
        </div>
    </div>
);

/* ————————————————— Edit Field ———————————————————————————————————————————————————————————— */
const EditField = ({ icon, label, name, value, onChange, type = 'text', multiline = false, readOnly = false }) => (
    <div className="flex items-start gap-4">
        <div className="mt-3 w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center text-gray-400 shrink-0">
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-[11px] uppercase tracking-widest font-semibold text-gray-500 mb-2">{label}</p>
            {multiline
                ? <textarea name={name} value={value} onChange={onChange} rows={3} readOnly={readOnly}
                    placeholder={`Enter ${label.toLowerCase()}...`}
                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white outline-none transition-all resize-none placeholder-gray-600 ${!readOnly && 'focus:border-blue-500/70 focus:bg-white/8'}`} />
                : <input type={type} name={name} value={value} onChange={onChange} readOnly={readOnly}
                    placeholder={`Enter ${label.toLowerCase()}...`}
                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white outline-none transition-all placeholder-gray-600 ${!readOnly && 'focus:border-blue-500/70 focus:bg-white/8'}`} />
            }
        </div>
    </div>
);

/* ————————————————— Avatar initials ———————————————————————————————————————————————————————— */
const Avatar = ({ user, onClickEdit }) => {
    const initials = user.full_name
        ? user.full_name.trim().split(' ').map(w => w[0]).slice(0, 2).join('')
        : (user.username || 'U')[0];
    return (
        <div className="relative shrink-0 group cursor-pointer" onClick={onClickEdit}>
            {user.avatar_url ? (
                <img src={`http://localhost:5000${user.avatar_url}`} alt="Avatar" className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white/10" />
            ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-white select-none border-2 border-white/10"
                    style={{ background: 'linear-gradient(135deg,#0094FF 0%,#7B61FF 50%,#FF375F 100%)' }}>
                    {initials.toUpperCase()}
                </div>
            )}
            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PencilIcon />
            </div>
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#111]" />
        </div>
    );
};

/* ————————————————— Order Status Badge ————————————————————————————————————————————————————— */
const StatusBadge = ({ status }) => {
    const isDelivered = status === 'Delivered';
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${isDelivered ? 'bg-green-500/15 text-green-400 border border-green-500/25' : 'bg-blue-500/15 text-blue-400 border border-blue-500/25'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isDelivered ? 'bg-green-400' : 'bg-blue-400 animate-pulse'}`} />
            {status}
        </span>
    );
};

/* ═════════════════════════════════════════════════════════════════════════════════════════════ */
const UserPage = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ full_name: '', phone: '', address: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [showAvatarPopup, setShowAvatarPopup] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { setUser: setGlobalUser } = useAuthStore();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            const parsedUser = JSON.parse(storedUser);
            fetchUserProfile(parsedUser.id);
            fetchOrders(parsedUser.id);
        } else {
            navigate('/login');
        }
        window.scrollTo(0, 0);
    }, [navigate]);

    const fetchUserProfile = async (userId) => {
        try {
            const r = await fetch(`http://localhost:5000/api/users/${userId}`);
            if (r.ok) {
                const data = await r.json();
                setUser(data);
                setGlobalUser(data);
                setEditForm({ full_name: data.full_name || '', phone: data.phone || '', address: data.address || '' });
                localStorage.setItem('user', JSON.stringify(data));
            } else if (r.status === 404) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setGlobalUser(null);
                navigate('/login');
            }
        } catch (e) { console.error(e); }
    };

    const fetchOrders = async (userId) => {
        try {
            const r = await fetch(`http://localhost:5000/api/orders/user/${userId}`);
            if (r.ok) {
                const data = await r.json();
                setOrders(Array.isArray(data) ? data : []);
            } else {
                setOrders([]);
            }
        } catch (e) { setOrders([]); }
        finally { setLoading(false); }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            const r = await fetch(`http://localhost:5000/api/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });
            if (r.ok) {
                const data = await r.json();
                setUser(data.user);
                setGlobalUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user));
                setIsEditing(false);
            }
        } catch (e) { console.error(e); }
        finally { setIsSaving(false); }
    };

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0];
        if (!file || !user) return;

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const r = await fetch(`http://localhost:5000/api/users/${user.id}/avatar`, {
                method: 'POST',
                body: formData,
            });
            if (r.ok) {
                const data = await r.json();
                const updatedUser = { ...user, avatar_url: data.avatar_url };
                setUser(updatedUser);
                setGlobalUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setShowAvatarPopup(false);
            }
        } catch (e) {
            console.error('Failed to upload avatar', e);
        }
    };

    const handleDeletePhoto = async () => {
        if (!user || !user.avatar_url) return;
        try {
            const r = await fetch(`http://localhost:5000/api/users/${user.id}/avatar`, {
                method: 'DELETE',
            });
            if (r.ok) {
                const updatedUser = { ...user, avatar_url: null };
                setUser(updatedUser);
                setGlobalUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setShowAvatarPopup(false);
            }
        } catch (e) {
            console.error('Failed to delete avatar', e);
        }
    };

    if (!user) return null;

    const memberSince = new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

    return (
        <div className="bg-[#111] min-h-screen text-white overflow-x-hidden" style={{ fontFamily: 'var(--font-regular, sans-serif)' }}>
            <Navbar />

            {/* —— Hero Banner —— */}
            <div className="relative pt-[64px]">
                <div className="h-52 md:h-64 w-full"
                    style={{ background: 'linear-gradient(135deg,#070B18 0%,#0D1B3E 40%,#1A0A2E 70%,#0A2414 100%)' }}>
                    <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
                        style={{ background: 'radial-gradient(circle,#0094FF,transparent 70%)' }} />
                    <div className="absolute top-0 right-1/4 w-56 h-56 rounded-full opacity-15 blur-3xl pointer-events-none"
                        style={{ background: 'radial-gradient(circle,#7B61FF,transparent 70%)' }} />
                </div>

                {/* —— Profile Header —— */}
                <div className="max-w-5xl mx-auto px-5 -mt-12 flex flex-col sm:flex-row items-start sm:items-end gap-5 relative">
                    <Avatar user={user} onClickEdit={() => setShowAvatarPopup(!showAvatarPopup)} />

                    {/* AVATAR POPUP */}
                    {showAvatarPopup && (
                        <div className="absolute top-[80px] left-0 z-50 bg-white rounded-xl shadow-xl w-48 overflow-hidden border border-gray-200">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleUploadPhoto}
                            />
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="w-full flex items-center gap-3 px-4 py-3 text-black hover:bg-gray-100 transition-colors border-b border-gray-200 text-sm font-medium"
                            >
                                <PictureIcon /> Upload photo
                            </button>
                            <button
                                onClick={handleDeletePhoto}
                                disabled={!user.avatar_url}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${user.avatar_url ? 'text-red-500 hover:bg-red-50 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
                            >
                                <XIcon /> Delete photo
                            </button>
                        </div>
                    )}

                    <div className="flex-1 pb-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            {user.full_name || user.username}
                        </h1>
                        <p className="text-gray-400 text-sm mt-0.5">@{user.username} · Member since {memberSince}</p>
                    </div>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)}
                            className="mb-2 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                            <PencilIcon />
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* —— Tab Bar —— */}
            <div className="max-w-5xl mx-auto px-5 mt-8">
                <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    {['profile', 'orders'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                            {tab === 'profile' ? 'Profile' : `Orders (${orders.length})`}
                        </button>
                    ))}
                </div>
            </div>

            {/* —— Main Content —— */}
            <div className="max-w-5xl mx-auto px-5 mt-6 pb-24">
                {/* ══ PROFILE TAB ══ */}
                {activeTab === 'profile' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Left: info card */}
                        <div className="md:col-span-2 rounded-3xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8">
                                <h2 className="text-base font-semibold text-white">Personal Information</h2>
                                {isEditing && (
                                    <div className="flex gap-2">
                                        <button onClick={() => setIsEditing(false)} disabled={isSaving}
                                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                                            style={{ background: 'rgba(255,255,255,0.08)' }}>
                                            <XIcon />Cancel
                                        </button>
                                        <button onClick={handleSaveProfile} disabled={isSaving}
                                            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white transition-all hover:brightness-110"
                                            style={{ background: 'linear-gradient(135deg,#007AFF,#5856D6)' }}>
                                            {isSaving
                                                ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                : <><CheckIcon />Save</>}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 space-y-1">
                                {isEditing ? (
                                    <div className="space-y-4 p-2">
                                        <EditField icon={<UserIcon />} label="Username" name="_username" value={user.username} readOnly />
                                        <EditField icon={<MailIcon />} label="Email" name="_email" value={user.email} type="email" readOnly />
                                        <div className="border-t border-white/8 my-2" />
                                        <EditField icon={<NameIcon />} label="Full Name" name="full_name" value={editForm.full_name} onChange={handleInputChange} />
                                        <EditField icon={<PhoneIcon />} label="Phone Number" name="phone" value={editForm.phone} onChange={handleInputChange} type="tel" />
                                        <EditField icon={<MapIcon />} label="Address" name="address" value={editForm.address} onChange={handleInputChange} multiline />
                                    </div>
                                ) : (
                                    <>
                                        <ProfileField icon={<UserIcon />} label="Username" value={user.username} />
                                        <ProfileField icon={<MailIcon />} label="Email Address" value={user.email} />
                                        <ProfileField icon={<NameIcon />} label="Full Name" value={user.full_name} />
                                        <ProfileField icon={<PhoneIcon />} label="Phone Number" value={user.phone} />
                                        <ProfileField icon={<MapIcon />} label="Address" value={user.address} />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Right: Stats card */}
                        <div className="flex flex-col gap-4">
                            <div className="rounded-3xl p-6 flex flex-col gap-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Overview</h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">Total Orders</span>
                                        <span className="text-xl font-bold text-white">{orders.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">Delivered</span>
                                        <span className="text-xl font-bold text-green-400">{orders.filter(o => o.status === 'Delivered').length}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">In Transit</span>
                                        <span className="text-xl font-bold text-blue-400">{orders.filter(o => o.status !== 'Delivered').length}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl p-6" style={{ background: 'linear-gradient(135deg,rgba(0,122,255,0.15),rgba(88,86,214,0.15))', border: '1px solid rgba(0,122,255,0.2)' }}>
                                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-2">Account</p>
                                <p className="text-sm text-gray-300 leading-relaxed">Manage all your information and orders here.</p>
                                <button onClick={() => setActiveTab('orders')}
                                    className="mt-4 w-full py-2 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
                                    style={{ background: 'rgba(0,122,255,0.3)', border: '1px solid rgba(0,122,255,0.4)' }}>
                                    View orders →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ══ ORDERS TAB ══ */}
                {activeTab === 'orders' && (
                    <div>
                        {loading ? (
                            <div className="flex justify-center items-center h-56">
                                <div className="w-10 h-10 border-2 border-white/10 border-t-white rounded-full animate-spin" />
                            </div>
                        ) : orders.length > 0 ? (
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order.id}
                                        className="group rounded-3xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all duration-300 cursor-pointer hover:scale-[1.01]"
                                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                                        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}>

                                        {/* Product image thumbnail */}
                                        <div className="w-24 h-24 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-500 group-hover:scale-105"
                                            style={{ background: 'rgba(255,255,255,0.06)' }}>
                                            <ShoppingBagIcon />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 space-y-1.5">
                                            <div className="flex flex-wrap items-start gap-3 justify-between">
                                                <h3 className="text-lg font-bold text-white leading-tight">{order.product_name}</h3>
                                                <StatusBadge status={order.status} />
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                Ordered on {new Date(order.order_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-2xl font-bold text-white">{order.price_string}</span>
                                                <button onClick={() => setSelectedOrder(order)} className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
                                                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
                                                    Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-28 text-center rounded-3xl"
                                style={{ border: '1px dashed rgba(255,255,255,0.1)' }}>
                                <div className="w-20 h-20 rounded-full flex items-center justify-center text-gray-600 mb-6"
                                    style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <ShoppingBagIcon />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
                                <p className="text-gray-500 max-w-xs mb-8">When you purchase Apple products, your orders will appear here.</p>
                                <button onClick={() => navigate('/')}
                                    className="px-8 py-3 rounded-full font-semibold text-sm text-black bg-white hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
                                    Explore products
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* —— Order Details Modal —— */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}>
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold text-white">Order Details <span className="text-gray-500 text-sm font-normal">#{selectedOrder.id}</span></h2>
                            <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors">
                                <XIcon />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                            {/* Status & General Info */}
                            <div className="bg-white/5 rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</p>
                                    <StatusBadge status={selectedOrder.status} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Date</p>
                                    <p className="text-sm font-medium text-white">{new Date(selectedOrder.order_date).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
                                    <p className="text-sm font-bold text-white">{selectedOrder.price_string}</p>
                                </div>
                            </div>

                            {/* Customer Details */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Shipping Information</h3>
                                <div className="bg-white/5 rounded-xl p-4 space-y-3 text-sm">
                                    <div className="flex gap-2">
                                        <span className="text-gray-500 w-24 shrink-0">Name:</span>
                                        <span className="text-white font-medium">{selectedOrder.customer_name || 'N/A'}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-gray-500 w-24 shrink-0">Phone:</span>
                                        <span className="text-white font-medium">{selectedOrder.phone || 'N/A'}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-gray-500 w-24 shrink-0">Address:</span>
                                        <span className="text-white font-medium leading-relaxed">{selectedOrder.address || 'N/A'}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-gray-500 w-24 shrink-0">Payment:</span>
                                        <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded text-xs font-semibold">{selectedOrder.payment_method || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                                        selectedOrder.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
                                                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center p-2 shrink-0">
                                                    <ShoppingBagIcon />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-white font-bold text-sm truncate">{item.product_name || item.name}</h4>
                                                    <p className="text-gray-400 text-xs mt-1">Qty: {item.quantity}</p>
                                                    <p className="text-blue-400 font-semibold text-sm mt-1">${item.product_price || item.price}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm italic">No items found.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/10 text-right">
                            <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default UserPage;
