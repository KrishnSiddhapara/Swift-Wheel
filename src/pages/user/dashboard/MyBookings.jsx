import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Ban, Calendar, MapPin, Search, Download, CreditCard, Car, Bike, Info, ChevronRight, Loader } from "lucide-react";
import api from "../../../api/axios";
import { useModal } from "../../../context/ModalContext";
import VehicleCard from "../../../components/VehicleCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyBookings = () => {
  const { showConfirm, showAlert } = useModal();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All Bookings");
  const [cancelling, setCancelling] = useState(null);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchRecommended();
  }, []);

  const fetchRecommended = async () => {
    try {
      const { data } = await api.get("/vehicles", { params: { pageSize: 4 } });
      setRecommended(data.vehicles || []);
    } catch (error) {
      console.error("Error fetching recommended:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings/my-bookings");
      setBookings(data.bookings || data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      showAlert("Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    const confirmed = await showConfirm(
      "Are you sure you want to cancel this booking?",
      "Cancel Booking",
      "warning"
    );
    if (!confirmed) return;

    setCancelling(bookingId);
    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings(
        bookings.map((b) =>
          b._id === bookingId ? { ...b, bookingStatus: "Cancelled" } : b
        )
      );
      showAlert("Booking cancelled successfully", "success");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      showAlert(
        error.response?.data?.message || "Failed to cancel booking",
        "error"
      );
    } finally {
      setCancelling(null);
    }
  };

  const generateInvoice = (booking) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("SwiftWheel Invoice", 14, 22);
    
    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking._id}`, 14, 32);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 40);
    
    autoTable(doc, {
      startY: 50,
      head: [['Description', 'Amount (INR)']],
      body: [
        ['Base Rental', booking.basePrice],
        ['Platform Fee', booking.platformFee],
        ['GST', booking.gstAmount],
        ['Security Deposit', booking.securityDeposit],
        ['Total Paid', booking.totalAmount]
      ],
    });
    
    doc.save(`invoice-${booking._id}.pdf`);
  };

  const validBookings = Array.isArray(bookings) ? bookings : [];

  const filteredBookings = validBookings.filter((booking) => {
    if (filter === "All Bookings") return true;
    if (filter === "Upcoming") return booking.bookingStatus === "Pending";
    if (filter === "Active") return ["Pending", "Confirmed"].includes(booking.bookingStatus);
    return booking.bookingStatus === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
      case "Completed":
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-green-600/20">{status}</span>;
      case "Cancelled":
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-red-600/20">{status}</span>;
      case "Pending":
      default:
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-yellow-600/20">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 max-w-5xl mx-auto py-8 px-4 w-full">
        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse mb-6"></div>
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 h-40 bg-gray-200 rounded-xl"></div>
            <div className="w-full md:w-2/3 space-y-4">
               <div className="h-6 bg-gray-200 rounded w-1/2"></div>
               <div className="h-4 bg-gray-200 rounded w-1/3"></div>
               <div className="h-10 bg-gray-200 rounded w-full mt-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 w-full flex-1">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 mt-2">View and manage your past and upcoming rentals.</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-xl w-max shadow-sm overflow-x-auto max-w-full">
          {["All Bookings", "Upcoming", "Active", "Completed", "Cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                filter === f
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm mt-8 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">You haven’t made any bookings yet.</h3>
            <p className="text-gray-500 mb-8 mt-2 max-w-sm">
              Ready for your next adventure? Explore our fleet and book a vehicle today.
            </p>
            <Link
              to="/vehicles"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
            >
              Explore Vehicles
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking._id} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
                
                {/* Left side: Image & basic info */}
                <div className="md:w-1/3 bg-gray-50 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100">
                  <div>
                      <div className="w-full h-40 bg-white rounded-xl overflow-hidden border border-gray-100 mb-4">
                        <img
                          src={booking.vehicleImage || booking.vehicleId?.images?.[0] || booking.vehicleId?.image || "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600"}
                          alt={booking.vehicleId?.vehicleName}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600'; }}
                        />
                      </div>
                      <h3 className="text-xl font-black text-gray-900">{booking.vehicleId?.vehicleName || "Unknown Vehicle"}</h3>
                      <p className="text-sm text-gray-500 font-medium mb-3">{booking.vehicleId?.brand} • {booking.vehicleId?.category}</p>
                      
                      <div className="flex gap-2 mb-4">
                          {getStatusBadge(booking.bookingStatus)}
                          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-blue-600/20">Paid: ₹{booking.totalAmount}</span>
                      </div>
                  </div>
                  <div className="text-xs text-gray-400 font-mono">Ref: {booking._id.substring(0, 8).toUpperCase()}</div>
                </div>

                {/* Right side: Details & Actions */}
                <div className="md:w-2/3 p-6 flex flex-col justify-between">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
                          <p className="font-semibold text-gray-800">{new Date(booking.startDate).toLocaleString('en-IN', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'})}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={14}/> {booking.pickupLocation}</p>
                      </div>
                      <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Drop-off</p>
                          <p className="font-semibold text-gray-800">{new Date(booking.endDate).toLocaleString('en-IN', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'})}</p>
                      </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      <div>
                          <p className="text-xs text-gray-500">Base Rental</p>
                          <p className="font-semibold text-gray-900">₹{booking.basePrice}</p>
                      </div>
                      <div>
                          <p className="text-xs text-gray-500">Deposit</p>
                          <p className="font-semibold text-gray-900">₹{booking.securityDeposit}</p>
                      </div>
                      <div>
                          <p className="text-xs text-gray-500">Taxes & Fees</p>
                          <p className="font-semibold text-gray-900">₹{booking.gstAmount + booking.platformFee}</p>
                      </div>
                      <div>
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="font-bold text-blue-600">₹{booking.totalAmount}</p>
                      </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    {["Pending", "Confirmed"].includes(booking.bookingStatus) && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        disabled={cancelling === booking._id}
                        className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center gap-2"
                      >
                        {cancelling === booking._id ? <Loader className="w-4 h-4 animate-spin" /> : <Ban size={16} />}
                        Cancel Booking
                      </button>
                    )}
                    <button onClick={() => generateInvoice(booking)} className="cursor-pointer px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                        <Download size={16} /> Invoice
                    </button>
                    <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                        Contact Support
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommended Vehicles */}
        {recommended.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Recommended for your next trip</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map((vehicle) => (
                <div key={vehicle._id} className="h-full">
                  <VehicleCard vehicle={vehicle} actionText="View Details" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
