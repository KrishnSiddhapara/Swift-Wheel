import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Ban,
  FileDown,
  ChevronRight,
  Car,
  AlertCircle,
} from 'lucide-react';
import api from '../../api/axios';
import { useModal } from '../../context/ModalContext';
import { useData } from '../../context/DataProvider';
import { getAssetUrl } from '../../config/api';
import { downloadBookingInvoice } from '../../utils/invoicePdf';

const TABS = ['All', 'Upcoming', 'Active', 'Completed', 'Cancelled'];

const TAB_QUERY = {
  All: 'all',
  Upcoming: 'upcoming',
  Active: 'active',
  Completed: 'completed',
  Cancelled: 'cancelled',
};

function getDisplayBookingStatus(b) {
  if (b.bookingStatus === 'Cancelled') return 'Cancelled';
  if (b.bookingStatus === 'Completed') return 'Completed';
  const now = Date.now();
  const start = new Date(b.startDate).getTime();
  const end = new Date(b.endDate).getTime();
  if (b.bookingStatus === 'Active') return 'Active';
  if (b.paymentStatus === 'Paid' && now >= start && now <= end) return 'Active';
  if (b.paymentStatus === 'Paid' && now > end) return 'Completed';
  if (b.paymentStatus === 'Paid' && now < start) return 'Confirmed';
  return b.bookingStatus || 'Pending';
}

function getDisplayPaymentStatus(b) {
  const p = b.paymentStatus;
  if (p === 'Paid') return 'Paid';
  if (p === 'Refunded') return 'Refunded';
  if (p === 'Failed') return 'Failed';
  return 'Pending';
}

function canCancelBooking(b) {
  if (b.bookingStatus === 'Cancelled' || b.bookingStatus === 'Completed') return false;
  const now = new Date();
  if (b.bookingStatus === 'Active') return false;
  if (b.paymentStatus === 'Paid' && now >= new Date(b.startDate)) return false;
  return ['Pending', 'Confirmed'].includes(b.bookingStatus);
}

function bookingStatusBadgeClass(status) {
  switch (status) {
    case 'Active':
      return 'bg-emerald-50 text-emerald-800 ring-emerald-600/20';
    case 'Confirmed':
      return 'bg-indigo-50 text-indigo-800 ring-indigo-600/20';
    case 'Completed':
      return 'bg-slate-100 text-slate-800 ring-slate-600/15';
    case 'Cancelled':
      return 'bg-red-50 text-red-800 ring-red-600/20';
    default:
      return 'bg-amber-50 text-amber-900 ring-amber-600/20';
  }
}

function paymentStatusBadgeClass(status) {
  switch (status) {
    case 'Paid':
      return 'bg-green-50 text-green-800 ring-green-600/20';
    case 'Refunded':
      return 'bg-violet-50 text-violet-800 ring-violet-600/20';
    case 'Failed':
      return 'bg-red-50 text-red-800 ring-red-600/20';
    default:
      return 'bg-gray-100 text-gray-800 ring-gray-600/15';
  }
}

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { showConfirm, showAlert } = useModal();
  const { user } = useData();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('All');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [cancelling, setCancelling] = useState(null);
  const limit = 10;

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const q = TAB_QUERY[tab] || 'all';
      const { data } = await api.get(
        `/bookings/my-bookings?page=${page}&limit=${limit}&tab=${q}`
      );
      if (Array.isArray(data)) {
        setBookings(data);
        setPages(1);
        setTotal(data.length);
      } else {
        setBookings(data.bookings || []);
        setPages(data.pages || 1);
        setTotal(data.total ?? (data.bookings || []).length);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Could not load bookings.');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [page, tab]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleCancel = async (bookingId) => {
    const confirmed = await showConfirm(
      'Are you sure you want to cancel this booking?',
      'Cancel booking',
      'warning'
    );
    if (!confirmed) return;

    setCancelling(bookingId);
    try {
      await api.delete(`/bookings/${bookingId}`);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId
            ? {
                ...b,
                bookingStatus: 'Cancelled',
                paymentStatus:
                  b.paymentStatus === 'Paid' ? 'Refunded' : b.paymentStatus,
              }
            : b
        )
      );
      showAlert('Booking cancelled successfully.', 'success');
      fetchBookings();
    } catch (err) {
      showAlert(err.response?.data?.message || 'Failed to cancel booking.', 'error');
    } finally {
      setCancelling(null);
    }
  };

  const vehicleThumb = (v) => {
    const raw = v?.images?.[0] || v?.image;
    return getAssetUrl(raw) || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400';
  };

  const emptyAll = !loading && !error && total === 0 && tab === 'All';
  const emptyTab = !loading && !error && total === 0 && tab !== 'All';

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-5rem)] py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My bookings</h1>
            <p className="text-gray-500 mt-1">
              View rental details, download invoices, and manage upcoming trips.
            </p>
          </div>
        </div>

        <div className="flex gap-2 p-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto mb-8">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTab(t);
                setPage(1);
              }}
              className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                tab === t
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent" />
          </div>
        )}

        {error && (
          <div className="bg-white border border-red-100 rounded-2xl p-6 flex gap-3 items-start shadow-sm">
            <AlertCircle className="text-red-500 w-6 h-6 shrink-0" />
            <div>
              <p className="font-semibold text-gray-900">Something went wrong</p>
              <p className="text-sm text-gray-600 mt-1">{error}</p>
              <button
                type="button"
                onClick={() => fetchBookings()}
                className="cursor-pointer mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && emptyAll && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm text-center py-16 px-6">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
              <Car className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">You have no bookings yet.</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Explore vehicles and book your first ride — it only takes a minute.
            </p>
            <button
              type="button"
              onClick={() => navigate('/vehicles')}
              className="cursor-pointer mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition"
            >
              Browse vehicles
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {!loading && !error && emptyTab && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm text-center py-16 px-6">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">No {tab.toLowerCase()} bookings</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Try another filter or browse vehicles to make a new booking.
            </p>
            <button
              type="button"
              onClick={() => {
                setTab('All');
                setPage(1);
              }}
              className="cursor-pointer mt-6 text-blue-600 font-semibold hover:underline"
            >
              View all bookings
            </button>
          </div>
        )}

        {!loading && !error && !emptyAll && !emptyTab && (
          <>
            {bookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-600">
                No bookings in this tab.
                <button
                  type="button"
                  className="cursor-pointer block mx-auto mt-4 text-blue-600 font-semibold"
                  onClick={() => setTab('All')}
                >
                  Show all
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => {
                  const v = booking.vehicleId;
                  const bStatus = getDisplayBookingStatus(booking);
                  const pStatus = getDisplayPaymentStatus(booking);
                  const cancelable = canCancelBooking(booking);

                  return (
                    <article
                      key={booking._id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 flex flex-col lg:flex-row gap-6">
                        <button
                          type="button"
                          onClick={() => navigate(`/my-bookings/${booking._id}`)}
                          className="cursor-pointer shrink-0 w-full sm:w-40 h-36 sm:h-28 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 text-left group relative"
                        >
                          <img
                            src={vehicleThumb(v)}
                            alt={v?.vehicleName || 'Vehicle'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-2 right-2 text-[10px] font-bold uppercase tracking-wide text-white bg-black/50 px-2 py-0.5 rounded">
                            Details
                          </span>
                        </button>

                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h2 className="text-xl font-bold text-gray-900">
                                {v?.vehicleName || 'Vehicle'}
                              </h2>
                              <p className="text-sm text-gray-500 mt-0.5">
                                {[v?.brand, v?.category].filter(Boolean).join(' · ') || '—'}
                              </p>
                              <p className="text-xs text-gray-400 mt-2 font-mono break-all">
                                Booking ID: {booking._id}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ${bookingStatusBadgeClass(
                                  bStatus
                                )}`}
                              >
                                {bStatus}
                              </span>
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ring-1 ${paymentStatusBadgeClass(
                                  pStatus
                                )}`}
                              >
                                {pStatus}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                              <span>
                                <span className="text-gray-400 block text-xs font-medium uppercase">
                                  Pickup
                                </span>
                                {booking.pickupLocation || '—'}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                              <span>
                                <span className="text-gray-400 block text-xs font-medium uppercase">
                                  Schedule
                                </span>
                                {new Date(booking.startDate).toLocaleString('en-IN', {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                })}{' '}
                                →{' '}
                                {new Date(booking.endDate).toLocaleString('en-IN', {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                                })}
                              </span>
                            </div>
                          </div>

                          <div className="mt-5 flex flex-wrap gap-4 border-t border-gray-100 pt-5">
                            <div>
                              <p className="text-xs text-gray-400 font-medium uppercase">Total rental</p>
                              <p className="text-lg font-black text-gray-900">
                                ₹{Number(booking.totalAmount || 0).toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 font-medium uppercase">Security deposit</p>
                              <p className="text-lg font-bold text-gray-700">
                                ₹{Number(booking.securityDeposit || 0).toLocaleString('en-IN')}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                downloadBookingInvoice(booking, v, {
                                  name: user?.name,
                                  email: user?.email,
                                })
                              }
                              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:bg-gray-50 transition"
                            >
                              <FileDown className="w-4 h-4" />
                              Download invoice
                            </button>
                            <button
                              type="button"
                              onClick={() => navigate(`/my-bookings/${booking._id}`)}
                              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
                            >
                              View details
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            {cancelable && (
                              <button
                                type="button"
                                disabled={cancelling === booking._id}
                                onClick={() => handleCancel(booking._id)}
                                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-700 text-sm font-semibold hover:bg-red-100 border border-red-100 disabled:opacity-50"
                              >
                                {cancelling === booking._id ? (
                                  <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                ) : (
                                  <Ban className="w-4 h-4" />
                                )}
                                Cancel booking
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {pages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="cursor-pointer px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {pages}
                </span>
                <button
                  type="button"
                  disabled={page >= pages}
                  onClick={() => setPage((p) => Math.min(pages, p + 1))}
                  className="cursor-pointer px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-semibold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <p className="text-center text-sm text-gray-400 mt-10">
          Need help?{' '}
          <Link to="/contact" className="text-blue-600 font-medium hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MyBookingsPage;
