// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, FaTwitter, FaGithub, FaLinkedin, FaDiscord, 
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheck, FaStar, 
  FaUserGraduate, FaBuilding, FaChalkboardTeacher, FaShieldAlt, FaCoins,
  FaHandshake, FaArrowRight, FaFileAlt, FaQuestionCircle, FaHeadset, FaUsers
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about', icon: <FaBuilding className="w-4 h-4" /> },
        { label: 'Courses', path: '/courses', icon: <FaChalkboardTeacher className="w-4 h-4" /> },
        { label: 'Instructors', path: '/instructors', icon: <FaUserGraduate className="w-4 h-4" /> },
        { label: 'Contact', path: '/contact', icon: <FaEnvelope className="w-4 h-4" /> },
        { label: 'Careers', path: '/careers', icon: <FaCheck className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', path: '/docs', icon: <FaFileAlt className="w-4 h-4" /> },
        { label: 'Blog', path: '/blog', icon: <FaCheck className="w-4 h-4" /> },
        { label: 'FAQ', path: '/faq', icon: <FaQuestionCircle className="w-4 h-4" /> },
        { label: 'Support', path: '/support', icon: <FaHeadset className="w-4 h-4" /> },
        { label: 'Community', path: '/community', icon: <FaUsers className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Business',
      links: [
        { label: 'Pricing', path: '/pricing', icon: <FaCoins className="w-4 h-4" /> },
        { label: 'Enterprise', path: '/enterprise', icon: <FaBuilding className="w-4 h-4" /> },
        { label: 'Partners', path: '/partners', icon: <FaHandshake className="w-4 h-4" /> },
        { label: 'Affiliate Program', path: '/affiliates', icon: <FaCheck className="w-4 h-4" /> },
        { label: 'Become an Instructor', path: '/teach', icon: <FaChalkboardTeacher className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy', icon: <FaShieldAlt className="w-4 h-4" /> },
        { label: 'Terms of Service', path: '/terms', icon: <FaCheck className="w-4 h-4" /> },
        { label: 'Cookie Policy', path: '/cookies', icon: <FaCheck className="w-4 h-4" /> },
        { label: 'Accessibility', path: '/accessibility', icon: <FaCheck className="w-4 h-4" /> }
      ]
    },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaGithub />, url: 'https://github.com/vaibhavkothari33/Mentora', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaDiscord />, url: 'https://discord.com', label: 'Discord' }
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, text: 'contact@mentora.com' },
    { icon: <FaPhoneAlt />, text: '+1 (888) 123-4567' },
    { icon: <FaMapMarkerAlt />, text: 'San Francisco, CA' }
  ];

  return (
    <footer className={`${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300' : 'bg-gradient-to-b from-gray-50 to-white text-gray-600'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Wave Divider */}
      <div className="w-full overflow-hidden leading-none">
        <svg className={`${darkMode ? 'text-gray-900' : 'text-gray-50'} relative block w-full h-12`} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Subscription */}
        <div className={`rounded-2xl p-8 mb-12 ${darkMode ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm' : 'bg-gradient-to-r from-blue-50 to-indigo-50'} shadow-lg border ${darkMode ? 'border-blue-800/30' : 'border-blue-100'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="max-w-md">
              <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Stay Updated with Mentora
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Get the latest updates on courses, events, and exclusive content delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className={`px-4 py-3 rounded-l-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-800/70 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-200'} border transition-all`}
              />
              <button className="bg-blue-600 hover:bg-blue-700 transition-colors group flex items-center justify-center gap-2 font-medium text-white px-5 py-3 rounded-r-lg">
                Subscribe
                <FaArrowRight className="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
          </div>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/10' : 'bg-blue-100'} group-hover:scale-110 transition-transform`}>
                <FaGraduationCap className={`text-2xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Mentora
              </span>
            </Link>
            
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6 max-w-md`}>
              Empowering education through blockchain technology. Learn, earn certificates, and build your future with our cutting-edge platform.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-gray-100/80 hover:bg-gray-200/70'} transition-colors`}>
                  <div className={`text-sm p-2 rounded-full ${darkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    {item.icon}
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Awards/Trust Badges */}
            <div className={`flex items-center space-x-4 p-3 rounded-lg ${darkMode ? 'bg-amber-900/10 border border-amber-800/20' : 'bg-amber-50 border border-amber-100'}`}>
              <div className={`flex items-center ${darkMode ? 'text-amber-400' : 'text-amber-500'}`}>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <span className={`text-sm font-medium ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                Trusted by 10,000+ students
              </span>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'} uppercase tracking-wider mb-6 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="group">
                    <Link
                      to={link.path}
                      className={`text-sm flex items-center space-x-2 py-1 ${darkMode ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} transition-colors duration-200`}
                    >
                      <span className={`${darkMode ? 'text-blue-500 group-hover:text-blue-400' : 'text-blue-600 group-hover:text-blue-700'} transition-colors`}>
                        {link.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © {currentYear} Mentora Learning Platform. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'} transition-all duration-200 hover:scale-110`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Additional legal links - mobile friendly */}
          <div className="flex flex-wrap justify-center mt-8 gap-x-6 gap-y-3">
            <Link to="/privacy" className={`text-xs flex items-center gap-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>
              <FaShieldAlt size={10} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              Privacy Policy
            </Link>
            <Link to="/terms" className={`text-xs flex items-center gap-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>
              <FaFileAlt size={10} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              Terms of Service
            </Link>
            <Link to="/cookies" className={`text-xs flex items-center gap-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>
              <FaCheck size={10} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              Cookie Policy
            </Link>
            <Link to="/sitemap" className={`text-xs flex items-center gap-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-200`}>
              <FaFileAlt size={10} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;