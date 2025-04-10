import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaGraduationCap, FaLaptopCode, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const BecomeInstructor = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    expertise: '',
    experience: '',
    portfolio: '',
    motivation: ''
  });

  const benefits = [
    {
      icon: <FaChalkboardTeacher className="text-3xl text-purple-500" />,
      title: 'Flexible Teaching',
      description: 'Create and manage your courses on your own schedule while reaching students globally.'
    },
    {
      icon: <FaGraduationCap className="text-3xl text-blue-500" />,
      title: 'Professional Growth',
      description: 'Access professional development resources and join a community of expert educators.'
    },
    {
      icon: <FaLaptopCode className="text-3xl text-green-500" />,
      title: 'Advanced Platform',
      description: 'Utilize cutting-edge teaching tools and blockchain technology for innovative education.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex-grow">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full ${theme.background === 'bg-white' ? 'bg-blue-100/50' : 'bg-blue-900/10'}`}
        />
        <motion.div 
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 100, -100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute top-1/3 -left-20 w-64 h-64 rounded-full ${theme.background === 'bg-white' ? 'bg-purple-100/50' : 'bg-purple-900/10'}`}
        />
        <motion.div 
          animate={{
            x: [0, 150, -150, 0],
            y: [0, -150, 150, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className={`absolute -bottom-20 right-1/4 w-80 h-80 rounded-full ${theme.background === 'bg-white' ? 'bg-indigo-100/50' : 'bg-indigo-900/10'}`}
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-full h-full bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10" />
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className={`text-4xl md:text-5xl font-bold ${theme.text.primary} mb-6`}>
              Become an Instructor
            </h1>
            <p className={`text-xl ${theme.text.secondary} max-w-3xl mx-auto mb-8`}>
              Share your blockchain expertise and shape the future of Web3 education while building your professional career.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className={`${theme.background.secondary} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold ${theme.text.primary} text-center mb-12`}>
            Why Teach With Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`${theme.card} p-8 rounded-2xl shadow-lg border ${theme.border}`}
              >
                <div className="flex items-center mb-4">
                  {benefit.icon}
                  <h3 className={`text-xl font-bold ${theme.text.primary} ml-4`}>
                    {benefit.title}
                  </h3>
                </div>
                <p className={`${theme.text.secondary}`}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Become an Instructor
              </h2>
              <p className="text-gray-300 text-lg">
                Join our community of expert educators and shape the future of blockchain technology
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    required
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expertise" className="block text-sm font-medium text-gray-200 mb-2">
                    Primary Area of Expertise *
                  </label>
                  <select
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    required
                  >
                    <option value="">Select your expertise</option>
                    <option value="blockchain">Blockchain Development</option>
                    <option value="smart-contracts">Smart Contracts</option>
                    <option value="defi">DeFi</option>
                    <option value="web3">Web3</option>
                    <option value="cryptocurrency">Cryptocurrency</option>
                    <option value="nft">NFT Development</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-200 mb-2">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="1"
                    max="50"
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium text-gray-200 mb-2">
                  Portfolio/LinkedIn URL *
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  required
                  placeholder="https://"
                />
              </div>

              <div>
                <label htmlFor="motivation" className="block text-sm font-medium text-gray-200 mb-2">
                  Why do you want to teach with us? *
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800/50 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  required
                  placeholder="Tell us about your teaching philosophy and what motivates you to teach blockchain technology..."
                />
              </div>

              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 hover:from-purple-700 hover:to-indigo-700"
                >
                  Submit Application
                  <FaArrowRight className="text-lg" />
                </motion.button>
                <p className="text-gray-400 text-sm text-center mt-4">
                  * Required fields
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BecomeInstructor;

