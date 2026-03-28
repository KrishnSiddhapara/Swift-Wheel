import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, Trash2, ShieldCheck } from 'lucide-react';
import api from '../../api/axios';
import { motion } from 'framer-motion';

const ManageSellers = () => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchSellers();
    }, []);

    const fetchSellers = async () => {
        try {
            const { data } = await api.get('/admin/sellers');
            setSellers(data);
        } catch (error) {
            console.error("Error fetching sellers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (sellerId, actionType) => {
        const confirmMsg = actionType === 'delete' 
            ? "permanently delete this seller account?" 
            : `${actionType} this seller?`;
            
        if (window.confirm(`Are you sure you want to ${confirmMsg}`)) {
            try {
                if (actionType === 'delete') {
                    await api.delete(`/admin/sellers/${sellerId}`);
                } else if (actionType === 'approve') {
                    await api.put(`/admin/sellers/${sellerId}/approve`);
                } else if (actionType === 'reject') {
                    await api.put(`/admin/sellers/${sellerId}/reject`);
                }
                fetchSellers();
            } catch (error) {
                console.error(`Error processing seller action: ${actionType}`, error);
            }
        }
    };

    const filteredSellers = sellers.filter(seller => 
        seller.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        seller.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Sellers</h2>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search seller..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-gray-50/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto w-full custom-scrollbar pb-4">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className="bg-gray-50/50 border-y border-gray-100 text-xs text-gray-500 uppercase tracking-widest">
                            <th className="p-4 font-semibold whitespace-nowrap">Seller Name</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Contact Email</th>
                            <th className="p-4 font-semibold whitespace-nowrap">City</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                            <th className="p-4 font-semibold text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredSellers.length > 0 ? filteredSellers.map((seller, index) => (
                            <motion.tr 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={seller._id} 
                                className="hover:bg-blue-50/20 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                                            {seller.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="font-bold text-gray-900">{seller.name}</div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm font-medium text-gray-900">{seller.email}</div>
                                    <div className="text-xs text-gray-500">{seller.phone || '-'}</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm font-medium text-gray-800">{seller.city || 'N/A'}</div>
                                </td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full flex w-max items-center gap-1.5 ${
                                        seller.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                        seller.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                        seller.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                            seller.status === 'Approved' ? 'bg-green-500' :
                                            seller.status === 'Rejected' ? 'bg-red-500' :
                                            seller.status === 'Pending' ? 'bg-amber-500' : 'bg-blue-500'
                                        }`}></div>
                                        {seller.status || 'Active'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end gap-2">
                                        {(seller.status === 'Pending' || seller.status === 'Rejected' || !seller.status || seller.status === 'Active') && (
                                            <button 
                                                onClick={() => handleAction(seller._id, 'approve')}
                                                title="Approve Seller"
                                                className="p-2 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 transition-all flex items-center gap-1 text-xs font-bold"
                                            >
                                                <CheckCircle size={16} /> <span className="hidden xl:inline">Approve</span>
                                            </button>
                                        )}
                                        {(seller.status === 'Pending' || seller.status === 'Approved' || !seller.status || seller.status === 'Active') && (
                                            <button 
                                                onClick={() => handleAction(seller._id, 'reject')}
                                                title="Reject Seller"
                                                className="p-2 rounded-xl border border-amber-200 text-amber-600 hover:bg-amber-50 transition-all flex items-center gap-1 text-xs font-bold"
                                            >
                                                <XCircle size={16} /> <span className="hidden xl:inline">Reject</span>
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleAction(seller._id, 'delete')}
                                            title="Delete Seller"
                                            className="p-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="p-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <ShieldCheck size={48} className="text-gray-200 mb-4" />
                                        <p className="text-lg font-medium text-gray-800">No sellers strictly matched</p>
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

export default ManageSellers;
