import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CookiePolicy = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen relative ${theme.background} ${theme.text.primary}`}
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
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10" />
        </div>
        
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-2 leading-normal" style={{
              background: 'linear-gradient(to right, #2563eb, #9333ea, #4f46e5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Cookie Policy
            </h1>
            <p className={`text-xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              How we use cookies to improve your experience
            </p>
          </motion.div>
        </div>
      </div>

      {/* Cookie Policy Content */}
      <div className={`${theme.background.secondary} py-16 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${theme.card} p-8 rounded-2xl shadow-lg border ${theme.border} backdrop-blur-sm bg-white/5`}>
            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>What Are Cookies?</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing site usage, and assisting with our marketing efforts.
              </p>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>Types of Cookies We Use</h2>
              <div className={`${theme.text.secondary}`}>
                <h3 className="font-semibold mt-4">Essential Cookies</h3>
                <p className="mb-4">Required for the website to function properly. These cannot be disabled.</p>
                
                <h3 className="font-semibold mt-4">Analytical Cookies</h3>
                <p className="mb-4">Help us understand how visitors interact with our website through anonymous data collection.</p>
                
                <h3 className="font-semibold mt-4">Functional Cookies</h3>
                <p className="mb-4">Remember your preferences to enhance your experience on our site.</p>
                
                <h3 className="font-semibold mt-4">Marketing Cookies</h3>
                <p className="mb-4">Track your activity across websites to deliver personalized advertisements.</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>Managing Cookies</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit a site.
              </p>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>Third-Party Cookies</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                Some of our pages display content from external providers, such as YouTube, Facebook, and Twitter. To view this content, you first have to accept their specific terms and conditions. This includes their cookie policies, which we have no control over.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>Updates to This Policy</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>
          </div>

          <div className="text-center mt-8">
            <p className={`${theme.text.secondary} text-sm`}>
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CookiePolicy;
