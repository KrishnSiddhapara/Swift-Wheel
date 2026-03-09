import React from 'react'
import { Shield, Clock4, CreditCard, MapPin, Headphones, FileBadge, Users, Zap  } from 'lucide-react';

const features = [
  {
    title: 'Fully Insured',
    description: 'All our vehicles come with comprehensive insurance coverage for your peace of mind.',
    icon: <Shield className='w-8 h-8' />,
  },
  {
    title: '24/7 Service',
    description: 'Round-the-clock customer support and roadside assistance whenever you need it.',
    icon: <Clock4 className='w-8 h-8' />,
  },
  {
    title: 'Easy Payment',
    description: 'Secure online payments with multiple payment options and instant confirmation.',
    icon: <CreditCard className='w-8 h-8' />,
  },
  {
    title: 'Multiple Locations',
    description: 'Pick up and drop off at any of our 50+ convenient locations across the country.',
    icon: <MapPin className='w-8 h-8' />,
  },
  {
    title: 'Expert Support',
    description: 'Our dedicated team is here to help you find the perfect vehicle for your needs.',
    icon: <Headphones className='w-8 h-8' />,
  },
  {
    title: 'Premium Quality',
    description: 'All vehicles are regularly maintained and meet our high-quality standards.',
    icon: <FileBadge className='w-8 h-8' />,
  },
  {
    title: 'Trusted by Thousands',
    description: 'Join over 100,000 satisfied customers who trust us with their transportation needs.',
    icon: <Users className='w-8 h-8' />,
  },
  {
    title: 'Instant Booking',
    description: 'Book your car in just a few clicks and get instant confirmation via email.',
    icon: <Zap className='w-8 h-8' />,
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-100 px-4 sm:px-6 lg:px-28">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="sm:text-4xl text-3xl font-bold text-gray-800 mb-4 hero-reveal">Why Choose SwiftWheel?</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg hero-reveal">
          We're committed to providing you with the best bike rental experience through our Effordable services and customer-first approach.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col bg-white items-center text-center border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transform hover:-translate-y-2 transition duration-300 reveal-y"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 mb-4 text-white">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features