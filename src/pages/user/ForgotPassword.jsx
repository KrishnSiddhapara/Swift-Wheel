import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, LoaderPinwheel } from 'lucide-react';
import api from '../../api/axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setMessage(data.message || 'Password reset link sent to your email (or check terminal if no SMTP is configured).');
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending password reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-14 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 px-4 min-h-screen">
      <div className="text-center mb-6">
        <div className="text-white text-3xl font-bold flex justify-center items-center gap-2">
          <LoaderPinwheel className='w-10 h-10' /> <span>SwiftWheel</span>
        </div>
      </div>
      <div className="w-full max-w-md bg-gray-100 rounded-lg shadow-lg p-8 pt-5">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Forgot Password</h2>
        <p className="text-center text-gray-500 mb-6">Enter your email to receive a reset link</p>

        {error && <div className="mb-4 text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">{error}</div>}
        {message && <div className="mb-4 text-emerald-600 text-sm text-center font-medium bg-emerald-50 p-2 rounded">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-500 hover:underline flex items-center justify-center gap-1 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
