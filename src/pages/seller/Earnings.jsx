import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, CalendarDays, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../api/axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Earnings = () => {
    const [earningsData, setEarningsData] = useState({ totalEarnings: 0, completedBookings: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const { data } = await api.get('/seller/earnings');
                setEarningsData(data);
            } catch (err) {
                setError('Failed to fetch earnings data');
            } finally {
                setLoading(false);
            }
        };
        fetchEarnings();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-[500px]"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div></div>;

    const chartData = [
        { name: 'Week 1', earnings: 1200 }, { name: 'Week 2', earnings: 2100 }, 
        { name: 'Week 3', earnings: 1800 }, { name: 'Week 4', earnings: parseInt(earningsData.totalEarnings) > 0 ? earningsData.totalEarnings : 0 }
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Earnings Dashboard</h1>
            {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">{error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg shadow-gray-900/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-bl-full opacity-20 transform translate-x-10 -translate-y-10"></div>
                    <div className="relative z-10 flex justify-between items-start mb-6">
                        <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                            <Wallet size={24} className="text-emerald-400" />
                        </div>
                        <span className="text-xs font-medium bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md mb-2">Total Balance</span>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-emerald-100 text-sm font-medium mb-1">Available structured payouts</h3>
                        <p className="text-4xl font-bold tracking-tight">₹{earningsData.totalEarnings.toLocaleString()}</p>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Receipt size={24} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">Completed Bookings</h3>
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">{earningsData.completedBookings}</p>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-emerald-50 p-6 rounded-2xl shadow-sm border border-emerald-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-emerald-800 text-sm font-medium mb-1">Average per Booking</h3>
                        <p className="text-3xl font-bold text-emerald-900 tracking-tight">
                            ₹{earningsData.completedBookings > 0 ? Math.round(earningsData.totalEarnings / earningsData.completedBookings).toLocaleString() : 0}
                        </p>
                    </div>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><CalendarDays size={20} className="text-emerald-600" /> Weekly Earnings Growth</h2>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} tickFormatter={(value) => `₹${value}`} dx={-10} />
                            <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value) => [`₹${value}`, 'Earnings']} />
                            <Bar dataKey="earnings" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={60} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default Earnings;
