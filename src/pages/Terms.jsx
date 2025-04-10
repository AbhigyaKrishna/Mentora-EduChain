import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Terms = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text.primary}`}>
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
            <h1 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-6`}>
              Terms of Service
            </h1>
            <p className={`text-xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              Please read these terms carefully before using our platform
            </p>
          </motion.div>
        </div>
      </div>

      {/* Terms Content */}
      <div className={`${theme.background.secondary} py-16 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${theme.card} p-8 rounded-2xl shadow-lg border ${theme.border} backdrop-blur-sm bg-white/5`}>
            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>1. Agreement to Terms</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                By accessing or using our platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>2. User Accounts</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
              </p>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>3. Intellectual Property</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                The Service and its original content, features, and functionality are and will remain the exclusive property of our platform and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>4. Course Content and Licensing</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                Users may access course content for personal, non-commercial use only. Redistribution, reproduction, or commercial use of any content without explicit permission is strictly prohibited.
              </p>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>5. Payment Terms</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                All purchases are final and non-refundable unless otherwise specified. We reserve the right to modify pricing for our services at any time. Users will be notified of any price changes in advance.
              </p>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>6. User Conduct</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                Users agree to use the platform in a manner consistent with all applicable laws and regulations. Any misuse, harassment, or inappropriate behavior may result in immediate account termination.
              </p>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>7. Limitation of Liability</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                Our platform shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>8. Changes to Terms</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                We reserve the right to modify or replace these Terms at any time. Users will be notified of any material changes to these terms.
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

      {/* Add keyframes for blob animation in your CSS */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Terms;