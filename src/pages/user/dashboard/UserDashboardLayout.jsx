import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, List, User } from 'lucide-react';

const UserDashboardLayout = () => {
  const navItems = [
    { name: 'Overview', path: '/user/dashboard', icon: LayoutDashboard },
    { name: 'My Bookings', path: '/user/bookings', icon: List },
    { name: 'Profile', path: '/user/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row" style={{ minHeight: 'calc(100vh - 80px)' }}>
      {/* Sidebar for Desktop / Top Nav for Mobile */}
      <div className="w-full md:w-72 bg-white border-r border-gray-200 shadow-sm z-10 md:min-h-full">
        <div className="p-4 md:p-6 text-xl font-bold text-gray-800 border-b border-gray-100 hidden md:block">
          My Account
        </div>
        <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-3 p-3 md:p-6 no-scrollbar flex-nowrap shrink-0 snap-x">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/user/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap flex-shrink-0 snap-start ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600 bg-gray-50/50 md:bg-transparent'
                }`
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto space-y-8 w-full">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
