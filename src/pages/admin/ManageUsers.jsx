import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, CheckCircle, Trash2, Filter } from 'lucide-react';
import api from '../../api/axios';
import { motion } from 'framer-motion';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlockUnblock = async (userId) => {
        try {
            await api.put(`/admin/users/${userId}/block`);
            fetchUsers();
        } catch (error) {
            console.error("Error toggling block status", error);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to permanently delete this user?")) {
            try {
                await api.delete(`/admin/users/${userId}`);
                fetchUsers();
            } catch (error) {
                console.error("Error deleting user", error);
            }
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Users</h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Search name or email..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-gray-50/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select 
                            className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none appearance-none bg-gray-50/50"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto w-full custom-scrollbar pb-4">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-gray-50/50 border-y border-gray-100 text-xs text-gray-500 uppercase tracking-widest">
                            <th className="p-4 font-semibold whitespace-nowrap">User Name</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Contact</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Role</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                            <th className="p-4 font-semibold text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                            <motion.tr 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={user._id} 
                                className="hover:bg-blue-50/20 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="font-bold text-gray-900">{user.name}</div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm font-medium text-gray-900">{user.email}</div>
                                    <div className="text-xs text-gray-500">{user.phone || 'No phone'}</div>
                                </td>
                                <td className="p-4">
                                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700 capitalize">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full flex w-max items-center gap-1.5 ${
                                        user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        {user.status || 'Active'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button 
                                            onClick={() => handleBlockUnblock(user._id)}
                                            title={user.status === 'Blocked' ? "Unblock User" : "Block User"}
                                            className={`p-2 rounded-xl border transition-all ${user.status === 'Blocked' ? 'text-green-600 border-green-200 hover:bg-green-50' : 'text-amber-500 border-amber-200 hover:bg-amber-50'}`}
                                        >
                                            {user.status === 'Blocked' ? <CheckCircle size={18} /> : <ShieldAlert size={18} />}
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user._id)}
                                            title="Delete User"
                                            className="p-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="p-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <Search size={48} className="text-gray-200 mb-4" />
                                        <p className="text-lg font-medium text-gray-800">No users found</p>
                                        <p className="text-sm">Try adjusting your search criteria</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
