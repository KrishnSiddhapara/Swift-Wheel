import React from 'react';
import { Scale, Users, Map, CreditCard, ShieldAlert, XCircle, AlertTriangle, UserX, RefreshCw, Mail } from 'lucide-react';

const Terms = () => {
    const lastUpdated = "April 27, 2026";

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-12 text-center text-white">
                    <Scale className="w-16 h-16 mx-auto mb-4 opacity-90" />
                    <h1 className="text-4xl font-extrabold mb-2">Terms of Service</h1>
                    <p className="text-gray-300 font-medium">Last Updated: {lastUpdated}</p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed">
                    
                    {/* 1. Introduction */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><Users className="text-gray-900 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
                            <p>
                                These Terms of Service ("Terms") constitute a legally binding agreement between you as 
                                the user and SwiftWheel relating to your usage of our vehicle rental 
                                applications. By signing up or explicitly creating a booking with us, you automatically 
                                agree to abide by these established standards.
                            </p>
                        </div>
                    </section>

                    {/* 2. Eligibility */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><ShieldAlert className="text-gray-900 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Eligibility</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Users must be 18 years of age or older prior to reserving any vehicle on the platform.</li>
                                <li>Possession of a valid and active Indian driving license is an absolute necessity. 
                                Expired or structurally modified licenses will result in an instant service block.</li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. Booking Rules */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><Map className="text-gray-900 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Booking Rules</h2>
                            <p>
                                Timing is critical to our operation matrix. The rented vehicle must invariably be returned on time 
                                at the specified drop-off location. Late returns will explicitly attract a late charge compounded hourly unless informed otherwise.
                            </p>
                        </div>
                    </section>

                    {/* 4. Payment Terms */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><CreditCard className="text-gray-900 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Payment Terms</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>All digital payments are collected comprehensively ahead of the rental term through our highly secured Cashfree payment gateway.</li>
                                <li>A standard security deposit is required and varies by vehicle category.</li>
                                <li><strong>Refund Policy:</strong> The security deposit naturally returns to the original payment source assuming no infractions exist, usually settling in 3-5 business days.</li>
                            </ul>
                        </div>
                    </section>

                    {/* 5. User Responsibilities */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><AlertTriangle className="text-gray-900 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">5. User Responsibilities</h2>
                            <p>While utilizing a SwiftWheel property, you solemnly assume these responsibilities:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>You must religiously follow all state and local traffic laws.</li>
                                <li>You shall maintain the vehicle's hygienic and mechanical condition equivalently matching the pickup state.</li>
                                <li>The vehicle is categorically forbidden from partaking in illegal races, transport of restricted goods, or commercial off-roading.</li>
                            </ul>
                        </div>
                    </section>

                    {/* 6. Cancellation Policy */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><XCircle className="text-gray-900 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cancellation Policy</h2>
                            <p>
                                Customers may cancel at anytime from their dashboard tracking suite. Standard structural cancellation 
                                rules universally apply: early cancellations observe minimal penalty, whereas cancellations done under 24 hours of 
                                trip initiation draw moderate fees correlating to the expected transit.
                            </p>
                        </div>
                    </section>

                    {/* 7. Liability */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><ShieldAlert className="text-gray-900 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Liability</h2>
                            <p>
                                The operator assumes complete, undivided liability for any incurred hardware vehicular damage over testing standard wear and tear. SwiftWheel 
                                officially asserts zero formal liability for criminal misuse, cargo theft, or third-party impairment arising out of an active ride order.
                            </p>
                        </div>
                    </section>

                    {/* 8. Account Suspension */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><UserX className="text-gray-900 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Account Suspension</h2>
                            <p>
                                SwiftWheel administrators technically reserve supreme rights to indiscriminately suspend user profiles demonstrating 
                                aggressive driving behaviors or gross Terms defiance based on collected fleet intelligence and partner feedback.
                            </p>
                        </div>
                    </section>

                    {/* 9. Changes to Terms */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><RefreshCw className="text-gray-900 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to Terms</h2>
                            <p>
                                SwiftWheel preserves the exclusive right to modify or adjust these precise Terms of Service entirely at its own 
                                discretion at any projected time frame. User continuity signifies tacit adaptation to changes.
                            </p>
                        </div>
                    </section>

                    {/* 10. Contact Section */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><Mail className="text-gray-900 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Information</h2>
                            <p>
                                Clarifications regarding terms binding context? Do not hesitate to engage our priority support wing at:
                            </p>
                            <p className="mt-2 font-medium text-gray-900">info@swiftwheel.com</p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Terms;
