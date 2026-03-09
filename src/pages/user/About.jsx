import React from 'react';
import { ShieldCheck, IndianRupee, Bike, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About SwiftWheel</h1>
          <p className="text-xl md:text-2xl font-light">Ride Smart. Rent Fast.</p>
        </div>
      </section>

      {/* Company Description & Mission/Vision */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <p className="text-lg text-gray-600">
            SwiftWheel is a premier platform dedicated to helping users rent bikes easily for city travel, daily commuting, and tourism. 
            Our ultimate goal is to provide affordable, convenient, and flexible transportation solutions tailored to your unique needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              "Our mission is to make urban transportation simple and accessible by providing reliable two-wheeler rental services to everyone, everywhere."
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              "Our vision is to become India's most trusted bike rental platform, setting the benchmark for quality, transparency, and customer satisfaction."
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Easy Bike Booking</h4>
              <p className="text-gray-600 text-sm">Book your perfect ride in just a few clicks. No complex paperwork.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <IndianRupee className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Affordable Pricing</h4>
              <p className="text-gray-600 text-sm">Competitive rates tailored to fit your daily, weekly, or monthly needs.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Bike className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Multiple Options</h4>
              <p className="text-gray-600 text-sm">From daily commuters to powerful cruisers, find the bike that suits you.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">Widely Available</h4>
              <p className="text-gray-600 text-sm">Our extensive network ensures you can pick up a bike near you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cities */}
      <section className="py-16 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Service Cities</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          SwiftWheel proudly plans to serve major Indian cities, bringing seamless bike rentals directly to your neighborhood.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {['Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'].map((city, index) => (
            <span key={index} className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium shadow-sm">
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center mt-auto">
        <p className="text-gray-400">© 2024 SwiftWheel. Making your city travel effortless.</p>
      </footer>
    </div>
  );
};

export default About;
