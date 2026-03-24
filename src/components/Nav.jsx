import React from 'react'
import { useState } from "react";
import { Button } from '@mui/material';
import { LoaderPinwheel , Menu, X, LogIn } from "lucide-react";
import { Link } from 'react-router-dom';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <Link to='/login' className='group flex items-center gap-2 font-semibold text-base text-gray-700 hover:text-blue-600 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-50/50'>
              <LogIn className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" /><span>Log in</span>
            </Link>
            <Link to='/register' className='py-2.5 px-6 rounded-full font-bold text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300'>
              Sign Up
            </Link>
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav