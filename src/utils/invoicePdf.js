import { jsPDF } from 'jspdf';

function fmtMoney(n) {
  if (n == null || Number.isNaN(Number(n))) return '—';
  return `₹${Number(n).toLocaleString('en-IN')}`;
}

function fmtDateTime(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return String(iso);
  }
}

/**
 * @param {object} booking — API booking document
 * @param {object|null} vehicle — populated vehicleId or null
 * @param {object|null} user — optional { name, email }
 */
export function downloadBookingInvoice(booking, vehicle, user) {
  const doc = new jsPDF();
  let y = 16;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(30, 41, 59);
  doc.text('SwiftWheel', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(71, 85, 105);
  doc.text('Vehicle rental invoice', 14, y);
  y += 14;

  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`Booking ID: ${booking._id}`, 14, y);
  y += 6;
  doc.text(`Invoice date: ${new Date().toLocaleDateString('en-IN')}`, 14, y);
  y += 10;

  if (user?.name || user?.email) {
    doc.setFont('helvetica', 'bold');
    doc.text('Customer', 14, y);
    doc.setFont('helvetica', 'normal');
    y += 6;
    if (user.name) doc.text(user.name, 14, y);
    y += user.name ? 6 : 0;
    if (user.email) doc.text(user.email, 14, y);
    y += 8;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('Vehicle', 14, y);
  doc.setFont('helvetica', 'normal');
  y += 6;
  const vName = vehicle?.vehicleName || 'Vehicle';
  const brandCat = [vehicle?.brand, vehicle?.category].filter(Boolean).join(' · ');
  doc.text(vName, 14, y);
  y += 6;
  if (brandCat) doc.text(brandCat, 14, y);
  y += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Rental period', 14, y);
  doc.setFont('helvetica', 'normal');
  y += 6;
  doc.text(`Pickup: ${fmtDateTime(booking.startDate)}`, 14, y);
  y += 6;
  doc.text(`Return: ${fmtDateTime(booking.endDate)}`, 14, y);
  y += 6;
  doc.text(`Pickup location: ${booking.pickupLocation || '—'}`, 14, y);
  y += 12;

  doc.setFont('helvetica', 'bold');
  doc.text('Charges', 14, y);
  doc.setFont('helvetica', 'normal');
  y += 8;
  const rows = [
    ['Base rental', fmtMoney(booking.basePrice)],
    ['Platform fee', fmtMoney(booking.platformFee)],
    ['GST', fmtMoney(booking.gstAmount)],
    ['Security deposit', fmtMoney(booking.securityDeposit)],
    ['Total', fmtMoney(booking.totalAmount)],
  ];
  rows.forEach(([label, val]) => {
    doc.text(label, 14, y);
    doc.text(val, 140, y, { align: 'right' });
    y += 7;
  });
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Status', 14, y);
  doc.setFont('helvetica', 'normal');
  y += 6;
  doc.text(`Booking: ${booking.bookingStatus || '—'}`, 14, y);
  y += 6;
  doc.text(`Payment: ${booking.paymentStatus || '—'}`, 14, y);
  y += 14;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('SwiftWheel · This invoice is generated for your records.', 14, y);

  doc.save(`SwiftWheel-invoice-${booking._id}.pdf`);
}
