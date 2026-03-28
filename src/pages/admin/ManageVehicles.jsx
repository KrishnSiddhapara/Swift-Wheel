import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, Trash2, Car, MapPin, Power, Filter } from 'lucide-react';
import api from '../../api/axios';
import { motion } from 'framer-motion';

const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const { data } = await api.get('/admin/vehicles');
            setVehicles(data);
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (vehicleId, actionData, confirmMsg) => {
        if (!window.confirm(`Are you sure you want to ${confirmMsg}?`)) return;
        
        try {
            if (actionData.method === 'DELETE') {
                await api.delete(`/admin/vehicles/${vehicleId}`);
            } else {
                await api.put(`/admin/vehicles/${vehicleId}/status`, actionData.body);
            }
            fetchVehicles();
        } catch (error) {
            console.error(`Error processing vehicle action: ${confirmMsg}`, error);
        }
    };

    const filteredVehicles = vehicles.filter(v => {
        const matchesSearch = v.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (v.sellerId?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'All' || v.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    if (loading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Vehicles</h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text"
                            placeholder="Search vehicle or seller..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-gray-50/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select 
                            className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none appearance-none bg-gray-50/50"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Car">Cars</option>
                            <option value="Bike">Bikes</option>
                            <option value="Moped">Mopeds</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto w-full custom-scrollbar pb-4">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-gray-50/50 border-y border-gray-100 text-xs text-gray-500 uppercase tracking-widest">
                            <th className="p-4 font-semibold whitespace-nowrap">Vehicle Info</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Pricing</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Seller</th>
                            <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                            <th className="p-4 font-semibold text-right whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredVehicles.length > 0 ? filteredVehicles.map((vehicle, index) => (
                            <motion.tr 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                key={vehicle._id} 
                                className="hover:bg-blue-50/20 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                            {vehicle.images && vehicle.images[0] ? (
                                              <img src={vehicle.images[0].startsWith('/') ? `http://localhost:5000${vehicle.images[0]}` : vehicle.images[0]} alt={vehicle.vehicleName} className="w-full h-full object-cover" />
                                            ) : (
                                              <div className="w-full h-full flex items-center justify-center text-gray-400"><Car size={20} /></div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{vehicle.vehicleName}</div>
                                            <div className="text-xs text-blue-600 font-semibold">{vehicle.category} • {vehicle.brand}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><MapPin size={10} /> {vehicle.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-gray-900">₹{vehicle.pricePerDay}<span className="text-xs text-gray-500 font-normal">/day</span></div>
                                    <div className="text-xs font-semibold text-gray-500">₹{vehicle.pricePerHour}/hr</div>
                                </td>
                                <td className="p-4">
                                    <div className="text-sm font-medium text-gray-900">{vehicle.sellerId?.name || 'Unknown'}</div>
                                    <div className="text-xs text-gray-500">{vehicle.sellerId?.email || '-'}</div>
                                </td>
                                <td className="p-4 space-y-2">
                                    <div>
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${
                                            vehicle.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            vehicle.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                            {vehicle.status || 'Pending'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${
                                            vehicle.availability ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {vehicle.availability ? 'Available' : 'Unavailable'}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center justify-end gap-2 flex-wrap max-w-[150px] ml-auto">
                                        {(vehicle.status !== 'Approved') && (
                                            <button onClick={() => handleAction(vehicle._id, { method: 'PUT', body: { status: 'Approved' } }, 'approve this vehicle')} className="p-2 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 transition-all font-bold" title="Approve">
                                                <CheckCircle size={16} />
                                            </button>
                                        )}
                                        {(vehicle.status !== 'Rejected') && (
                                            <button onClick={() => handleAction(vehicle._id, { method: 'PUT', body: { status: 'Rejected' } }, 'reject this vehicle')} className="p-2 rounded-xl border border-amber-200 text-amber-600 hover:bg-amber-50 transition-all font-bold" title="Reject">
                                                <XCircle size={16} />
                                            </button>
                                        )}
                                        <button onClick={() => handleAction(vehicle._id, { method: 'PUT', body: { availability: !vehicle.availability } }, 'toggle availability')} className={`p-2 rounded-xl border transition-all ${vehicle.availability ? 'border-gray-200 text-gray-400 hover:text-gray-600' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`} title="Toggle Availability">
                                            <Power size={16} />
                                        </button>
                                        <button onClick={() => handleAction(vehicle._id, { method: 'DELETE' }, 'permanently delete this vehicle')} className="p-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-all font-bold" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        )) : (
                            <tr>
                                <td colSpan="5" className="p-12 text-center">
                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                        <Car size={48} className="text-gray-200 mb-4" />
                                        <p className="text-lg font-medium text-gray-800">No vehicles found</p>
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

export default ManageVehicles;
