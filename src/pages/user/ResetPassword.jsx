import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, LoaderPinwheel } from 'lucide-react';
import api from '../../api/axios';
import { useData } from '../../context/DataProvider';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { login } = useData();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      const { data } = await api.put(`/auth/reset-password/${token}`, { password });
      setMessage(data.message || 'Password reset successfully. Redirecting to login...');
      
      // Navigate to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired token. Please request a new link.');
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Reset Password</h2>
        <p className="text-center text-gray-500 mb-6">Enter your new password below</p>

        {error && <div className="mb-4 text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">{error}</div>}
        {message && <div className="mb-4 text-emerald-600 text-sm text-center font-medium bg-emerald-50 p-2 rounded">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
                placeholder="Enter new password"
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="6"
                placeholder="Confirm new password"
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !!message}
            className={`w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition duration-200 ${loading || !!message ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
