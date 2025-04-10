import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaCalendar, FaUser, FaTag, FaSearch, FaChevronDown } from 'react-icons/fa';

const Blog = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Technical', 'Security', 'Education', 'Blockchain', 'Development', 'Research', 'Industry News'];

  const blogPosts = [
    {
      title: "Introduction to Web3 Development",
      author: "Dr. John Smith",
      date: "March 15, 2024",
      category: "Technical",
      excerpt: "A comprehensive guide to Web3 development fundamentals and dApp architecture...",
      readTime: "12 min"
    },
    {
      title: "Smart Contract Security Best Practices",
      author: "Alice Johnson",
      date: "March 14, 2024",
      category: "Security",
      excerpt: "Essential security patterns and common vulnerabilities in smart contract development...",
      readTime: "10 min"
    },
    {
      title: "The Future of Decentralized Education",
      author: "Prof. Mark Wilson",
      date: "March 13, 2024",
      category: "Education",
      excerpt: "How blockchain is transforming traditional educational systems and certification...",
      readTime: "8 min"
    },
    {
      title: "Zero Knowledge Proofs Explained",
      author: "Dr. Sarah Chen",
      date: "March 12, 2024",
      category: "Technical",
      excerpt: "Understanding ZK-proofs and their applications in blockchain technology...",
      readTime: "15 min"
    },
    {
      title: "NFTs in Education: Beyond Digital Art",
      author: "Michael Brown",
      date: "March 11, 2024",
      category: "Education",
      excerpt: "Exploring innovative applications of NFTs in educational credentials...",
      readTime: "9 min"
    },
    {
      title: "Layer 2 Scaling Solutions",
      author: "Tech Team",
      date: "March 10, 2024",
      category: "Technical",
      excerpt: "Comparing different L2 solutions for blockchain scalability...",
      readTime: "11 min"
    },
    {
      title: "DeFi Security Incidents Analysis",
      author: "Security Team",
      date: "March 9, 2024",
      category: "Security",
      excerpt: "Recent DeFi hacks and lessons learned for better security...",
      readTime: "13 min"
    },
    {
      title: "Web3 Industry Trends 2024",
      author: "Research Team",
      date: "March 8, 2024",
      category: "Industry News",
      excerpt: "Analysis of emerging trends in the Web3 ecosystem...",
      readTime: "7 min"
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text.primary} py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden`}>
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

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Mentora Insights</h1>
          <p className={`text-lg ${theme.text.secondary} max-w-2xl mx-auto`}>
            Expert analysis and insights on blockchain education and Web3 development
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${theme.card} focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div className="relative w-full sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg ${theme.card} appearance-none`}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme.card} rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-200`}
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-3 py-1 rounded-full ${theme.primary} text-white`}>
                    {post.category}
                  </span>
                  <span className={`text-sm ${theme.text.secondary}`}>{post.readTime}</span>
                </div>
                
                <h2 className="text-lg font-semibold hover:text-blue-500 transition-colors cursor-pointer">
                  {post.title}
                </h2>

                <p className={`${theme.text.secondary} text-sm line-clamp-2`}>
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 text-sm">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <FaUser className="mr-1 text-blue-500 w-3 h-3" />
                      <span className={theme.text.secondary}>{post.author}</span>
                    </span>
                    <span className="flex items-center">
                      <FaCalendar className="mr-1 text-blue-500 w-3 h-3" />
                      <span className={theme.text.secondary}>{post.date}</span>
                    </span>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 font-medium">
                    Read →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
