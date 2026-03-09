import React from 'react'
import { useState } from "react";
import { Button } from '@mui/material';
import { LoaderPinwheel , Menu, X, LogIn } from "lucide-react";
import { Link } from 'react-router-dom';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-elegant sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to='/' className="flex items-center space-x-2 text-gray-800">
            <LoaderPinwheel  className="h-8 w-8" />
            <span className="text-xl font-bold">SwiftWheel</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to='/' className="text-gray-700 hover:text-blue-700 transition-colors">Home</Link>
            <Link to='/vehicles' className="text-gray-700 hover:text-blue-700 transition-colors">Vehicles</Link>
            <Link to='/about' className="text-gray-700 hover:text-blue-700 transition-colors">About</Link>
            <Link to='/contact' className="text-gray-700 hover:text-blue-700 transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to='/login' className='py-1 px-2 flex items-center gap-2 rounded-sm transition duration-300 hover:bg-gray-200'><LogIn className="h-4 w-4" /><span>Login</span></Link>
            <Link to='/register' className='rounded-sm py-1 px-3 transition duration-300 bg-blue-500 text-white hover:bg-blue-700'>Sign Up</Link>
          </div>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="small"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to='/vehicles'
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Vehicles
              </Link>
              <Link
                to='/about'
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to='/contact'
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4 pb-5">
                <Link to="/login">
                <Button variant='ghost' size="small">
                    <LogIn className="h-4 w-4 mr-2" /> Login
                </Button>
                </Link>
                <Link to='/register'>
                    <Button variant='contained' size="small">Sign Up</Button>
                </Link>
          </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav