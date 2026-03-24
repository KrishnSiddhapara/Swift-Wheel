import React, { useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { CarFront, UploadCloud, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AddVehicle = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vehicleName: '', brand: '', category: 'Car',
        pricePerHour: '', pricePerDay: '', location: '', description: '',
        seatingCapacity: '', mileage: '', color: '', fuelType: 'Petrol', transmission: 'Manual'
    });
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            setError('You can only upload up to 5 images');
            return;
        }
        if (files.length > 0) {
            setImages(files);
            const previews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (images.length === 0) {
            setError('Please upload at least one vehicle image (up to 5)');
            setLoading(false);
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        images.forEach(image => data.append('images', image));

        try {
            await api.post('/seller/vehicles', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setSuccess(true);
            setTimeout(() => navigate('/seller/vehicles'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add vehicle');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Added Successfully!</h2>
                <p className="text-gray-500">Redirecting to your vehicle list...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Add New Vehicle</h1>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
                            <input type="text" name="vehicleName" value={formData.vehicleName} onChange={handleInputChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Honda City" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Honda" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                                    <option value="Car">Car</option>
                                    <option value="Bike">Bike</option>
                                    <option value="Moped">Moped</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                                <select name="fuelType" value={formData.fuelType} onChange={handleInputChange} className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="CNG">CNG</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                                <select name="transmission" value={formData.transmission} onChange={handleInputChange} className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                                    <option value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
                                <input type="number" name="seatingCapacity" value={formData.seatingCapacity} onChange={handleInputChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. 5" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
                                <input type="number" name="mileage" value={formData.mileage} onChange={handleInputChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. 15" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                <input type="text" name="color" value={formData.color} onChange={handleInputChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. Red" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price / Hour (₹)</label>
                                <input type="number" name="pricePerHour" value={formData.pricePerHour} onChange={handleInputChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. 200" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price / Day (₹)</label>
                                <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleInputChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. 2000" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location / Pickup Point</label>
                            <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="e.g. MG Road, Bangalore" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="2" className="w-full rounded-xl border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 resize-none" placeholder="Add vehicle details, rules, etc."></textarea>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 border-t border-gray-100 pt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Images (Max 5)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:border-emerald-500 transition-colors bg-gray-50 h-32">
                        <input type="file" multiple accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                        {imagePreviews.length > 0 ? (
                            <div className="flex gap-2 relative z-0">
                                {imagePreviews.map((preview, index) => (
                                    <img key={index} src={preview} alt={`preview ${index}`} className="w-20 h-20 object-cover rounded-lg border border-gray-300 shadow-sm" />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-400 group-hover:text-emerald-500 transition-colors">
                                <UploadCloud size={32} className="mb-2" />
                                <span className="text-sm font-medium">Click or drag up to 5 images</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-8 rounded-xl font-bold transition-colors shadow-md shadow-emerald-500/20 flex items-center gap-2">
                        {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : <><CarFront size={20} /> Publish Vehicle</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddVehicle;
