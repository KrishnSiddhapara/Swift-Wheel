import React from 'react';
import { Mail, Phone, MapPin, Shield, CheckCircle2, Clock, Map, AlertTriangle, AlertCircle, FileText, Ban, RefreshCcw } from 'lucide-react';

const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Terms and Conditions – SwiftWheel</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Welcome to SwiftWheel. We provide premium rental services for vehicles, mopeds, and cars across major cities in India. 
            By accessing our platform and booking vehicles, you agree to be bound by the terms and policies listed below. 
            Please read them carefully before starting your journey.
          </p>
        </div>

        {/* Policies Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          
          <div className="p-8 md:p-12 space-y-12">
            
            {/* 1. Eligibility */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Eligibility</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed">
                  <li>Users must be at least <strong>18 years old</strong> for renting two-wheelers (vehicles and mopeds).</li>
                  <li>Users must be at least <strong>21 years old</strong> for renting cars.</li>
                  <li>A valid and original Indian driving license must be presented at the time of pickup.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 2. Vehicle Booking */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Vehicle Booking</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed">
                  <li>Vehicles can be booked seamlessly through the SwiftWheel website or mobile platform.</li>
                  <li>Users must provide accurate personal information and matching identification.</li>
                  <li>Booking confirmation is strictly subject to vehicle availability at the selected location.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 3. Rental Duration */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Rental Duration</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed">
                  <li>Rentals are calculated and charged based on strict hourly or daily rates.</li>
                  <li>Vehicles must be returned on time to the designated drop-off location.</li>
                  <li><strong>Late returns</strong> may result in additional penalty charges equivalent to double the hourly rate for the delayed duration.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 4. Security Deposit */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <AlertCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Security Deposit</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed">
                  <li>Some premium vehicles may require a fully refundable security deposit prior to pickup.</li>
                  <li>The deposit will be refunded automatically to the original payment method after a satisfactory post-rental vehicle inspection.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 5. Vehicle Usage Rules */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Map className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Vehicle Usage Rules</h2>
                <p className="text-gray-600 mb-3 font-medium">By renting a vehicle, you agree to:</p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed">
                  <li>Strictly follow all Indian traffic rules and local state regulations.</li>
                  <li>Not use the vehicles for any racing, towing, or illegal activities.</li>
                  <li>Not allow any unauthorized or unregistered persons to drive the vehicle under any circumstances.</li>
                  <li>Use the vehicle only within the allowed city limits or authorized states as per your booking plan.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 6. Damage and Liability */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <AlertTriangle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Damage and Liability</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed">
                  <li>Users are solely responsible for any physical damage/loss to the vehicle during their active rental period.</li>
                  <li>Estimated repair costs for minor damages may be deducted directly from the security deposit.</li>
                  <li>In case of major accidents, the user will be liable to pay the insurance deductible or actual repair costs alongside downtime charges.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 7. Fuel Policy */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <RefreshCcw className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Fuel Policy</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed">
                  <li>Vehicles are provided on a "level-to-level" basis. They should be returned with the <strong>same fuel level</strong> as provided during pickup.</li>
                  <li>Additional fuel charges (plus a refueling service fee) will apply if the fuel level is lower upon return. No refunds are given for excess fuel.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 8. Cancellation Policy */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Ban className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cancellation Policy</h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 leading-relaxed">
                  <li>Users can seamlessly cancel bookings online before the rental start time.</li>
                  <li>Refund policies and cancellation fees apply dynamically depending on the cancellation timing (e.g., free cancellation 24 hours prior).</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 9. Privacy Policy */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy and Data Protection</h2>
                <p className="text-gray-600 leading-relaxed">
                  SwiftWheel collects essential user information strictly for booking, verification, and service enhancement purposes. 
                  All user data is encrypted and handled securely in accordance with Indian IT laws and will completely not be shared with unauthorized third parties.
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 10. Changes to Terms */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  SwiftWheel reserves the exclusive right to update, modify, or replace these terms and conditions at any time without prior individual notice. Continued use of our platform implies acceptance of the updated terms.
                </p>
              </div>
            </section>

          </div>

          {/* Contact Footer Banner */}
          <div className="bg-gray-50 p-8 md:p-12 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Clarification?</h3>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              If you have any questions or require support regarding these terms, our dedicated team is eager to assist you.
            </p>
            
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4 text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-blue-600 mt-1 text-sm">support@swiftwheel.com</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4 text-blue-600">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900">Phone</h4>
                <p className="text-blue-600 mt-1 text-sm">+91 98765 43210</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-3 rounded-full mb-4 text-blue-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900">Location</h4>
                <p className="text-gray-600 mt-1 text-sm">Ahmedabad, Gujarat, India</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;
