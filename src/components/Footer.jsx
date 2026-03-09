import React from 'react'
import { Link } from 'react-router-dom';
import { Car, Facebook, Twitter, Instagram, Phone, Mail, MapPin  } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <Link to='/' className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">SwiftWheel</span>
          </Link>
          <p className="leading-relaxed my-4">
            Your trusted partner for vehicle rentals. Experience the freedom of the road with our quality vehicles and exceptional service.
          </p>
          <div className="flex gap-4 mt-2">
            <Facebook className="hover:text-white cursor-pointer" />
            <Twitter className="hover:text-white cursor-pointer" />
            <Instagram className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/vehicles" className="hover:underline">Our Vehicles</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Bikes</a></li>
            <li><a href="#" className="hover:underline">Mopeds</a></li>
            <li><a href="#" className="hover:underline">EVs</a></li>
            <li><a href="#" className="hover:underline">Hourly rentals</a></li>
            <li><a href="#" className="hover:underline">Long-term Rentals</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Phone className="text-blue-400 w-5 h-5" /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-blue-400 w-5 h-5" /> info@swiftwheel.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="text-blue-400 w-5 h-5" /> 123 Main St, City, State 12345
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-sm flex flex-col sm:flex-row justify-between items-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} SwiftWheel. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link to="/terms" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer