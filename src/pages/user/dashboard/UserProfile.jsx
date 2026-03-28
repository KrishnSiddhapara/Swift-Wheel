import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import api from '../../../api/axios';
import { useData } from '../../../context/DataProvider';

const UserProfile = () => {
    const { user: contextUser } = useData();
    const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
    const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    
    const [loading, setLoading] = useState(true);
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);
    
    const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
    const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/auth/profile');
                setProfile({
                    name: data.name || '',
                    email: data.email || '',
                    phone: data.phone || ''
                });
            } catch (error) {
                console.error("Error fetching profile:", error);
                setProfileMsg({ type: 'error', text: 'Failed to load profile data.' });
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        setProfileMsg({ type: '', text: '' });
        
        try {
            await api.put('/auth/profile', profile);
            setProfileMsg({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setProfileMsg({ type: 'error', text: error.response?.data?.message || 'Failed to update profile.' });
        } finally {
            setSavingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordMsg({ type: '', text: '' });

        if (passwords.newPassword !== passwords.confirmPassword) {
            return setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
        }
        if (passwords.newPassword.length < 6) {
            return setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
        }

        setSavingPassword(true);
        try {
            await api.put('/auth/password', {
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword
            });
            setPasswordMsg({ type: 'success', text: 'Password changed successfully!' });
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            setPasswordMsg({ type: 'error', text: error.response?.data?.message || 'Failed to change password.' });
        } finally {
            setSavingPassword(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    }

    const AlertMessage = ({ msg }) => {
        if (!msg.text) return null;
        const isError = msg.type === 'error';
        return (
            <div className={`p-4 rounded-xl flex items-center gap-3 mb-6 ${isError ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                {isError ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                <p className="font-medium text-sm">{msg.text}</p>
            </div>
        );
    };

    return (
        <div className="space-y-8 animate-fadeIn max-w-4xl">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Profile</h1>
                <p className="text-gray-500 mt-1">Manage your personal information and security settings.</p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
                {/* Profile Information Form */}
                <div className="md:col-span-3 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <User className="text-blue-600" /> Personal Information
                    </h2>
                    
                    <AlertMessage msg={profileMsg} />

                    <form onSubmit={handleProfileSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-gray-400" />
                                </div>
                                <input 
                                    type="text" 
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail size={18} className="text-gray-400" />
                                </div>
                                <input 
                                    type="email" 
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone size={18} className="text-gray-400" />
                                </div>
                                <input 
                                    type="tel" 
                                    value={profile.phone}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={savingProfile}
                                className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {savingProfile ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save size={18} />}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Password Change Form */}
                <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 h-max">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Lock className="text-gray-800" /> Security
                    </h2>

                    <AlertMessage msg={passwordMsg} />

                    <form onSubmit={handlePasswordSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Password</label>
                            <input 
                                type="password" 
                                value={passwords.currentPassword}
                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                required
                                className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800/20 focus:border-gray-800 transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">New Password</label>
                            <input 
                                type="password" 
                                value={passwords.newPassword}
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                required
                                minLength={6}
                                className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800/20 focus:border-gray-800 transition-all outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm New Password</label>
                            <input 
                                type="password" 
                                value={passwords.confirmPassword}
                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                required
                                minLength={6}
                                className="block w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-800/20 focus:border-gray-800 transition-all outline-none"
                            />
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit" 
                                disabled={savingPassword}
                                className="w-full px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {savingPassword ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Lock size={18} />}
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
