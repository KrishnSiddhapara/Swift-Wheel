import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, List, Search, AlertCircle, Loader2 } from 'lucide-react';

const SearchBar = () => {
  const navigate = useNavigate();
  
  // Default values
  const today = new Date().toISOString().split("T")[0];
  
  const [formData, setFormData] = useState({
    location: '',
    date: today,
    category: 'All Vehicles'
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const cities = [
    'Ahmedabad', 'Rajkot', 'Surat', 'Vadodara', 
    'Jamnagar', 'Bhavnagar'
  ];

  const categories = [
    'All Vehicles', 'Bikes', 'Mopeds', 'Cars'
  ];

  // Load from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('swiftwheel_search_filters');
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        setFormData(prev => ({
          ...prev,
          location: parsed.location || prev.location,
          date: parsed.date || prev.date,
          category: parsed.category || prev.category
        }));
      } catch (e) {
        console.error("Failed to parse saved filters", e);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.location) {
      setError('Please select a location.');
      return;
    }
    if (!formData.date) {
      setError('Please select a date.');
      return;
    }

    setIsLoading(true);

    // Save to localStorage
    localStorage.setItem('swiftwheel_search_filters', JSON.stringify({
      location: formData.location,
      date: formData.date,
      category: formData.category
    }));

    // Simulate slight loading for better UX, then navigate
    setTimeout(() => {
      navigate(`/vehicles?location=${encodeURIComponent(formData.location)}&date=${encodeURIComponent(formData.date)}&category=${encodeURIComponent(formData.category)}`);
    }, 400);
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 z-20 relative px-4">
      <form 
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-4 sm:p-6 text-left"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-end justify-between">
          
          {/* Location */}
          <div className="flex-1 w-full group">
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-blue-600" />
              Location
            </label>
            <div className="relative transition-transform duration-200 hover:-translate-y-0.5">
              <select 
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3.5 pl-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 appearance-none outline-none transition-all cursor-pointer text-gray-800 text-sm font-medium hover:bg-gray-100/80"
              >
                <option value="" disabled>Select city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date */}
          <div className="flex-1 w-full group">
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-blue-600" />
              Date
            </label>
            <div className="transition-transform duration-200 hover:-translate-y-0.5">
              <input 
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={today}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 outline-none transition-all cursor-pointer text-gray-800 text-sm font-medium hover:bg-gray-100/80" 
              />
            </div>
          </div>

          {/* Category */}
          <div className="flex-1 w-full group">
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-2 uppercase tracking-wider">
              <List className="w-4 h-4 text-blue-600" />
              Category
            </label>
            <div className="transition-transform duration-200 hover:-translate-y-0.5">
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3.5 pl-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 appearance-none outline-none transition-all cursor-pointer text-gray-800 text-sm font-medium hover:bg-gray-100/80"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full lg:w-auto lg:min-w-[160px] transition-transform duration-200 hover:-translate-y-0.5">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-[54px] bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-bold flex items-center justify-center gap-2 rounded-xl transition-all shadow-lg shadow-blue-600/30 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
          
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mt-5 flex items-center gap-2 text-red-600 bg-red-50 p-3.5 rounded-xl text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;

