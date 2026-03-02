import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConsultancyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryOfInterest: '',
    visaType: '',
    contactMethod: '',
    preferredDate: '',
    purpose: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const visaTypes = [
    'Study Visa', 'Tourist Visa', 'Work Visa', 'PR / Immigration',
    'Spouse Visa', 'Dependent Visa', 'Visitor Visa', 'Investor / Business Visa',
    'Permanent Residency', 'Family Reunification', 'Open Work Permit',
    'Express Entry', 'Super Visa', 'Citizenship Application', 'Other',
  ];

  const countries = [
    'Canada', 'Australia', 'United Kingdom', 'United States',
    'New Zealand', 'Germany', 'France', 'Italy', 'Sweden',
    'Netherlands', 'Denmark', 'Ireland', 'Finland',
    'Europe (Schengen)', 'Other',
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { fullName, email, phone, countryOfInterest, visaType, contactMethod } = formData;
    if (!fullName || !email || !phone || !countryOfInterest || !visaType || !contactMethod) {
      toast.error('❌ Please fill all required fields.');
      return false;
    }
    const nameRegex = /^[A-Za-z\s.'-]+$/;
    if (!nameRegex.test(fullName)) {
      toast.error('❌ Full name contains invalid characters.');
      return false;
    }
    const phoneRegex = /^\d{7,15}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('❌ Phone number must be 7-15 digits.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('❌ Email is invalid.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        'https://caials-ebon.onrender.com/api/consult',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 15000, // 15 seconds max
        }
      );

      toast.success(res.data?.message || '✅ Consultation submitted successfully!');

      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        countryOfInterest: '',
        visaType: '',
        contactMethod: '',
        preferredDate: '',
        purpose: '',
        message: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      if (error.code === 'ECONNABORTED') {
        toast.error('⚠️ Server took too long to respond. Please try again later.');
      } else {
        const backendMsg = error.response?.data?.message || '❌ Something went wrong. Please try again.';
        toast.error(backendMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-100 flex items-center justify-center px-4 py-10">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-3xl p-8 sm:p-10 bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-6 animate-fade-in">
          Book Your <span className="text-teal-600">Free Consultation</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
          />

          <div className="flex gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              pattern="\d{7,15}"
              title="Phone number must be 7-15 digits"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <select
            name="countryOfInterest"
            value={formData.countryOfInterest}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Country of Interest</option>
            {countries.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          <select
            name="visaType"
            value={formData.visaType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Visa Type</option>
            {visaTypes.map((v, i) => (
              <option key={i} value={v}>{v}</option>
            ))}
          </select>

          <select
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Preferred Contact Method</option>
            <option value="Phone">Phone</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
          </select>

        <input
  type="date"
  name="preferredDate"
  value={formData.preferredDate}
  onChange={handleChange}
  min={new Date().toISOString().split("T")[0]} // Disable past dates
  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 transition"
/>


          <input
            type="text"
            name="purpose"
            placeholder="Purpose of Consultation"
            maxLength="200"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          />

          <textarea
            name="message"
            placeholder="Additional Message (Optional)"
            maxLength="500"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white font-semibold bg-gradient-to-r from-indigo-500 to-teal-500 rounded-lg transition-all duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {loading ? 'Submitting...' : '🚀 Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConsultancyForm;
