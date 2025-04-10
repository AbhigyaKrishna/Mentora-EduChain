import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight, FaCrown, FaRocket, FaBuilding } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const { theme } = useTheme();

  const plans = [
    {
      name: 'Free',
      icon: <FaRocket className="text-3xl text-blue-500 mb-4" />,
      price: '0',
      description: 'Perfect for getting started and exploring the platform',
      features: [
        'Access to 50+ free courses',
        'Basic project collaboration rooms',
        'Community forum participation',
        'Standard email support',
        'Basic course certificates',
        'Limited resource downloads'
      ],
      cta: 'Start Learning',
      popular: false,
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Professional',
      icon: <FaCrown className="text-3xl text-amber-500 mb-4" />,
      price: '49',
      description: 'Advanced features for dedicated learners and professionals',
      features: [
        'Unlimited access to 500+ courses',
        'Advanced project rooms with AI tools',
        'Priority community support',
        '24/7 live chat assistance',
        'Blockchain-verified certificates',
        'Unlimited resource access',
        'Career guidance sessions',
        'Industry expert mentorship'
      ],
      cta: 'Upgrade Now',
      popular: true,
      color: 'from-amber-400 to-amber-600'
    },
    {
      name: 'Enterprise',
      icon: <FaBuilding className="text-3xl text-purple-500 mb-4" />,
      price: 'Custom',
      description: 'Tailored solutions for organizations and large teams',
      features: [
        'Custom learning paths & courses',
        'Advanced analytics dashboard',
        'Dedicated success manager',
        'API access & integrations',
        'SSO & advanced security',
        'Custom branding options',
        'Bulk licensing discounts',
        'Enterprise-grade support'
      ],
      cta: 'Contact Sales',
      popular: false,
      color: 'from-purple-400 to-purple-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <div className={`min-h-screen ${theme.background}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Animated background elements from contact page */}
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
      <div className="relative">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Investment in Your Future
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-xl md:text-2xl ${theme.text.secondary} max-w-3xl mx-auto leading-relaxed`}
            >
              Choose the perfect plan to accelerate your learning journey and unlock your full potential with our comprehensive blockchain-powered education platform.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover="hover"
              className={`relative ${theme.card} rounded-2xl shadow-xl p-8 border ${theme.border} backdrop-blur-sm overflow-visible ${
                plan.popular ? 'ring-2 ring-amber-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 right-0 left-0 flex justify-center">
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-1.5 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-8 text-center">
                {plan.icon}
                <h3 className={`text-2xl font-bold ${theme.text.primary} mb-4`}>{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  {plan.price !== 'Custom' && <span className={`text-2xl ${theme.text.primary}`}>$</span>}
                  <span className={`text-5xl font-extrabold ${theme.text.primary}`}>
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className={`ml-2 text-xl ${theme.text.secondary}`}>/mo</span>
                  )}
                </div>
                <p className={`mt-4 text-sm ${theme.text.secondary}`}>{plan.description}</p>
              </div>

              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.background === 'bg-white' ? 'from-transparent via-gray-100/5 to-gray-100/10' : 'from-transparent via-gray-800/5 to-gray-800/10'}`} />
                <ul className="space-y-4 mb-8 relative">
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center"
                    >
                      <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                      <span className={`text-sm ${theme.text.secondary}`}>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <Link
                to={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                className={`w-full flex items-center justify-center px-6 py-4 rounded-xl text-white font-medium transition-all ${plan.color} hover:shadow-lg hover:scale-[1.02] transform active:scale-[0.98] group`}
              >
                {plan.cta}
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <div className={`${theme.background} py-24 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/5 to-gray-100/10 dark:via-gray-800/5 dark:to-gray-800/10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl font-bold text-center mb-12 ${theme.text.primary}`}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                q: "Can I switch plans at any time?",
                a: "Yes, you can seamlessly upgrade or downgrade your plan. Changes will be reflected in your next billing cycle, with prorated adjustments for upgrades."
              },
              {
                q: "What payment methods do you accept?",
                a: "We support multiple payment options including credit/debit cards, PayPal, and various cryptocurrencies through our secure payment infrastructure."
              },
              {
                q: "Is there a satisfaction guarantee?",
                a: "Absolutely! We offer a 30-day money-back guarantee. If you're not completely satisfied with your subscription, we'll provide a full refund, no questions asked."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={cardVariants}
                className={`${theme.card} rounded-xl p-8 border ${theme.border} hover:shadow-lg transition-shadow`}
              >
                <h3 className={`text-xl font-semibold mb-3 ${theme.text.primary}`}>{item.q}</h3>
                <p className={`${theme.text.secondary} leading-relaxed`}>{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
