import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Contact SwiftWheel</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our vehicle rentals? We are here to help you ride smart and rent fast.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Information Cards */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-blue-600 text-white rounded-xl p-8 shadow-md h-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 mt-1 text-blue-200" />
                  <div>
                    <h4 className="font-semibold text-lg">Location</h4>
                    <p className="text-blue-100">Ahmedabad, Gujarat, India</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 mt-1 text-blue-200" />
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <p className="text-blue-100">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 mr-4 mt-1 text-blue-200" />
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <p className="text-blue-100">support@swiftwheel.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-blue-500">
                <p className="text-blue-100 italic text-sm text-center">
                  "Our support team will respond within 24 hours."
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="md:col-span-3 bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
