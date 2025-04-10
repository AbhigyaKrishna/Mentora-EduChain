import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHandshake, FaChartLine, FaGlobe, FaRocket, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Partners = () => {
  const { theme } = useTheme();

  const partnerBenefits = [
    {
      icon: <FaChartLine className="text-3xl text-blue-500" />,
      title: 'Strategic Growth',
      description: 'Expand market presence and enhance institutional reach through our established educational platform.'
    },
    {
      icon: <FaGlobe className="text-3xl text-purple-500" />,
      title: 'International Network',
      description: 'Connect with our extensive network of prestigious educational institutions and technology enterprises.'
    },
    {
      icon: <FaRocket className="text-3xl text-green-500" />,
      title: 'Technological Leadership',
      description: 'Leverage state-of-the-art blockchain education infrastructure and methodologies.'
    }
  ];

  const currentPartners = [
    {
      name: 'Institute of Technology',
      logo: '🎓',
      description: 'Premier institution for advanced technology education'
    },
    {
      name: 'Blockchain Research Institute',
      logo: '🔗',
      description: 'Leading blockchain research and development organization'
    },
    {
      name: 'Global Education Solutions',
      logo: '🌐',
      description: 'Distinguished provider of comprehensive educational solutions'
    }
  ];

  return (
    <div className="flex-grow relative">
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
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -top-48 -left-48"
        />
        <motion.div 
          animate={{
            x: [0, -100, 100, 0],
            y: [0, 100, -100, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl -bottom-48 -right-48"
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10" />
        </div>
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Strategic Partnership Opportunities
            </h1>
            <p className={`text-xl md:text-2xl ${theme.text.secondary} max-w-3xl mx-auto leading-relaxed mb-8`}>
              Collaborate with Mentora to advance blockchain education and drive transformative industry impact
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Establish Partnership
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className={`text-3xl md:text-4xl font-bold ${theme.text.primary} text-center mb-12`}>
          Partnership Advantages
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {partnerBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`${theme.card} p-8 rounded-2xl shadow-lg border ${theme.border}`}
            >
              <div className="flex items-center mb-4">
                {benefit.icon}
                <h3 className={`text-2xl font-bold ${theme.text.primary} ml-4`}>
                  {benefit.title}
                </h3>
              </div>
              <p className={`${theme.text.secondary} text-lg`}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current Partners */}
      <div className={`${theme.background.secondary} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold ${theme.text.primary} text-center mb-12`}>
            Distinguished Partners
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {currentPartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`${theme.card} p-8 rounded-2xl shadow-lg border ${theme.border} text-center`}
              >
                <div className="text-4xl mb-4">{partner.logo}</div>
                <h3 className={`text-xl font-bold ${theme.text.primary} mb-2`}>
                  {partner.name}
                </h3>
                <p className={`${theme.text.secondary}`}>
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${theme.card} p-12 rounded-3xl shadow-xl border ${theme.border} text-center`}
        >
          <h2 className={`text-4xl font-bold ${theme.text.primary} mb-6`}>
            Initiate Partnership Discussions
          </h2>
          <p className={`${theme.text.secondary} text-xl mb-8 max-w-2xl mx-auto`}>
            Join us in developing innovative blockchain education solutions that advance industry standards.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 group"
            >
              Schedule Consultation
              <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners;
