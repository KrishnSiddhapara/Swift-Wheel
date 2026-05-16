import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Ban,
  FileDown,
  AlertCircle,
} from 'lucide-react';
import api from '../../api/axios';
import { useData } from '../../context/DataProvider';
import { useModal } from '../../context/ModalContext';
import { getAssetUrl } from '../../config/api';
import { downloadBookingInvoice } from '../../utils/invoicePdf';

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

const BookingDetailPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useData();
  const { showConfirm, showAlert } = useModal();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/bookings/${bookingId}`);
      setBooking(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking not found.');
      setBooking(null);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    load();
  }, [load]);

  const handleCancel = async () => {
    const ok = await showConfirm(
      'Cancel this booking?',
      'Cancel booking',
      'warning'
    );
    if (!ok) return;
    setCancelling(true);
    try {
      await api.delete(`/bookings/${bookingId}`);
      showAlert('Booking cancelled.', 'success');
      navigate('/my-bookings');
    } catch (err) {
      showAlert(err.response?.data?.message || 'Could not cancel.', 'error');
    } finally {
      setCancelling(false);
    }
  };

  const goMyBookings = () => navigate('/my-bookings');

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center">
        <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
        <h1 className="text-xl font-bold text-gray-900">{error || 'Not found'}</h1>
        <button
          type="button"
          onClick={goMyBookings}
          className="cursor-pointer mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold"
        >
          Go to My Bookings
        </button>
      </div>
    );
  }

  const v = booking.vehicleId;
  const img = v?.images?.[0] || v?.image;
  const bStatus = getDisplayBookingStatus(booking);
  const pStatus = getDisplayPaymentStatus(booking);
  const cancelable = canCancelBooking(booking);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-5rem)] py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={goMyBookings}
          className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Go to My Bookings
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left">
          <div className="aspect-[21/9] bg-gray-100">
            <img
              src={
                getAssetUrl(img) ||
                'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200'
              }
              alt={v?.vehicleName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">{v?.vehicleName}</h1>
              <p className="text-gray-500 mt-1">
                {[v?.brand, v?.category].filter(Boolean).join(' · ')}
              </p>
              <p className="text-xs font-mono text-gray-400 mt-3 break-all">ID: {booking._id}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 ring-1 ring-gray-200">
                {bStatus}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 ring-1 ring-blue-200">
                {pStatus}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex gap-2">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase">Pickup</p>
                  <p className="text-gray-800 font-medium">{booking.pickupLocation}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase">Schedule</p>
                  <p className="text-gray-800 font-medium">
                    {new Date(booking.startDate).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                  <p className="text-gray-800 font-medium">
                    to{' '}
                    {new Date(booking.endDate).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-100 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Base rental</span>
                <span className="font-semibold">₹{Number(booking.basePrice).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Platform fee</span>
                <span className="font-semibold">₹{Number(booking.platformFee).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">GST</span>
                <span className="font-semibold">₹{Number(booking.gstAmount).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Security deposit</span>
                <span className="font-semibold">₹{Number(booking.securityDeposit).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-100 text-base">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-black text-blue-600">
                  ₹{Number(booking.totalAmount).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  downloadBookingInvoice(booking, v, { name: user?.name, email: user?.email })
                }
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 font-semibold text-gray-800 hover:bg-gray-50"
              >
                <FileDown className="w-4 h-4" />
                Download invoice
              </button>
              {cancelable && (
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={handleCancel}
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-700 font-semibold border border-red-100 disabled:opacity-50"
                >
                  <Ban className="w-4 h-4" />
                  Cancel booking
                </button>
              )}
            </div>

            <p className="text-center">
              <Link to="/vehicles" className="text-sm text-blue-600 font-medium hover:underline">
                Browse more vehicles
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
