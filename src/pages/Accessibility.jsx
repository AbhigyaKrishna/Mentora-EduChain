import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Accessibility = () => {
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
              Accessibility Statement
            </h1>
            <p className={`text-xl ${theme.text.secondary} max-w-3xl mx-auto`}>
              Our commitment to making education accessible to everyone
            </p>
          </motion.div>
        </div>
      </div>

      {/* Accessibility Content */}
      <div className={`${theme.background.secondary} py-16 relative`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`${theme.card} p-8 rounded-2xl shadow-lg border ${theme.border} backdrop-blur-sm bg-white/5`}
          >
            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>Our Commitment</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                We are committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.
              </p>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>Standards We Follow</h2>
              <div className={`${theme.text.secondary}`}>
                <ul className="list-disc pl-6 space-y-3">
                  <li>WCAG 2.1 Level AA compliance</li>
                  <li>Section 508 of the Rehabilitation Act</li>
                  <li>WAI-ARIA guidelines for dynamic content</li>
                  <li>Keyboard navigation support</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>Accessibility Features</h2>
              <div className={`${theme.text.secondary}`}>
                <h3 className="font-semibold mt-4">Navigation</h3>
                <p className="mb-4">All pages can be navigated using keyboard shortcuts and screen readers.</p>
                
                <h3 className="font-semibold mt-4">Color and Contrast</h3>
                <p className="mb-4">We maintain appropriate color contrast ratios for better readability.</p>
                
                <h3 className="font-semibold mt-4">Text Alternatives</h3>
                <p className="mb-4">All images include descriptive alt text for screen readers.</p>
                
                <h3 className="font-semibold mt-4">Responsive Design</h3>
                <p className="mb-4">Our platform adapts to different screen sizes and zoom levels.</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>Assistive Technologies</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                Our platform is compatible with common assistive technologies including:
              </p>
              <ul className={`${theme.text.secondary} list-disc pl-6 space-y-2`}>
                <li>Screen readers (NVDA, JAWS, VoiceOver)</li>
                <li>Speech recognition software</li>
                <li>Screen magnification tools</li>
                <li>Alternative input devices</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>Contact Us</h2>
              <p className={`${theme.text.secondary} mb-4`}>
                If you encounter any accessibility barriers or have suggestions for improvement, please contact our accessibility team at accessibility@example.com.
              </p>
            </section>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Accessibility;
