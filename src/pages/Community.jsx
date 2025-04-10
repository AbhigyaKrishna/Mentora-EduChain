import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaUser, FaCalendar, FaPlus, FaChevronDown, FaChevronUp, FaComment, FaHeart, FaShare, FaTag } from 'react-icons/fa';

const Community = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', tag: 'discussion' });
  const [expandedPost, setExpandedPost] = useState(null);
  const [activeTag, setActiveTag] = useState('all');

  const tags = ['all', 'announcement', 'discussion', 'question', 'showcase', 'help', 'feedback'];

  useEffect(() => {
    const dummyPosts = [
      {
        id: 1,
        title: 'Welcome to our Community!',
        content: 'Feel free to share your thoughts and connect with others.',
        author: 'Admin',
        date: '2023-07-20',
        likes: 42,
        tag: 'announcement',
        replies: [
          {
            id: 101,
            content: 'Thanks for having us! Looking forward to learning together.',
            author: 'NewLearner',
            date: '2023-07-20',
            likes: 12
          },
          {
            id: 102,
            content: 'Great to be here! The platform looks amazing.',
            author: 'TechStudent', 
            date: '2023-07-20',
            likes: 8
          }
        ]
      },
      {
        id: 2,
        title: 'Help Needed: Smart Contract Testing',
        content: 'I am struggling with writing test cases for my smart contract. Any tips or resources?',
        author: 'BlockchainBeginner',
        date: '2023-07-19',
        likes: 15,
        tag: 'help',
        replies: [
          {
            id: 201,
            content: 'Check out Hardhat and Chai for testing. They make it much easier!',
            author: 'SmartContractPro',
            date: '2023-07-19',
            likes: 5
          },
          {
            id: 202,
            content: 'I can share my testing template if youd like. It covers most common scenarios.',
            author: 'TestingGuru',
            date: '2023-07-19',
            likes: 7
          }
        ]
      },
      {
        id: 3,
        title: 'New Course Feedback',
        content: 'Just completed the DeFi course. Here is my detailed review and suggestions.',
        author: 'DeFiLearner',
        date: '2023-07-18',
        likes: 28,
        tag: 'feedback',
        replies: [
          {
            id: 301,
            content: 'Thanks for the detailed feedback! We will consider these points in our next update.',
            author: 'CourseInstructor',
            date: '2023-07-18',
            likes: 10
          }
        ]
      }
    ];
    setPosts(dummyPosts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) return;

    const post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: 'Current User',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      tag: newPost.tag,
      replies: []
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', content: '', tag: 'discussion' });
  };

  const filteredPosts = activeTag === 'all' 
    ? posts 
    : posts.filter(post => post.tag === activeTag);

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    // Sort by pinned status (if implemented) and then by date
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text.primary}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient-xy" />
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Community Forum
            </h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-2xl ${theme.text.secondary} leading-relaxed`}
            >
              Connect with fellow learners, share knowledge, and grow together
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tag Filter */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTag === tag 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : `${theme.text.secondary} hover:bg-blue-100 dark:hover:bg-blue-900`
              }`}
            >
              <span className="capitalize">{tag}</span>
              {tag !== 'all' && (
                <span className="ml-2 text-xs">
                  ({posts.filter(post => post.tag === tag).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* New Post Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${theme.card} rounded-2xl shadow-xl p-8 mb-12 border ${theme.border} backdrop-blur-sm`}
        >
          <h2 className="text-3xl font-bold mb-6">Create New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-grow">
                <label htmlFor="title" className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newPost.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl ${theme.background} border ${theme.border} focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg`}
                  placeholder="What's on your mind?"
                  required
                />
              </div>
              <div>
                <label htmlFor="tag" className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>
                  Tag
                </label>
                <select
                  id="tag"
                  name="tag"
                  value={newPost.tag}
                  onChange={handleInputChange}
                  className={`px-4 py-3 rounded-xl ${theme.background} border ${theme.border} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  {tags.filter(tag => tag !== 'all').map(tag => (
                    <option key={tag} value={tag} className="capitalize">
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="content" className={`block text-sm font-medium ${theme.text.secondary} mb-2`}>
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-3 rounded-xl ${theme.background} border ${theme.border} focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg`}
                placeholder="Share your thoughts with the community..."
                required
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-lg font-medium shadow-lg hover:shadow-xl"
            >
              <FaPlus className="text-sm" />
              Create Post
            </button>
          </form>
        </motion.div>

        {/* Posts List */}
        <div className="space-y-8">
          {sortedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`${theme.card} rounded-2xl shadow-lg p-8 border ${theme.border} hover:shadow-xl transition-shadow`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.tag === 'announcement' ? 'bg-red-100 text-red-600' :
                      post.tag === 'help' ? 'bg-yellow-100 text-yellow-600' :
                      post.tag === 'feedback' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <span className="capitalize">{post.tag}</span>
                    </span>
                    <h3 className="text-2xl font-bold hover:text-blue-600 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-2">
                      <FaUser className="text-blue-500" />
                      <span className={`${theme.text.secondary} font-medium`}>{post.author}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FaCalendar className="text-blue-500" />
                      <span className={theme.text.secondary}>{post.date}</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FaComment className="text-blue-500" />
                      <span className={theme.text.secondary}>{post.replies?.length || 0}</span>
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FaHeart className="text-pink-500" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FaShare className="text-blue-500" />
                  </button>
                </div>
              </div>
              
              <p className={`${theme.text.secondary} text-lg mb-6`}>{post.content}</p>
              
              {post.replies && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {expandedPost === post.id ? <FaChevronUp /> : <FaChevronDown />}
                    {post.replies.length} Replies
                  </button>
                  
                  {expandedPost === post.id && (
                    <div className="mt-4 space-y-4">
                      {post.replies.map(reply => (
                        <div key={reply.id} className={`p-4 rounded-xl ${theme.background} border ${theme.border}`}>
                          <div className="flex items-center gap-3 mb-2">
                            <FaUser className="text-blue-500" />
                            <span className="font-medium">{reply.author}</span>
                            <span className={`text-sm ${theme.text.secondary}`}>{reply.date}</span>
                          </div>
                          <p className={theme.text.secondary}>{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
