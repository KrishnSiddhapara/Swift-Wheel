import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LoaderPinwheel, LayoutDashboard, Users, Car, CalendarCheck, BarChart3, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Manage Users' },
    { path: '/admin/sellers', icon: <Users size={20} />, label: 'Manage Sellers' },
    { path: '/admin/vehicles', icon: <Car size={20} />, label: 'Manage Vehicles' },
    { path: '/admin/bookings', icon: <CalendarCheck size={20} />, label: 'Manage Bookings' },
    { path: '/admin/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden transition-opacity border-0"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <Link to="/admin" className="flex items-center gap-2 text-gray-900 group" onClick={() => setIsMobileMenuOpen(false)}>
            <LoaderPinwheel className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold tracking-tight">SwiftWheel <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-1">ADMIN</span></span>
          </Link>
          <button className="md:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
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
            to="/login?role=admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 font-medium text-sm hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
           <div className="flex items-center gap-3">
             <button 
               className="p-1 md:hidden text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={24} />
             </button>
             <h1 className="text-xl font-bold text-gray-800 truncate">
               {navItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
             </h1>
           </div>
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                A
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

export default AdminLayout;
