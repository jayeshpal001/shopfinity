import axios from 'axios';
import  { useContext, useEffect, useState } from 'react';
import { FiUser, FiMail, FiShoppingBag, FiMapPin, FiPhone, FiEdit, FiLoader } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
  const {userData, setUserData} = useContext(AuthContext); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:5200/users/profile", {
          withCredentials: true
        });
        setUserData(data?.user);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FiLoader className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-red-50 rounded-lg shadow">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-700 mb-2">Profile Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
                  <FiUser className="w-20 h-20 text-indigo-400" />
                </div>
                <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md text-indigo-600 hover:bg-gray-100">
                  <FiEdit className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-6 md:mt-0 md:ml-10 text-center md:text-left">
                <h1 className="text-3xl font-bold">{userData?.name}</h1>
                <p className="flex items-center justify-center md:justify-start mt-2 text-indigo-100">
                  <FiMail className="mr-2" /> {userData?.email}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="bg-indigo-500 bg-opacity-30 px-3 py-1 rounded-full text-sm">
                    Premium Member
                  </span>
                  <span className="bg-indigo-500 bg-opacity-30 px-3 py-1 rounded-full text-sm">
                    Verified Account
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiUser className="mr-2 text-indigo-600" /> Personal Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">{userData.name || 'Not specified'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">January 15, 2023</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiMapPin className="mr-2 text-indigo-600" /> Contact Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium flex items-center">
                    <FiMail className="mr-2 text-indigo-500" /> {userData.email}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium flex items-center">
                    <FiPhone className="mr-2 text-indigo-500" /> 
                    {userData.phone || '+1 (555) 000-1234'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Shipping Address</p>
                  <p className="font-medium">
                    123 Ecommerce Street, Apt 4B<br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiShoppingBag className="mr-2 text-indigo-600" /> Shopping Activity
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-indigo-600">12</p>
                  <p className="text-gray-600">Total Orders</p>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-indigo-600">$1,240</p>
                  <p className="text-gray-600">Total Spent</p>
                </div>
                
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-indigo-600">4</p>
                  <p className="text-gray-600">Wishlist Items</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-200 px-8 py-6 bg-gray-50 flex flex-wrap gap-4">
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm">
              Edit Profile
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
              View Order History
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition ml-auto">
              Account Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;