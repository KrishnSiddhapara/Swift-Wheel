import React, { useState, useEffect, memo } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import VehicleCard from "../../components/VehicleCard";
import { motion } from "framer-motion";

const categories = ["All Vehicles", "Bikes", "Mopeds", "Cars"];

const VehicleGrid = memo(({ vehicles }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-12"
    >
      {vehicles.map((vehicle, index) => (
        <motion.div
          key={vehicle._id || vehicle.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "50px" }}
          transition={{ delay: (index % 12) * 0.05, duration: 0.4 }}
          whileHover={{ y: -5 }}
        >
          <VehicleCard vehicle={vehicle} actionText="View Details" />
        </motion.div>
      ))}
    </motion.div>
  );
});

const SearchForm = ({ onSubmit, initialLocation, initialDate, initialPriceRange }) => {
  const [location, setLocation] = useState(initialLocation || "");
  const [date, setDate] = useState(initialDate || "");
  const [priceRange, setPriceRange] = useState(initialPriceRange || "");

  const getMinDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Sync state when props change (like when URL params are read on mount)
  useEffect(() => {
    if (initialLocation) setLocation(initialLocation);
    if (initialDate) setDate(initialDate);
  }, [initialLocation, initialDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ location, date, priceRange });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-lg mb-12 border border-gray-100"
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Location</label>
          <input
            type="text"
            placeholder="City or area"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={getMinDate()}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Price per Day</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow bg-white text-gray-700"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="">Any Range</option>
            <option value="0-500">Under ₹500</option>
            <option value="500-1500">₹500 - ₹1500</option>
            <option value="1500-3000">₹1500 - ₹3000</option>
            <option value="3000-100000">Above ₹3000</option>
          </select>
        </div>
        <div className="flex flex-col">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-4 py-2.5 shadow-md shadow-blue-500/30 transition-all transform active:scale-95 cursor-pointer"
          >
            Search Filter
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const Vehicles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All Vehicles");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const pageSize = 8;

  // Filters state (only updated on submit to naturally prevent UI lag)
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    date: searchParams.get("date") || "",
    priceRange: ""
  });

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const params = { pageSize, pageNumber: currentPage };
      if (selectedCategory && selectedCategory !== "All Vehicles") {
        params.category = selectedCategory;
      }
      if (filters.location) params.location = filters.location;
      if (filters.date) {
        // Create full day range for the selected date to filter correctly
        const selectedDate = new Date(filters.date);
        params.startDate = new Date(selectedDate.setHours(0, 0, 0, 0)).toISOString();
        params.endDate = new Date(selectedDate.setHours(23, 59, 59, 999)).toISOString();
      }
      if (filters.priceRange) params.priceRange = filters.priceRange;

      const { data } = await api.get("/vehicles/search", {
        params,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }).catch(() => {
        return api.get("/vehicles", {
          params,
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      });
      setVehicles(data.vehicles || []);
      setTotalPages(data.pages || 1);
      setTotalVehicles(data.total !== undefined ? data.total : (data.vehicles ? data.vehicles.length : 0));
    } catch (error) {
      console.error("Error fetching vehicles", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    } else if (!categoryFromUrl) {
      setSelectedCategory("All Vehicles");
    }
    
    // Also update filters if location or date are in URL
    const locationFromUrl = searchParams.get("location");
    const dateFromUrl = searchParams.get("date");
    if (locationFromUrl || dateFromUrl) {
      setFilters(prev => ({
        ...prev,
        location: locationFromUrl || prev.location,
        date: dateFromUrl || prev.date
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchVehicles();
  }, [selectedCategory, filters, currentPage]);

  const handleCategoryChange = (category) => {
    setCurrentPage(1);
    setSelectedCategory(category);
    if (category === "All Vehicles") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-gray-900 mb-4"
          >
            Our Vehicles
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Choose from our wide range of bikes, mopeds, and cars. Whether you
            need an agile ride for the city or a comfortable car for a road
            trip, we have you covered.
          </motion.p>
        </div>

        <SearchForm 
          onSubmit={(newFilters) => { setCurrentPage(1); setFilters(newFilters); }} 
          initialLocation={filters.location}
          initialDate={filters.date}
          initialPriceRange={filters.priceRange}
        />

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? "bg-gray-900 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-6 text-gray-600 font-medium tracking-wide">
          Showing <span className="text-blue-600 font-bold ">{vehicles.length}</span>{" "}
          of <span className="text-blue-600 font-bold ">{totalVehicles}</span>{" "}
          {totalVehicles === 1 ? "result" : "results"} for "{selectedCategory}"
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 font-semibold text-gray-600">Discovering perfect rides...</p>
          </div>
        ) : vehicles.length > 0 ? (
          <>
            <VehicleGrid vehicles={vehicles} />
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-4 pb-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-900 cursor-pointer'}`}
                >
                  Previous
                </button>
                <span className="text-gray-600 font-medium px-4">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-900 cursor-pointer'}`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-28 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="text-gray-400 text-5xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No vehicles found</h3>
            <p className="text-gray-500 mb-6">Let's try adjusting your search filters to find available rides.</p>
            <button
              onClick={() => {
                setFilters({ location: "", date: "", priceRange: "" });
                handleCategoryChange("All Vehicles");
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold underline decoration-2 underline-offset-4"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Vehicles;
