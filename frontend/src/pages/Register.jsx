import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "lucide-react";
import axios from "axios";

export function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false); // flag for OTP status
  const [serverMsg, setServerMsg] = useState(""); // optional feedback
   const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Send OTP to user's email
const handleSendOTP = async (e) => {
   e.preventDefault();
  setIsLoading(true);
  try {
    const res = await axios.post("http://localhost:5200/users/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
    setOtpSent(true);
    console.log('Please enter otp: ', res.data.user);
    alert(res.data.message);
    setServerMsg("OTP sent to your email.");
  } catch (err) {
    setServerMsg(err.response?.data?.message || "Failed to send OTP");
  }finally {
    setIsLoading(false);
  }
};
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const res = await axios.post("http://localhost:5200/users/register/verify-otp", formData, {
      withCredentials: true,
    });
    console.log(res.data);
    
    setServerMsg("Registration successful!");
    alert("Registration Successull")
    navigate('/login')
    
  } catch (err) {
    setServerMsg(err.response?.data?.message || "OTP verification failed");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left */}
        <div className="hidden md:block relative w-1/2 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="text-white text-center space-y-6">
              <ShoppingBagIcon className="w-20 h-20 mx-auto text-white/90" />
              <h2 className="text-4xl font-bold">Welcome to Shopfinity</h2>
              <p className="text-xl font-light">
                Discover trendy products, seamless shopping, and fast delivery
              </p>
              <div className="mt-8 space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-6 h-6 text-green-400" />
                  <span>Handpicked, high-quality items</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-6 h-6 text-green-400" />
                  <span>Secure and fast checkout</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-6 h-6 text-green-400" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join as a Junior
            </h2>
            <p className="text-gray-500">Create your account in 30 seconds</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

             {/* OTP */}
            {otpSent && (
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                  className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Terms checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                disabled={isLoading}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-purple-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and
                <a href="#" className="text-purple-600 hover:underline">
                  {" "}
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
             {otpSent?(<button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                isLoading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg'
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>):(<button type='button'
              onClick={handleSendOTP}
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                isLoading 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-lg'
              }`}
            >
              {isLoading ? 'Otp Sending...' : 'Send OTP'}
            </button>)}
          </form>

          {serverMsg && (
            <p className="mt-4 text-center text-sm text-red-500">{serverMsg}</p>
          )}

          <p className="mt-8 text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
             