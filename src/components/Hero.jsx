import React, { useEffect } from 'react'
import { MapPin } from 'lucide-react';
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Search } from 'lucide-react';

//Scroll Reveal
import ScrollReveal from 'scrollreveal';

const Hero = () => {
  useEffect(() => {
    ScrollReveal().reveal('.hero-reveal', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'left',
      reset: false, 
    });
  }, []);

    useEffect(() => {
    ScrollReveal().reveal(".head-reveal", {
      scale: 0.85,
      distance: "0px",
      duration: 1500,
      easing: "ease-in-out",
      reset: false
    })
  }, []);

  useEffect(() => {
    ScrollReveal().reveal(".reveal-y", {
      origin: "bottom",
      distance: "100px",
      duration: 1500,
      interval: 200,
      easing: "ease-in-out",
      reset: false
    })
  }, []);

  return (
    <section className="bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop')] bg-center bg-cover bg-no-repeat text-amber-700 sm:py-28 py-16 px-4 text-center relative before:absolute before:inset-0 before:bg-black/50 overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 hero-reveal text-white">
        Find Your Perfect <span className="text-blue-900">Rental Ride</span>
      </h1>
      <p className="text-lg sm:text-xl mb-12 text-gray-200 hero-reveal">
        Discover amazing deals on quality vehicles. Book now and drive away with confidence.
      </p>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-5 gap-4 items-end text-black hero-reveal">
        {/* Pickup Location */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <MapPin className='w-5 h-5' /> <span>Pickup Location</span>
          </label>
          <select className="w-full p-2 border border-gray-300 rounded cursor-pointer">
            <option>Select city</option>
            <option>Mumbai</option>
            <option>Ahmedabad</option>
            <option>Surat</option>
          </select>
        </div>

        {/* Pickup Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Calendar className='w-5 h-5' /> <span>Pickup Date</span>
          </label>
          <input type="date" className="w-full p-2 border border-gray-300 rounded cursor-pointer" />
        </div>

        {/* Pickup Time */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Clock className='w-5 h-5' /> <span>Pickup Time</span>
          </label>
          <input type='time' className="w-full p-2 border border-gray-300 rounded cursor-pointer" />
        </div>

        {/* Return Date */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Calendar className='w-5 h-5' /> <span>Return Date</span>
          </label>
          <input type="date" className="w-full p-2 border border-gray-300 rounded" />
        </div>

        {/* Button */}
        <div>
          <button className="flex items-center justify-center gap-2 w-full cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
            <Search className='w-5 h-5' /> <span>Search Rides</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-white hero-reveal">
        <div>
          <h2 className="sm:text-4xl text-3xl font-bold text-blue-500">500+</h2>
          <p className="sm:text-lg text-gray-200">Effortable Rides</p>
        </div>
        <div>
          <h2 className="sm:text-4xl text-3xl font-bold">50+</h2>
          <p className="sm:text-lg text-gray-200">Locations</p>
        </div>
        <div>
          <h2 className="sm:text-4xl text-3xl font-bold">24/7</h2>
          <p className="sm:text-lg text-gray-200">Support</p>
        </div>
        <div>
          <h2 className="sm:text-4xl text-3xl font-bold">99%</h2>
          <p className="sm:text-lg text-gray-200">Satisfaction</p>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Hero