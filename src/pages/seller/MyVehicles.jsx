import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Search, PlusCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { useModal } from '../../context/ModalContext';
import Pagination from '../../components/Pagination';

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || 'http://localhost:5000';

const MyVehicles = () => {
    const { showAlert, showConfirm } = useModal();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: itemsPerPage,
                search: searchTerm
            };
            const { data } = await api.get('/seller/vehicles', { params });
            setVehicles(data.data);
            setTotalPages(data.totalPages);
            setTotalItems(data.totalItems);
        } catch (err) {
            showAlert('Failed to fetch vehicles', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchVehicles();
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [currentPage, searchTerm]);

    const toggleAvailability = async (id, currentStatus) => {
        try {
            await api.put(`/seller/vehicles/${id}`, { availability: !currentStatus });
            setVehicles(vehicles.map(v => v._id === id ? { ...v, availability: !currentStatus } : v));
            showAlert(`Vehicle marked as ${!currentStatus ? 'Available' : 'Unavailable'}`, 'success');
        } catch (err) {
            showAlert('Failed to update availability', 'error');
        }
    };

    const deleteVehicle = async (id) => {
        const confirmed = await showConfirm(
            'Are you sure you want to delete this vehicle? This action cannot be undone.', 
            'Delete Vehicle', 
            'warning'
        );
        if (!confirmed) return;

        try {
            await api.delete(`/seller/vehicles/${id}`);
            setVehicles(vehicles.filter(v => v._id !== id));
            showAlert('Vehicle deleted successfully', 'success');
        } catch (err) {
            showAlert('Failed to delete vehicle', 'error');
        }
    };

    const getImageUrl = (vehicle) => {
        let img = vehicle.images?.[0] || vehicle.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600";
        if (img.startsWith('/uploads')) return `${API_ORIGIN}${img}`;
        if (img.startsWith('uploads')) return `${API_ORIGIN}/${img}`;
        return img;
    };

    const filteredVehicles = vehicles;

    if (loading) return <div className="flex justify-center items-center h-[500px]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Vehicles</h1>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search vehicles..." 
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                    <Link to="/seller/add-vehicle" className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-xl flex items-center gap-2 font-medium text-sm transition-colors shadow-md shadow-emerald-500/20 whitespace-nowrap">
                        <PlusCircle size={18} /> Add Vehicle
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                                <th className="px-6 py-4 font-semibold">Vehicle</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Pricing</th>
                                <th className="px-6 py-4 font-semibold">Location</th>
                                <th className="px-6 py-4 font-semibold text-center">Availability</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredVehicles.length > 0 ? (
                                filteredVehicles.map((vehicle) => (
                                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={vehicle._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                                                    <img src={getImageUrl(vehicle)} alt={vehicle.vehicleName} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600'; }} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{vehicle.vehicleName}</p>
                                                    <p className="text-xs text-gray-500">{vehicle.brand}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                                                {vehicle.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">₹{vehicle.pricePerHour}<span className="text-xs font-normal text-gray-500">/hr</span></p>
                                            <p className="font-semibold text-gray-900 mt-0.5">₹{vehicle.pricePerDay}<span className="text-xs font-normal text-gray-500">/day</span></p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-700">{vehicle.location}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="cursor-pointer" 
                                              onClick={() => toggleAvailability(vehicle._id, vehicle.availability)}
                                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${vehicle.availability ? 'bg-emerald-500' : 'bg-gray-300'}`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${vehicle.availability ? 'translate-x-6' : 'translate-x-1'}`} />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Edit can just be an alert for now if we don't have an edit form */}
                                                <button className="cursor-pointer" onClick={() => showAlert('Edit feature coming soon', 'info', 'Coming Soon')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                    <Pencil size={18} />
                                                </button>
                                                <button className="cursor-pointer" onClick={() => deleteVehicle(vehicle._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        <AlertCircle size={32} className="mx-auto text-gray-400 mb-3" />
                                        <p className="font-medium text-gray-900 mb-1">No vehicles found</p>
                                        <p className="text-sm">You haven't listed any vehicles yet.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default MyVehicles;
