import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBookOpen ,FaCalendarAlt,FaCertificate, FaClock, FaRobot, FaArrowRight, FaPlay, FaChalkboardTeacher, FaUserGraduate, FaAward, FaCheck, FaTasks, FaRocket, FaBrain, FaUsers, FaGlobe, FaShieldAlt, FaStar, FaDoorOpen, FaPlus, FaGift, FaWallet, FaBook, FaBookReader } from 'react-icons/fa';
import Aurora from './Aurora';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import LoginButton from '../components/LoginButton';

import SpotlightCard from './SpotlightCard';

const Home = () => {
  const { isInitialized, authState } = useOCAuth();
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const featuredCourses = [
    {
      title: "Blockchain Fundamentals",
      image: "./block.png",
      students: "500+",
      rating: 4.8,
      duration: "8 weeks"
    },
    {
      title: "Web Development with React Js",
      image: "./react.png",
      // image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1000",
      students: "300+",
      rating: 4.9,
      duration: "10 weeks"
    },
    {
      title: "DeFi Masterclass",
      image: "./defi.png",
      students: "400+",
      rating: 4.7,
      duration: "12 weeks"
    }
  ];

  const heroFeatures = [
    { icon: <FaRocket />, text: "Learn at your pace" },
    { icon: <FaBrain />, text: "AI-powered mentoring" },
    { icon: <FaShieldAlt />, text: "Verified certificates" }
  ];

  const platformStats = [
    {
      number: "1000+",
      label: "Active Students",
      icon: <FaUserGraduate />,
      growth: "+25% this month",
      color: "from-blue-500 to-blue-600"
    },
    {
      number: "50+",
      label: "Expert Courses",
      icon: <FaChalkboardTeacher />,
      growth: "4.9/5 avg rating",
      color: "from-purple-500 to-purple-600"
    },
    {
      number: "500+",
      label: "NFT Certificates",
      icon: <FaAward />,
      growth: "100% verified",
      color: "from-emerald-500 to-emerald-600"
    }
  ];

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (authState.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg max-w-md w-full">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Authentication Error</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {authState.error.message}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#000000]' : 'bg-gradient-to-b from-blue-50 via-white to-blue-50'}`}>
      <Aurora
        colorStops={darkMode ? ["#3A29FF", "#FF94B4", "#FF3232"] : ["#60A5FA", "#7C3AED", "#2563EB"]}
        blend={darkMode ? 0.5 : 0.3}
        amplitude={5.0}
        speed={0.5}
      />

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-2">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10 dark:from-transparent dark:via-black/20 dark:to-black/40"></div>
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeIn}
          className="max-w-7xl mx-auto relative grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Enhanced Content */}
          <div className="text-left space-y-8">
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
            >
              <FaStar className="text-yellow-500 mr-2" />
              <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Trusted by 1000+ students worldwide
              </span>
            </motion.div>

            <motion.h1
              className={`text-6xl lg:text-7xl font-bold leading-tight ${darkMode
                ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400'
                : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600'
                } animate-gradient`}
            >
              Master Web3 <br />
              Development <br />
              <span className="text-4xl lg:text-5xl opacity-90">with Mentora</span>
            </motion.h1>

            <motion.p
              className={`text-xl lg:text-2xl max-w-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
              variants={fadeIn}
            >
              Join the next generation of blockchain developers. Learn, build, and earn
              verifiable credentials on your journey to Web3 mastery.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap gap-4"
            >
              {heroFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${darkMode
                    ? 'bg-gray-800/50 text-gray-300'
                    : 'bg-white/50 text-gray-700'
                    } backdrop-blur-sm border border-gray-200/20`}
                >
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeIn}
            >
              {!authState.isAuthenticated && <LoginButton />}
              <Link
                to="/courses"
                className={`group relative px-8 py-4 rounded-xl overflow-hidden ${darkMode
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  } text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <span className="flex items-center justify-center">
                  <FaPlay className="mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                  Start Learning
                </span>
              </Link>
            </motion.div>

            {/* Enhanced Stats Grid */}
            <motion.div
              className="grid grid-cols-3 gap-6"
              variants={fadeIn}
            >
              {platformStats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`relative overflow-hidden rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'
                    } backdrop-blur-sm p-6 group`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className={`text-3xl mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      {stat.number}
                    </div>
                    <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                    <div className="text-xs text-green-500 mt-2">
                      {stat.growth}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Enhanced Visual */}
          <motion.div
            className="relative"
            variants={fadeIn}
          >
            <div className="relative z-10">
              <img
                src="https://i.ibb.co/tPc53Kjq/dashboard.png"
                alt="Blockchain Education Platform"
                className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
              />

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-xl backdrop-blur-xl p-4 flex items-center justify-center"
              >
                <FaBrain className="text-3xl text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl backdrop-blur-xl p-4 flex items-center justify-center"
              >
                <FaRocket className="text-3xl text-white" />
              </motion.div>
            </div>

            {/* Background Effects */}
            <div className="absolute -z-10 top-1/2 -right-8 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-1/2 -left-8 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'
              }`}
          >
            Featured Courses
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className={`${darkMode ? 'border border-gray-800 bg-gray-800' : 'bg-white'
                  } rounded-2xl overflow-hidden shadow-xl group`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-1000/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl text-white font-bold mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      <FaUserGraduate className="inline mr-2" />
                      {course.students} students
                    </span>
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      <FaClock className="inline mr-2" />
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-white">{course.rating}</span>
                    </div>
                    <Link
                      to="/courses"
                      className={`${darkMode
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-500 hover:bg-blue-600'
                        } text-white px-4 py-2 rounded-lg text-sm`}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Process Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'
              }`}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaWallet />,
                title: "Connect Wallet",
                description: "Connect your OCID wallet to get started",
                metric: "1000+ Wallets Connected",
                color: "from-[#3A29FF] to-[#6C63FF]"
              },
              {
                icon: <FaChalkboardTeacher />,
                title: "Choose Course",
                description: "Browse and enroll in your preferred course",
                metric: "50+ Courses",
                color: "from-[#FF94B4] to-[#FF3232]"
              },
              {
                icon: <FaGraduationCap />,
                title: "Learn",
                description: "Access course content and complete assignments", 
                metric: "98% Completion",
                color: "from-[#60A5FA] to-[#7C3AED]"
              },
              {
                icon: <FaGift />,
                title: "Get Rewards",
                description: "Earn tokens and NFT rewards for completing courses",
                metric: "10,000+ Rewards Given",
                color: "from-[#4CAF50] to-[#2E7D32]"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className={`${darkMode ? 'bg-[#1a1a2e]/40' : 'bg-white/40'
                  } rounded-3xl p-8 shadow-2xl relative overflow-hidden group backdrop-blur-md border border-gray-800/30`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300/10 to-gray-600/10 group-hover:opacity-20 opacity-0.1 transition-opacity duration-300 backdrop-blur-sm" />

                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-3xl mb-6 shadow-lg`}>
                    {step.icon}
                  </div>

                  <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>

                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                    {step.description}
                  </p>

                  <div className={`text-lg font-semibold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                    {step.metric}
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Replace the commented-out Action Buttons Section with this new section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SpotlightCard className="h-full" spotlightColor="rgba(56, 189, 248, 0.2)">
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                <div className={`w-20 h-20 rounded-2xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                  } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <FaChalkboardTeacher className={`text-3xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>

                <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent`}>
                  Create Course
                </h3>

                <p className={`text-center mb-8 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Share your expertise with the world. Create engaging courses and help others learn blockchain development.
                </p>

                <div className="space-y-4 text-left w-full mb-8">
                  {[
                    "Interactive course builder",
                    "Support for multiple content types",
                    "Earn from your courses",
                    "Build your teaching profile"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <FaCheck className="text-xs text-white" />
                      </div>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/create-course"
                  className="group relative px-8 py-4 rounded-xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-full text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <span className="flex items-center justify-center">
                    Start Creating
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </div>
            </SpotlightCard>

            <SpotlightCard className="h-full" spotlightColor="rgba(168, 85, 247, 0.2)">
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                <div className={`w-20 h-20 rounded-2xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
                  } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <FaTasks className={`text-3xl ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>

                <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
                  My Assignments
                </h3>

                <p className={`text-center mb-8 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Track your learning progress and manage your course assignments in one place.
                </p>

                <div className="space-y-4 text-left w-full mb-8">
                  {[
                    "View all course assignments",
                    "Track completion status",
                    "Get AI-powered assistance",
                    "Submit and review work"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <FaCheck className="text-xs text-white" />
                      </div>
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/assignments"
                  className="group relative px-8 py-4 rounded-xl overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 w-full text-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <span className="flex items-center justify-center">
                    View Assignments
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

    {/* Collaborative Study Room Section */}
<section className="py-24 px-4 relative overflow-hidden">
  {/* Background elements */}
  <div className="absolute inset-0 -z-10">
    <div className={`absolute top-20 left-10 w-64 h-64 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-blue-200'} opacity-10 blur-3xl`}></div>
    <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full ${darkMode ? 'bg-purple-600' : 'bg-purple-200'} opacity-10 blur-3xl`}></div>
  </div>

  <div className="max-w-6xl mx-auto">
    {/* Section header with improved animation */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Collaborative Study Rooms
      </h2>
      <p className={`text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Connect with peers, share resources, and excel together in our interactive study spaces
      </p>
    </motion.div>

    {/* Main content with staggered animations */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left side content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/90'} shadow-xl backdrop-blur-sm`}>
          <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Why Join a Study Room?
          </h3>
          <div className="space-y-4">
            {/* Feature cards instead of bullet points */}
            <div className={`flex items-start p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} transition-all duration-300 hover:transform hover:scale-102 hover:shadow-md`}>
              <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                <FaUsers size={20} />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Real-time collaboration</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Work together with peers on shared documents and projects</p>
              </div>
            </div>
            
            <div className={`flex items-start p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} transition-all duration-300 hover:transform hover:scale-102 hover:shadow-md`}>
              <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-600'}`}>
                <FaBookOpen size={20} />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Shared resources</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Access to study materials, notes, and specialized tools</p>
              </div>
            </div>
            
            <div className={`flex items-start p-3 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} transition-all duration-300 hover:transform hover:scale-102 hover:shadow-md`}>
              <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-600'}`}>
                <FaCalendarAlt size={20} />
              </div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Scheduled sessions</p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Plan regular study meetups with reminders and agendas</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action buttons with improved design */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/rooms"
            className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl ${darkMode 
              ? 'bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
              : 'bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
              } text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group`}
          >
            <FaDoorOpen className="mr-3 group-hover:animate-pulse" />
            Browse Rooms
          </Link>
          <Link
            to="/rooms"
            className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl ${darkMode
              ? 'bg-gradient-to-br from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800'
              : 'bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
              } text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 group`}
          >
            <FaPlus className="mr-3 group-hover:rotate-90 transition-transform duration-300" />
            Create Room
          </Link>
        </div>
      </motion.div>
      
      {/* Right side image and interactive preview */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="relative"
      >
        {/* Main image with overlay card */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
          <img
            src="./room.png"
            alt="Collaborative Study Room"
            className="w-full h-auto rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Room stats overlay */}
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900/70' : 'bg-gray-800/60'} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
            <div className="text-white text-center px-6 py-8 rounded-xl backdrop-blur-sm">
              <h4 className="text-2xl font-bold mb-4">Active Study Rooms</h4>
              <div className="flex justify-around mb-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-300">24</p>
                  <p className="text-sm text-gray-300">Public Rooms</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-300">142</p>
                  <p className="text-sm text-gray-300">Students Online</p>
                </div>
              </div>
              <button className="mt-2 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors duration-300 backdrop-blur-sm">
                Preview Rooms
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating elements for visual interest */}
        <div className={`absolute -top-6 -right-6 p-4 rounded-lg ${darkMode ? 'bg-indigo-900/90' : 'bg-indigo-100'} shadow-lg backdrop-blur-sm z-10`}>
          <div className="flex items-center">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">JD</div>
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">TK</div>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">AM</div>
            </div>
            <p className={`ml-2 text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>+3 joined</p>
          </div>
        </div>
      </motion.div>
    </div>
    
    {/* Recent rooms preview */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/90'} shadow-xl backdrop-blur-sm`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Popular Study Rooms
          </h3>
          <Link 
            to="/rooms"
            className={`text-sm font-medium ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} flex items-center`}
          >
            View all <FaArrowRight className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Room cards */}
          {[
            { name: "React Project", members: 8, subject: "React" },
            { name: "Blockchain Development", members: 12, subject: "Blockchain" },
            { name: "Defi Development", members: 5, subject: "Defi" }
          ].map((room, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/70 hover:bg-gray-700/90' : 'bg-gray-50 hover:bg-gray-100'} transition-all duration-300 hover:shadow-md cursor-pointer`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{room.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                  {room.subject}
                </span>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex -space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-6 h-6 rounded-full ${['bg-red-500', 'bg-yellow-500', 'bg-green-500'][i]} flex items-center justify-center text-white text-xs font-bold border border-white`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <p className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  +{room.members - 3} students
                </p>
                <div className="ml-auto">
                  <button className={`text-sm px-3 py-1 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}>
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
</section>
      
      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'
              }`}
          >
            Why Choose Mentora?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaGraduationCap className="text-4xl" />,
                title: "Learn from Experts",
                description: "Get mentored by industry professionals with years of blockchain experience.",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <FaGift className="text-4xl" />,
                title: "Earn Rewards",
                description: "Showcase your achievements with blockchain-verified credentials.",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: <FaRobot className="text-4xl" />,
                title: "AI-Powered Learning",
                description: "Get personalized support and adaptive learning paths.",
                color: "from-green-500 to-green-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'
                  } rounded-2xl p-8 shadow-xl relative overflow-hidden group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl text-white font-bold mb-4">{feature.title}</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'
              }`}
          >
            Student Success Stories
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Aditya Raghav Soni",
                role: "Blockchain Developer",
                image: "https://media.licdn.com/dms/image/v2/D4E03AQEGTLIO444fYg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1707753405111?e=1749081600&v=beta&t=J94xloQ2I7E7lj2yLT9mFwPaOKHmmTGfiE2a_j2ZRmU",
                quote: "Mentora helped me transition into blockchain development. The NFT certificate gave me credibility in the industry."
              },
              {
                name: "Shrijan Katiyar",
                role: "DeFi Specialist",
                image: "https://media.licdn.com/dms/image/v2/D5603AQHNr_Jvn845zQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1729534131870?e=1749081600&v=beta&t=zWyUIhxXJuHfujMAbkw-hplcrwr1ZzdGStsL4U9RqEA",
                quote: "The practical assignments and AI support made learning complex DeFi concepts much easier."
              },
              {
                name: "Gourav Kumar",
                role: "Smart Contract Engineer",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQFt4TLse1NKuA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1698423130549?e=1749081600&v=beta&t=Uw5ZWrDgq7aTfolCLijkNe1yrA8pS64DC9nC-UjyNEw",
                quote: "From beginner to professional smart contract developer - Mentora made it possible."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'
                  } rounded-2xl p-6 shadow-xl`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-white">{testimonial.name}</h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} italic`}>
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            Ready to Start Your Journey?
          </h2>
          <p className={`text-xl mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of students already learning on Mentora and transform your career.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <Link
              to="/courses"
              className={`${darkMode
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                } text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center group`}
            >
              Explore Courses
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

          </div>
        </motion.div>
      </section>



    </div>
  );
};

export default Home;
