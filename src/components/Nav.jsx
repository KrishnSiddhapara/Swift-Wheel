import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@mui/material';
import { LoaderPinwheel , Menu, X, LogIn, User, LayoutDashboard, List, LogOut } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataProvider';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logout } = useData();
    const navigate = useNavigate();
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to='/' className="flex items-center space-x-2 text-gray-900 group">
            <LoaderPinwheel className="h-9 w-9 text-blue-600 transition-transform duration-500 group-hover:rotate-180" />
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">SwiftWheel</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to='/' className="relative text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors group py-2">
              Home
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 rounded-full"></span>
            </Link>
            <Link to='/vehicles' className="relative text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors group py-2">
              Vehicles
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 rounded-full"></span>
            </Link>
            <Link to='/about' className="relative text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors group py-2">
              About
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 rounded-full"></span>
            </Link>
            <Link to='/contact' className="relative text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors group py-2">
              Contact
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 rounded-full"></span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-5">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 focus:outline-none hover:opacity-80 transition-opacity"
                >
                  {user.image || user.profileImage ? (
                    <img src={user.image || user.profileImage} alt={user.name} className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover shadow-sm bg-gray-50 bg-center" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-blue-600 uppercase shadow-sm">
                      {user.name ? user.name.charAt(0) : <User size={20} />}
                    </div>
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg py-2 border border-gray-100 transform transition-all duration-200 origin-top-right">
                    <Link to="/user/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <Link to="/user/bookings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <List size={18} /> My Bookings
                    </Link>
                    <Link to="/user/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <User size={18} /> Profile
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to='/login' className='group flex items-center gap-2 font-semibold text-base text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-50/50'>
                  <LogIn className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" /><span>Log in</span>
                </Link>
                <Link to='/register' className='py-2.5 px-6 rounded-full font-bold text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300'>
                  Sign Up
                </Link>
              </>
            )}
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none p-2 rounded-md transition-all duration-300 ${isMenuOpen ? 'text-blue-600 bg-blue-50 rotate-90' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100 rotate-0'}`}
            >
              {isMenuOpen ? <X className="h-7 w-7 transition-all duration-300" /> : <Menu className="h-7 w-7 transition-all duration-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-2 pt-2 pb-6 space-y-2 bg-white/95 sm:px-3 text-left border-t border-gray-100 shadow-inner">
            <Link
              to="/"
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:pl-6 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to='/vehicles'
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:pl-6 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Vehicles
            </Link>
            <Link
              to='/about'
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:pl-6 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to='/contact'
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:pl-6 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Mobile Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 px-3 mt-2">
              {user ? (
                <>
                  <div className="flex items-center gap-4 mb-3 px-2">
                    {user.image || user.profileImage ? (
                      <img src={user.image || user.profileImage} alt={user.name} className="w-12 h-12 rounded-full border-2 border-blue-600 object-cover shadow-sm bg-gray-50" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-blue-600 uppercase text-lg">
                        {user.name ? user.name.charAt(0) : <User size={20} />}
                      </div>
                    )}
                    <div className="font-bold text-gray-800 text-lg">{user.name}</div>
                  </div>
                  <Link to="/user/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-2 py-2 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                    <LayoutDashboard size={20} /> Dashboard
                  </Link>
                  <Link to="/user/bookings" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-2 py-2 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                    <List size={20} /> My Bookings
                  </Link>
                  <Link to="/user/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-2 py-2 text-base font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                    <User size={20} /> Profile
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="flex items-center gap-3 px-2 py-2 text-base font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all text-left">
                    <LogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="group w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl font-bold text-blue-600 bg-blue-50/80 hover:bg-blue-100 transition-all duration-300"
                  >
                    <LogIn className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" /> Log in
                  </Link>
                  <Link 
                    to='/register'
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-3 px-4 text-center rounded-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:shadow-lg transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav