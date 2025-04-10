import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaHeadset, FaBook, FaComments, FaEnvelope, FaQuestionCircle, FaSearch, FaArrowRight, FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

const Support = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const supportCategories = [
    {
      icon: <FaBook />,
      title: 'Documentation',
      description: 'Browse our comprehensive guides and documentation for detailed technical information',
      link: '/docs'
    },
    {
      icon: <FaComments />,
      title: 'Community Forum',
      description: 'Connect with other users, share experiences and get help from the community',
      link: '/community'
    },
    {
      icon: <FaQuestionCircle />,
      title: 'FAQ',
      description: 'Find quick answers to commonly asked questions about our platform',
      link: '/faq'
    },
    {
      icon: <FaDiscord />,
      title: 'Discord Channel',
      description: 'Join our Discord community for real-time support and discussions',
      link: 'https://discord.gg/mentora'
    },
    {
      icon: <FaGithub />,
      title: 'GitHub Issues',
      description: 'Report technical issues or contribute to our open source projects',
      link: 'https://github.com/mentora'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email Support',
      description: 'Contact our dedicated support team for personalized assistance',
      link: 'mailto:support@mentora.edu'
    }
  ];

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text.primary}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${theme.primary} bg-opacity-10`}>
                <FaHeadset className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">How Can We Help You?</h1>
            <p className={`text-lg ${theme.text.secondary} max-w-2xl mx-auto mb-8`}>
              Get the support you need to make the most of your learning experience. Our team is here to help 24/7.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Support Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {supportCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme.card} rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group`}
            >
              <div className={`p-3 rounded-full ${theme.primary} bg-opacity-10 w-fit mb-4 group-hover:bg-opacity-20 transition-all`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className={`${theme.text.secondary} mb-4`}>{category.description}</p>
              <a 
                href={category.link} 
                className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
                target={category.link.startsWith('http') ? '_blank' : '_self'}
                rel={category.link.startsWith('http') ? 'noopener noreferrer' : ''}
              >
                Learn more <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
