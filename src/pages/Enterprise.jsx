import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBuilding, FaChartLine, FaUsers, FaShieldAlt, FaCogs, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Enterprise = () => {
  const { theme } = useTheme();

  useEffect(() => {
    console.log('Enterprise component mounted');
    console.log('Theme:', theme);
  }, [theme]);

  const features = [
    {
      icon: <FaUsers className="text-3xl text-blue-500" />,
      title: 'Team Management',
      description: 'Easily manage and track your teams learning progress with advanced administrative controls and detailed analytics.'
    },
    {
      icon: <FaGraduationCap className="text-3xl text-purple-500" />, 
      title: 'Custom Learning Paths',
      description: 'Create tailored learning experiences with customized course content and learning paths specific to your organization.'
    },
    {
      icon: <FaShieldAlt className="text-3xl text-green-500" />,
      title: 'Enterprise Security',
      description: 'Advanced security features including SSO integration, role-based access control, and data encryption.'
    },
    {
      icon: <FaCogs className="text-3xl text-amber-500" />,
      title: 'API Integration',
      description: 'Seamlessly integrate our platform with your existing systems through our robust API.'
    }
  ];

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
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
        
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Enterprise Solutions
            </h1>
            <p className={`text-xl md:text-2xl ${theme.text.secondary} max-w-3xl mx-auto leading-relaxed mb-8`}>
              Empower your organization with our enterprise-grade blockchain education platform
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Schedule a Demo
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`${theme.card} p-8 rounded-2xl shadow-lg border ${theme.border}`}
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className={`text-2xl font-bold ${theme.text.primary} ml-4`}>
                  {feature.title}
                </h3>
              </div>
              <p className={`${theme.text.secondary} text-lg`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
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
            Ready to Transform Your Organization?
          </h2>
          <p className={`${theme.text.secondary} text-xl mb-8 max-w-2xl mx-auto`}>
            Join leading companies who trust our platform for their blockchain education needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
              >
                Contact Sales
                <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/pricing"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
              >
                View Pricing
                <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Enterprise;
