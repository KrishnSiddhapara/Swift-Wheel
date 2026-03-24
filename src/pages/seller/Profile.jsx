import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { User, Mail, Phone, MapPin, KeyRound, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', city: '' });
  const [password, setPassword] = useState({ newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/auth/profile');
        setProfile({ name: data.name || '', email: data.email || '', phone: data.phone || '', city: data.city || '' });
      } catch (err) {
        setError('Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      await api.put('/auth/profile', profile);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      setMessage('');
      setError('');
      await api.put('/auth/password', { password: password.newPassword });
      setMessage('Password updated successfully!');
      setPassword({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating password');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Profile Settings</h1>

      {message && <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-200">{message}</div>}
      {error && <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><User size={20} className="text-emerald-600" /> Personal Information</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><User size={18} /></span>
                <input type="text" className="pl-10 w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Mail size={18} /></span>
                <input type="email" className="pl-10 w-full rounded-xl border border-gray-300 px-4 py-2.5 bg-gray-50 outline-none text-gray-500 text-sm cursor-not-allowed" value={profile.email} disabled />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Phone size={18} /></span>
                <input type="text" className="pl-10 w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><MapPin size={18} /></span>
                <input type="text" className="pl-10 w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} />
              </div>
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-4 rounded-xl font-medium transition-colors shadow-md shadow-emerald-500/20">
              <Save size={18} /> Update Profile
            </button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><KeyRound size={20} className="text-emerald-600" /> Change Password</h2>
          <form onSubmit={handlePasswordUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm" value={password.newPassword} onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} required minLength="6" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm" value={password.confirmPassword} onChange={(e) => setPassword({ ...password, confirmPassword: e.target.value })} required minLength="6" />
            </div>
            <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 px-4 rounded-xl font-medium transition-colors">
              Update Password
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
