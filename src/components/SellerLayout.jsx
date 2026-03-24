import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LoaderPinwheel, LayoutDashboard, CarFront, PlusCircle, CalendarDays, Wallet, LogOut, User } from 'lucide-react';

const SellerLayout = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/seller', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/seller/vehicles', icon: <CarFront size={20} />, label: 'My Vehicles' },
    { path: '/seller/add-vehicle', icon: <PlusCircle size={20} />, label: 'Add Vehicle' },
    { path: '/seller/bookings', icon: <CalendarDays size={20} />, label: 'Booking Requests' },
    { path: '/seller/earnings', icon: <Wallet size={20} />, label: 'Earnings' },
    { path: '/seller/profile', icon: <User size={20} />, label: 'Profile' }
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2 text-gray-900 group">
            <LoaderPinwheel className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold tracking-tight">SwiftWheel <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-1">PARTNER</span></span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/seller' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                  isActive 
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
          <Link 
            to="/login?role=seller"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 font-medium text-sm hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
           <h1 className="text-xl font-bold text-gray-800">
             {navItems.find(item => item.path === location.pathname)?.label || 'Seller Panel'}
           </h1>
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                S
              </div>
           </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50/50">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
