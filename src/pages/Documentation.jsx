import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Documentation = () => {
  const { theme } = useTheme();

  const sections = [
    {
      title: 'Getting Started',
      content: [
        {
          heading: 'Account Creation',
          text: 'To get started with our platform, create an account using OpenCampus authentication. Click the "Connect" button in the top navigation bar and follow the prompts.'
        },
        {
          heading: 'Wallet Connection',
          text: 'After creating an account, connect your Web3 wallet to access blockchain features. We support MetaMask and other popular wallet providers.'
        }
      ]
    },
    {
      title: 'Platform Features',
      content: [
        {
          heading: 'Courses',
          text: 'Browse our course catalog to find Web3 learning content. Each course includes video lectures, assignments, and hands-on projects.'
        },
        {
          heading: 'Project Rooms',
          text: 'Join collaborative project rooms to work with other learners on real blockchain projects. Create or join existing rooms based on your interests.'
        },
        {
          heading: 'Rewards System',
          text: 'Earn tokens by completing courses, contributing to projects, and participating in the community. Tokens can be used for certificates and special features.'
        }
      ]
    },
    {
      title: 'Technical Documentation',
      content: [
        {
          heading: 'Smart Contracts',
          text: 'Our platform uses smart contracts for course certificates, rewards distribution, and project collaboration. All contracts are audited and deployed on multiple networks.'
        },
        {
          heading: 'API Integration',
          text: 'Developers can integrate with our platform using our REST API. Documentation for API endpoints is available in our GitHub repository.'
        }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text.primary} py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className={`text-lg ${theme.text.secondary} max-w-2xl mx-auto`}>
            Learn how to use our platform and explore its features
          </p>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme.card} rounded-xl p-6 shadow-lg backdrop-blur-sm bg-opacity-95`}
            >
              <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
              <div className="space-y-6">
                {section.content.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-xl font-medium mb-2">{item.heading}</h3>
                    <p className={`${theme.text.secondary}`}>{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className={`${theme.text.secondary} max-w-2xl mx-auto mb-6`}>
            Need more help? Contact our support team or visit our GitHub repository.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Documentation;
