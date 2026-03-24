import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import { Facebook, Mail, Lock, LoaderPinwheel, User,Instagram, Phone } from 'lucide-react';
import ScrollReveal from 'scrollreveal';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useData();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [role, setRole] = useState('user');

    const handleRegister = async (e) => {
      e.preventDefault();
      setError('');
      try {
        await register({ name, email, phone, password, role });
        if (role === 'seller') navigate('/seller');
        else navigate('/');
      } catch (err) {
        setError(err);
      }
    };
    useEffect(() => {
        ScrollReveal().reveal(".reveal-x", {
            origin: "left",
            distance: "100px",
            duration: 1500,
            easing: "ease-in-out",
            reset: false
        })
    }, [])
    
  return (
    <div className="py-14 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 px-4">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="text-white text-3xl font-bold flex justify-center items-center gap-2">
           <LoaderPinwheel className='w-10 h-10' /> <span>SwiftWheel</span>
          </div>
        </div>
      <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-lg p-8 pt-5 reveal-x">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">Join thousands of happy customers</p>

        {/* Form */}
        <form onSubmit={handleRegister}>
        {error && <div className="mb-4 text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">{error}</div>}

        {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className="w-full bg-white pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

        {/* Mobile Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter your mobile number"
                className="w-full bg-white pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>


            {/* Email  */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

            {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Register As</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`py-2 px-1 rounded-md text-sm font-medium border transition-colors ${role === 'user' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`py-2 px-1 rounded-md text-sm font-medium border transition-colors ${role === 'seller' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              >
                Seller
              </button>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col sm:items-center sm:gap-0 gap-2 justify-between text-sm mb-6">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" className="cursor-pointer appearance-none h-4 w-4 border border-gray-300 rounded-sm checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <span className='text-base'>Remember me</span>
            </label>
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-between gap-6 my-6">
          <span className="border-t border-gray-300 w-full"></span>
          <span className="text-sm text-gray-400 w-full">Or continue with</span>
          <span className="border-t border-gray-300 w-full"></span>
        </div>

        {/* Social Login */}
        <div className="flex gap-4">
          <button className="w-1/2 flex cursor-pointer items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-blue-700 hover:text-white transition duration-300">
            <Instagram className="mr-2" /> Google
          </button>
          <button className="w-1/2 flex cursor-pointer items-center justify-center border border-gray-300 py-2 rounded-md hover:bg-blue-700 hover:text-white transition duration-300">
            <Facebook className="mr-2" /> Facebook
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  )
}

export default Register