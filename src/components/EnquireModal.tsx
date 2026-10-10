import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquireModal: React.FC<EnquireModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: 'India',
    city: 'Mumbai',
    phone: '',
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // Add logic here to post the form data if needed.
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white w-full max-w-[500px] p-[50px] shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#A87B64] hover:text-[#8a614a] transition-colors"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                <circle cx="12" cy="12" r="10" />
                <path d="M15 9l-6 6M9 9l6 6" />
              </svg>
            </button>

            <h2 className="text-center font-serif text-[28px] text-[#A87B64] mb-8">
              Request a call back
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2.5 text-[15px] text-gray-800 placeholder:text-gray-400 focus:border-[#A87B64] focus:outline-none bg-transparent"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail ID*"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2.5 text-[15px] text-gray-800 placeholder:text-gray-400 focus:border-[#A87B64] focus:outline-none bg-transparent"
                />
              </div>

              <div className="relative">
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-300 py-2.5 text-[15px] text-gray-800 focus:border-[#A87B64] focus:outline-none appearance-none bg-transparent"
                >
                  <option value="" disabled>Select Country*</option>
                  <option value="India">India</option>
                  {/* Add more countries if needed */}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-300 py-2.5 text-[15px] text-gray-800 focus:border-[#A87B64] focus:outline-none appearance-none bg-transparent"
                >
                  <option value="" disabled>Select City*</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  {/* Add more cities if needed */}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              <div className="relative flex items-center border-b border-gray-300 focus-within:border-[#A87B64]">
                <span className="text-gray-800 font-semibold text-[15px] mr-1 pb-0.5">+91</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter Mobile Number*"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full py-2.5 text-[15px] text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
                />
              </div>

              <div className="flex items-start gap-3 mt-4">
                <label className="relative flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="sr-only peer"
                  />
                  <div className="w-[14px] h-[14px] border border-[#A87B64] flex items-center justify-center">
                    {formData.consent && <div className="w-[8px] h-[8px] bg-[#A87B64]" />}
                  </div>
                </label>
                <p className="text-[13px] leading-snug text-gray-600">
                  By checking this box, you agree to our <a href="#" className="text-[#A87B64] hover:underline">Privacy Policy</a> and consent to be contacted with relevant updates.
                </p>
              </div>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="border border-[#A87B64] text-[#A87B64] px-12 py-3 text-[14px] hover:bg-[#A87B64] hover:text-white transition-colors"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
