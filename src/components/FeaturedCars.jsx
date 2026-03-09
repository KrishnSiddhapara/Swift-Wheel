import React from 'react'
import { Bike, IndianRupee, MapPin, Users, Cog, Fuel, Star, ArrowRight } from "lucide-react";

//ScrollReveal
import ScrollReveal from 'scrollreveal'

const vehicles = [
  {
    id: 1,
    name: 'Honda Activa 6G',
    year: 2023,
    location: 'Mumbai',
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Petrol',
    price: 400,
    rating: 4.8,
    badges: ['Top Seller', 'Easy to Ride'],
    type: 'Scooter',
    status: 'Available',
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: 'Hero Splendor Plus',
    year: 2023,
    location: 'Delhi',
    seats: 2,
    transmission: 'Manual',
    fuel: 'Petrol',
    price: 300,
    rating: 4.9,
    badges: ['High Mileage', 'Commuter'],
    type: 'Bike',
    status: 'Available',
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf80h?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: 'Honda Shine',
    year: 2022,
    location: 'Pune',
    seats: 2,
    transmission: 'Manual',
    fuel: 'Petrol',
    price: 450,
    rating: 4.7,
    badges: ['Reliable', 'Comfortable'],
    type: 'Bike',
    status: 'Available',
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    name: 'Honda Livo',
    year: 2022,
    location: 'Bangalore',
    seats: 2,
    transmission: 'Manual',
    fuel: 'Petrol',
    price: 400,
    rating: 4.5,
    badges: ['Stylish', 'Smooth'],
    type: 'Bike',
    status: 'Available',
    image: "https://images.unsplash.com/photo-1599819811279-d5064ce9b5b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 5,
    name: 'Royal Enfield Classic 350',
    year: 2023,
    location: 'Goa',
    seats: 2,
    transmission: 'Manual',
    fuel: 'Petrol',
    price: 1200,
    rating: 4.9,
    badges: ['Cruiser', 'Iconic'],
    type: 'Bike',
    status: 'Available',
    image: "https://images.unsplash.com/photo-1606016159991-ddebb9151528?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 6,
    name: 'Bajaj Pulsar 150',
    year: 2022,
    location: 'Chennai',
    seats: 2,
    transmission: 'Manual',
    fuel: 'Petrol',
    price: 600,
    rating: 4.6,
    badges: ['Sporty', 'Powerful'],
    type: 'Bike',
    status: 'Available',
    image: "https://images.unsplash.com/photo-1568284561858-bdba21389814?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const FeaturedCars = () => {
  return (
    <section className="bg-gray-100 py-20 sm:px-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12 head-reveal">
        <h2 className="sm:text-4xl text-3xl font-bold mb-2 flex justify-center items-center gap-2">
          <span className="text-blue-500"><Bike className='w-12 h-12' /></span><span className='text-gray-800'>Featured Bikes</span>
        </h2>
        <p className="text-gray-600 text-lg">Discover our handpicked selection of premium bikes, perfect for Indian roads</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((bike) => (
          <div key={bike.id} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-3 reveal-y">
            <div className="relative overflow-hidden">
              <img src={bike.image} alt={bike.name} className="rounded-md w-full h-48 sm:h-56 md:h-60 object-cover" />
              <span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-full shadow">{bike.type}</span>
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">{bike.status}</span>
            </div>
            <div className="mt-4">
                <div className='flex justify-between items-center'>
                    <h3 className="text-lg font-semibold">{bike.name}</h3>
                    <div className="text-yellow-500 text-sm flex items-center gap-1"><Star className='w-5 h-5' />{bike.rating}</div>
                </div>
              <p className="text-sm text-gray-500">{bike.year}</p>
              <div className="flex items-center text-sm text-gray-500 my-4 gap-1">
                <MapPin className='w-4 h-4' /><span>{bike.location}</span>
              </div>
              <div className="flex sm:items-center sm:flex-row flex-col sm:gap-10 gap-2 mt-2 text-gray-600 text-sm">
                <span className='inline-flex items-center gap-1'><Users className='w-4 h-4 text-blue-500' /> {bike.seats} seats</span>
                <span className='inline-flex items-center gap-1'><Cog className='w-4 h-4 text-blue-500' /> {bike.transmission}</span>
                <span className='inline-flex items-center gap-1'><Fuel className='w-4 h-4 text-blue-500' /> {bike.fuel}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {bike.badges.map((badge, i) => (
                  <span key={i} className="bg-gray-50 text-xs px-2 py-1 rounded-full font-semibold border border-gray-200">{badge}</span>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold text-blue-500 flex items-center"><IndianRupee className="w-5 h-5"/>{bike.price}<span className="text-sm font-normal text-gray-500">/day</span></p>
              </div>
              <div className="flex sm:flex-row flex-col mt-4 gap-3">
                <button className="sm:w-1/2 w-full border border-gray-300 px-3 py-2 rounded cursor-pointer transition duration-300 hover:bg-gray-300">View Details</button>
                <button className="sm:w-1/2 w-full bg-green-600 text-white px-3 py-2 rounded cursor-pointer transition duration-300 hover:bg-green-700">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className='mx-auto flex items-center justify-center mt-12 bg-blue-500 py-3 px-5 text-white rounded cursor-pointer gap-1 transition duration-300 hover:bg-blue-700'>View All Bikes <ArrowRight className='w-5 h-5' /></button>
    </section>
  )
}

export default FeaturedCars