import React, { useState, useEffect } from 'react';
import { CarFront, CalendarDays, Wallet, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SellerDashboard = () => {
    const [stats, setStats] = useState({ totalVehicles: 0, totalBookings: 0, totalEarnings: 0, activeRentals: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [vehiclesRes, bookingsRes, earningsRes] = await Promise.all([
                    api.get('/seller/vehicles'),
                    api.get('/seller/bookings'),
                    api.get('/seller/earnings')
                ]);

                const activeRentals = bookingsRes.data.filter(b => b.status === 'Ongoing' || b.status === 'Confirmed').length;

                setStats({
                    totalVehicles: vehiclesRes.data.length || 0,
                    totalBookings: bookingsRes.data.length || 0,
                    totalEarnings: earningsRes.data.totalEarnings || 0,
                    activeRentals
                });
            } catch (err) {
                console.error(err);
                setError('Failed to fetch dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-[500px]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div></div>;

    const statCards = [
        { title: 'Vehicles Listed', value: stats.totalVehicles, icon: <CarFront size={24} className="text-emerald-500" /> },
        { title: 'Total Bookings', value: stats.totalBookings, icon: <CalendarDays size={24} className="text-blue-500" /> },
        { title: 'Active Rentals', value: stats.activeRentals, icon: <Activity size={24} className="text-purple-500" /> },
        { title: 'Total Earnings', value: `₹${stats.totalEarnings.toLocaleString()}`, icon: <Wallet size={24} className="text-amber-500" /> },
    ];

    const chartData = [
        { name: 'Jan', earnings: 4000 }, { name: 'Feb', earnings: 3000 }, { name: 'Mar', earnings: 5000 },
        { name: 'Apr', earnings: 4780 }, { name: 'May', earnings: 5890 }, { name: 'Jun', earnings: 4390 },
        { name: 'Jul', earnings: parseInt(stats.totalEarnings) > 0 ? stats.totalEarnings : 0 }
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Seller Dashboard</h1>
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-6">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-500 text-sm font-semibold mb-1">{stat.title}</h3>
                            <p className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Earnings Overview</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(value) => `₹${value}`} dx={-10} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`₹${value}`, 'Earnings']} />
                                <Area type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                     <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
                     <div className="space-y-4">
                         <a href="/seller/add-vehicle" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-emerald-50 hover:border-emerald-200 transition-colors group">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <CarFront size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">Add New Vehicle</h4>
                                <p className="text-xs text-gray-500">List another car for rent</p>
                            </div>
                         </a>
                         <a href="/seller/bookings" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors group">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <CalendarDays size={20} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900">View Bookings</h4>
                                <p className="text-xs text-gray-500">Manage rental requests</p>
                            </div>
                         </a>
                     </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SellerDashboard;
