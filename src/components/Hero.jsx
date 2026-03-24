import React, { useEffect } from 'react'
import SearchBar from './SearchBar';

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

      <SearchBar />

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