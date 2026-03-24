import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Search, AlertCircle } from 'lucide-react';

const SearchBar = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    location: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: ''
  });
  
  const [error, setError] = useState('');

  const cities = [
    'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 
    'Pune', 'Hyderabad', 'Chennai', 'Kolkata'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Validation: Check if any field is empty
    if (!formData.location || !formData.pickupDate || !formData.pickupTime || !formData.returnDate || !formData.returnTime) {
      setError('Please fill in all fields to search for vehicles.');
      return;
    }

    // Validation: Return date must be after pickup date (basic check)
    const pickupDateTime = new Date(`${formData.pickupDate}T${formData.pickupTime}`);
    const returnDateTime = new Date(`${formData.returnDate}T${formData.returnTime}`);
    
    if (returnDateTime <= pickupDateTime) {
      setError('Return date and time must be after pickup.');
      return;
    }

    // Navigate to vehicles page (we can pass data via URL query params if needed)
    navigate(`/vehicles?location=${formData.location}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 z-20 relative">
      <form 
        onSubmit={handleSearch}
        className="bg-white/80 backdrop-blur-md rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 p-4 sm:p-5 text-left hero-reveal"
      >
        <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
          
          {/* Location */}
          <div className="flex-1 w-full">
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Pickup Location
            </label>
            <div className="relative">
              <select 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2.5 pl-3 bg-white/60 border border-gray-200/60 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none outline-none transition-all cursor-pointer text-gray-800 text-sm font-medium hover:bg-white/80"
              >
                <option value="" disabled>Select city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Pickup Group */}
          <div className="flex-1 flex gap-2 w-full">
            {/* Pickup Date */}
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Pickup Date
              </label>
              <input 
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="w-full p-2.5 bg-white/60 border border-gray-200/60 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all cursor-pointer text-gray-800 text-sm font-medium hover:bg-white/80" 
              />
            </div>

            {/* Pickup Time */}
            <div className="w-28 sm:w-32">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                Time
              </label>
              <input 
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                className="w-full p-2.5 bg-white/60 border border-gray-200/60 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all cursor-pointer text-gray-800 text-sm font-medium hover:bg-white/80" 
              />
            </div>
          </div>

          {/* Return Group */}
          <div className="flex-1 flex gap-2 w-full">
            {/* Return Date */}
            <div className="flex-1">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                Return Date
              </label>
              <input 
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                min={formData.pickupDate || new Date().toISOString().split("T")[0]}
                className="w-full p-2.5 bg-white/60 border border-gray-200/60 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all cursor-pointer text-gray-800 text-sm font-medium hover:bg-white/80" 
              />
            </div>

            {/* Return Time */}
            <div className="w-28 sm:w-32">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                Time
              </label>
              <input 
                type="time"
                name="returnTime"
                value={formData.returnTime}
                onChange={handleChange}
                className="w-full p-2.5 bg-white/60 border border-gray-200/60 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all cursor-pointer text-gray-800 text-sm font-medium hover:bg-white/80" 
              />
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto md:min-w-[140px]">
            <button 
              type="submit"
              className="w-full h-[42px] bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center justify-center gap-1.5 rounded-lg transition-all shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
          
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm border border-red-100 animate-pulse">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
