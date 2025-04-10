import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers, FaMoneyBillWave, FaChartLine, FaHandshake, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const AffiliateProgram = () => {
  const { theme } = useTheme();

  const benefits = [
    {
      icon: <FaMoneyBillWave className="text-3xl text-purple-500" />,
      title: 'Competitive Commission',
      description: 'Earn up to 30% commission on every successful referral that joins our platform.'
    },
    {
      icon: <FaUsers className="text-3xl text-blue-500" />,
      title: 'Lifetime Referrals',
      description: 'Benefit from lifetime tracking of your referrals and earn recurring commissions.'
    },
    {
      icon: <FaChartLine className="text-3xl text-green-500" />,
      title: 'Real-time Analytics',
      description: 'Access detailed performance metrics and tracking through our affiliate dashboard.'
    },
    {
      icon: <FaHandshake className="text-3xl text-indigo-500" />,
      title: 'Dedicated Support',
      description: 'Get personalized support and resources to maximize your success as an affiliate.'
    }
  ];

  return (
    <div className="flex-grow">
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
              Join Our Affiliate Program
            </h1>
            <p className={`text-xl ${theme.text.secondary} max-w-3xl mx-auto mb-8`}>
              Partner with us to promote blockchain education and earn competitive commissions while helping others succeed in Web3.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
              >
                Become an Affiliate
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className={`${theme.background.secondary} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold ${theme.text.primary} text-center mb-12`}>
            Affiliate Benefits
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
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
      </div>

      {/* How It Works Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold ${theme.text.primary} text-center mb-12`}>
            Program Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`${theme.card} p-8 rounded-3xl shadow-xl border ${theme.border}`}
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-6">
                1
              </div>
              <h3 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>
                Partner Registration
              </h3>
              <p className={`${theme.text.secondary} text-base leading-relaxed`}>
                Submit your application and complete our verification process to join our network of trusted partners. Our team will review your credentials and provide a response within 48 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`${theme.card} p-8 rounded-3xl shadow-xl border ${theme.border}`}
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-6">
                2
              </div>
              <h3 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>
                Access Marketing Resources
              </h3>
              <p className={`${theme.text.secondary} text-base leading-relaxed`}>
                Receive your personalized referral link and comprehensive marketing materials, including branded content, analytics tools, and performance tracking dashboards to optimize your campaigns.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`${theme.card} p-8 rounded-3xl shadow-xl border ${theme.border}`}
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
                3
              </div>
              <h3 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>
                Generate Revenue
              </h3>
              <p className={`${theme.text.secondary} text-base leading-relaxed`}>
                Earn competitive commissions through our tiered reward structure for each qualified referral. Benefit from transparent reporting, monthly payouts, and performance-based incentives.
              </p>
            </motion.div>
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
            Ready to Get Started?
          </h2>
          <p className={`${theme.text.secondary} text-xl mb-8 max-w-2xl mx-auto`}>
            Join our affiliate program today and start earning while promoting blockchain education excellence.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 group"
            >
              Apply Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AffiliateProgram;

