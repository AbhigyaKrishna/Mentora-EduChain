// src/pages/Privacy.jsx    
import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserShield, FaLock, FaCookie, FaDatabase, FaEnvelope } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Privacy = () => {
  const { darkMode } = useTheme();

  const sections = [
    {
      id: 'information',
      title: 'Information We Collect',
      icon: <FaDatabase className="text-blue-500 text-2xl" />,
      content: [
        'Personal information such as name, email address, and profile information when you register for an account.',
        'Wallet addresses and transaction data when connecting your blockchain wallet.',
        'Educational information including course progress, assignments, and certificates earned.',
        'Usage data such as how you interact with our platform, including pages visited and features used.',
        'Device information including your IP address, browser type, and operating system.'
      ]
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      icon: <FaUserShield className="text-green-500 text-2xl" />,
      content: [
        'To provide, maintain, and improve our educational platform and services.',
        'To process transactions and issue blockchain-verified certificates.',
        'To personalize your learning experience and recommend relevant courses.',
        'To communicate with you about your account, updates, and educational opportunities.',
        'To ensure the security and integrity of our platform and prevent fraud or abuse.'
      ]
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      icon: <FaLock className="text-purple-500 text-2xl" />,
      content: [
        'We do not sell your personal information to third parties.',
        'We may share information with service providers who help us operate our platform (payment processors, cloud services, etc.).',
        'Course completion and certification information is recorded on the blockchain as a public record, but in a way that protects your privacy.',
        'We may share information if required by law or to protect our legal rights.',
        'In the event of a merger, acquisition, or asset sale, your information may be transferred as a business asset.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: <FaCookie className="text-amber-500 text-2xl" />,
      content: [
        'We use cookies and similar technologies to enhance your experience on our platform.',
        'This includes remembering your preferences, maintaining your session, and analyzing how you use our services.',
        'We may use analytics services to help us understand platform usage patterns.',
        'You can manage cookie preferences through your browser settings, though this may limit some functionality.',
        'Our platform may include social media features that may set cookies or collect information about your visit.'
      ]
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: <FaShieldAlt className="text-red-500 text-2xl" />,
      content: [
        'We implement appropriate security measures to protect your personal information.',
        'All data is encrypted in transit and at rest using industry-standard protocols.',
        'We regularly review our security practices and update them as needed.',
        'While we strive to protect your information, no method of transmission over the internet is 100% secure.',
        'You are responsible for maintaining the confidentiality of your account credentials.'
      ]
    },
    {
      id: 'rights',
      title: 'Your Privacy Rights',
      icon: <FaUserShield className="text-indigo-500 text-2xl" />,
      content: [
        'You have the right to access, correct, or delete the personal information we have about you.',
        'You can update your account information through your profile settings.',
        'You may opt-out of marketing communications while still receiving essential account notices.',
        'Depending on your location, you may have additional rights under applicable privacy laws.',
        'To exercise your privacy rights, contact us at privacy@mentora.com.'
      ]
    }
  ];

  const lastUpdated = 'June 15, 2023';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen relative ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} pb-20`}
    >
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
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 ${
            darkMode ? 'bg-blue-500' : 'bg-blue-200'
          }`}
          style={{
            top: '10%',
            left: '10%'
          }}
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
          className={`absolute w-96 h-96 rounded-full blur-3xl opacity-20 ${
            darkMode ? 'bg-purple-500' : 'bg-purple-200'
          }`}
          style={{
            bottom: '10%',
            right: '10%'
          }}
        />
      </div>

      {/* Header Section */}
      <div className={`w-full py-16 ${darkMode ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <div className={`p-4 rounded-full ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'} mb-6`}>
              <FaShieldAlt className={`text-4xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className={`text-lg max-w-3xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              At Mentora, we're committed to protecting your privacy and ensuring you have control over your personal data.
            </p>
            <div className={`mt-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Last updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Introduction */}
        <div className={`mb-12 p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            This Privacy Policy explains how Mentora ("we", "us", or "our") collects, uses, shares, and protects your 
            personal information when you use our educational platform, website, and services (collectively, the "Services").
          </p>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            By using our Services, you agree to the collection and use of information in accordance with this policy. 
            We value your trust and are committed to handling your personal information with care and in compliance with applicable privacy laws.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-center gap-4 mb-4">
                {section.icon}
                <h2 className="text-2xl font-semibold" id={section.id}>{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} flex-shrink-0`}></span>
                    <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`mt-12 p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className={`p-4 rounded-full ${darkMode ? 'bg-blue-900/20' : 'bg-blue-100'}`}>
              <FaEnvelope className={`text-3xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Questions About Our Privacy Policy?</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                If you have any questions or concerns about our privacy practices, please contact our privacy team.
              </p>
              <a 
                href="mailto:privacy@mentora.com" 
                className={`inline-flex items-center gap-2 font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
              >
                privacy@mentora.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Privacy;