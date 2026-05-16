import React from 'react';
import { Shield, FileText, Database, Lock, Globe, Cookie, UserCheck, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
    const lastUpdated = "April 27, 2026";

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-12 text-center text-white">
                    <Shield className="w-16 h-16 mx-auto mb-4 opacity-90" />
                    <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
                    <p className="text-blue-100 font-medium">Last Updated: {lastUpdated}</p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed">
                    
                    {/* 1. Introduction */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><FileText className="text-blue-500 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
                            <p>
                                Welcome to SwiftWheel. We respect your privacy and are committed to protecting it. 
                                This Privacy Policy explains how SwiftWheel collects, uses, and safeguards your data globally 
                                for the purpose of providing robust and reliable vehicle rental services.
                            </p>
                        </div>
                    </section>

                    {/* 2. Information We Collect */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><Database className="text-blue-500 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Personal Info:</strong> Full Name, Email Address, and Phone Number.</li>
                                <li><strong>Identity Documents:</strong> Driving License and Voter ID / Aadhar for legally mandated identity verification.</li>
                                <li><strong>Booking Data:</strong> Preferred vehicle details, pickup and drop-off times, and rental locations.</li>
                                <li><strong>Payment Details:</strong> Transaction records (all direct card details are processed securely via our payment gateway).</li>
                            </ul>
                        </div>
                    </section>

                    {/* 3. How We Use Information */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><UserCheck className="text-blue-500 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Information</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>To seamlessly manage and execute your vehicle rental bookings.</li>
                                <li>To systematically verify your identity and ensure trust and safety across the platform.</li>
                                <li>To continuously evaluate and improve our digital and physical services.</li>
                                <li>To send transactional notifications, updates, and occasional marketing communications (which you can opt out of).</li>
                            </ul>
                        </div>
                    </section>

                    {/* 4. Data Protection */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><Lock className="text-blue-500 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Protection</h2>
                            <p>
                                We prioritize your data's security by employing rigid encryption protocols, securely managed 
                                cloud servers, and JWT (JSON Web Token) authentication to prevent unauthorized local or remote access to your account.
                            </p>
                        </div>
                    </section>

                    {/* 5. Third-Party Services */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><Globe className="text-blue-500 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party Services</h2>
                            <p>
                                Some operational infrastructure necessarily involves highly-vetted third parties:
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Payment Gateway:</strong> We use Cashfree to securely process user payments without cataloging direct card information on our servers.</li>
                                <li><strong>Hosting Services:</strong> Trusted architecture hosting to deliver constant 99.9% uptime and reliable performance.</li>
                            </ul>
                        </div>
                    </section>

                    {/* 6. Cookies Policy */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><Cookie className="text-blue-500 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies Policy</h2>
                            <p>
                                SwiftWheel strategically uses cookies and similar tracking technologies to store your session data, remember user flow states, 
                                and observe general tracking metrics to optimize your web experience.
                            </p>
                        </div>
                    </section>

                    {/* 7. User Rights */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><Shield className="text-blue-500 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">7. User Rights</h2>
                            <p>
                                You fully retain the right to access the data we have recorded about you. You can update your 
                                personal profile natively within your dashboard or request an account deletion and data scrubbing from our administrators.
                            </p>
                        </div>
                    </section>

                    {/* 8. Contact Information */}
                    <section className="flex gap-4">
                        <div className="flex-shrink-0 mt-1"><Mail className="text-blue-500 w-6 h-6" /></div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact Information</h2>
                            <p>
                                If you have any inquiries, suggestions, or concerns regarding your privacy, please connect with our Data Protection Officer at:
                            </p>
                            <p className="mt-2 font-medium text-blue-600">info@swiftwheel.com</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
