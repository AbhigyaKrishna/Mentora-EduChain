// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FiPlus, FiUsers, FiCalendar, FiSearch, FiGrid, FiList } from 'react-icons/fi';
// import CreateRoomModal from '../components/CreateRoomModal';
// import { toast } from 'react-hot-toast';

// const ProjectRooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'name', 'members'

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const fetchRooms = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:8000/api/v1/rooms');

//       if (!response.ok) {
//         throw new Error('Failed to fetch rooms');
//       }

//       const data = await response.json();
//       setRooms(data);
//     } catch (err) {
//       setError(err.message);
//       toast.error('Failed to load rooms. Using sample data.');
//       // Fallback sample data
//       setRooms([
//         { 
//           id: '1', 
//           name: 'React Project', 
//           description: 'Collaborative React application', 
//           createdAt: new Date().toISOString(), 
//           memberCount: 3,
//           tags: ['react', 'frontend']
//         },
//         // ... other sample rooms
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCreateRoom = async (newRoom) => {
//     try {
//       setIsLoading(true);
//       const response = await fetch('http://localhost:8000/api/v1/rooms', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newRoom),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create room');
//       }

//       const createdRoom = await response.json();
//       setRooms([...rooms, createdRoom]);
//       toast.success('Room created successfully!');
//       setShowModal(false);
//     } catch (err) {
//       toast.error('Failed to create room');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredAndSortedRooms = rooms
//     .filter(room => 
//       room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       room.description.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => {
//       switch (sortBy) {
//         case 'newest':
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         case 'oldest':
//           return new Date(a.createdAt) - new Date(b.createdAt);
//         case 'name':
//           return a.name.localeCompare(b.name);
//         case 'members':
//           return b.memberCount - a.memberCount;
//         default:
//           return 0;
//       }
//     });

//   const RoomCard = ({ room }) => (
//     <Link 
//       to={`/room/${room.id}`} 
//       className="block bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
//     >
//       <div className="flex justify-between items-start mb-4">
//         <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{room.name}</h2>
//         <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
//           <FiUsers className="w-4 h-4" />
//           <span className="text-sm">{room.memberCount}</span>
//         </div>
//       </div>
//       <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{room.description}</p>
//       {room.tags && (
//         <div className="flex flex-wrap gap-2 mb-4">
//           {room.tags.map(tag => (
//             <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
//               {tag}
//             </span>
//           ))}
//         </div>
//       )}
//       <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
//         <div className="flex items-center space-x-1">
//           <FiCalendar className="w-4 h-4" />
//           <span>{new Date(room.createdAt).toLocaleDateString()}</span>
//         </div>
//         <span className="text-blue-600 dark:text-blue-400 hover:underline">Join Room →</span>
//       </div>
//     </Link>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Rooms</h1>
//         <button 
//           onClick={() => setShowModal(true)}
//           className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
//         >
//           <FiPlus className="w-5 h-5" />
//           <span>Create New Room</span>
//         </button>
//       </div>

//       {/* Filters and Controls */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <div className="relative flex-1 max-w-md">
//           <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search rooms..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//           />
//         </div>
//         <div className="flex items-center space-x-4">
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="border dark:border-gray-700 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white"
//           >
//             <option value="newest">Newest First</option>
//             <option value="oldest">Oldest First</option>
//             <option value="name">Name</option>
//             <option value="members">Most Members</option>
//           </select>
//           <div className="flex items-center space-x-2 border dark:border-gray-700 rounded-lg p-1">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}`}
//             >
//               <FiGrid className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}`}
//             >
//               <FiList className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
//           {error}
//         </div>
//       )}

//       {/* Loading State */}
//       {isLoading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <>
//           {filteredAndSortedRooms.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
//                 {searchQuery ? 'No rooms match your search.' : 'No rooms available.'}
//               </p>
//               <button
//                 onClick={() => setShowModal(true)}
//                 className="text-blue-600 dark:text-blue-400 hover:underline"
//               >
//                 Create your first room
//               </button>
//             </div>
//           ) : (
//             <div className={
//               viewMode === 'grid'
//                 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                 : "flex flex-col space-y-4"
//             }>
//               {filteredAndSortedRooms.map((room) => (
//                 <RoomCard key={room.id} room={room} />
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {/* Create Room Modal */}
//       {showModal && (
//         <CreateRoomModal 
//           onClose={() => setShowModal(false)}
//           onCreate={handleCreateRoom}
//         />
//       )}
//     </div>
//   );
// };

// export default ProjectRooms;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiUsers, FiCalendar, FiSearch, FiGrid, FiList, FiFilter, FiTag, FiInfo, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import CreateRoomModal from '../components/CreateRoomModal';
import { toast } from 'react-hot-toast';
import EmptyStateIllustration from '../components/illustrations/EmptyState';

const ProjectRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'name', 'members'
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [stats, setStats] = useState({
    totalRooms: 0,
    activeUsers: 0,
    popularTags: []
  });

  useEffect(() => {
    fetchRooms();
    fetchStats();
  }, []);

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/v1/rooms');

      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }

      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load rooms. Using sample data.');
      // Fallback sample data
      setRooms([
        {
          id: '1',
          name: 'React Project',
          description: 'Collaborative React application for building interactive UIs with modern JavaScript.',
          createdAt: new Date().toISOString(),
          memberCount: 8,
          tags: ['react', 'frontend', 'javascript'],
          lastActive: new Date().toISOString(),
          thumbnail: './react.png'
        },
        {
          id: '2',
          name: 'Blockchain Development',
          description: 'Working with Solidity, Web3.js, and Ethereum to build decentralized applications.',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          memberCount: 12,
          tags: ['blockchain', 'solidity', 'ethereum'],
          lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          thumbnail: './block.png'
        },
        {
          id: '3',
          name: 'Defi Development',
          description: 'Building cross-platform mobile applications using React Native and Firebase.',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          memberCount: 5,
          tags: ['defi', 'solana', 'solidity'],
          lastActive: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          thumbnail: './defi.png'
        },
      
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    // In a real app, this would be an API call
    setStats({
      totalRooms: 24,
      activeUsers: 142,
      popularTags: ['javascript', 'react', 'python', 'design', 'data-science']
    });
  };

  const handleCreateRoom = async (newRoom) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/api/v1/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoom),
      });

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      const createdRoom = await response.json();
      setRooms([createdRoom, ...rooms]);
      toast.success('Room created successfully!');
      setShowModal(false);
    } catch (err) {
      toast.error('Failed to create room');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredAndSortedRooms = rooms
    .filter(room => {
      // Text search filter
      const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Tags filter
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => room.tags && room.tags.includes(tag));

      return matchesSearch && matchesTags;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'members':
          return b.memberCount - a.memberCount;
        case 'active':
          return new Date(b.lastActive) - new Date(a.lastActive);
        default:
          return 0;
      }
    });

  // Get all unique tags from rooms
  const allTags = [...new Set(rooms.flatMap(room => room.tags || []))];

  // Format time ago
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return `${interval} year${interval === 1 ? '' : 's'} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval === 1 ? '' : 's'} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval === 1 ? '' : 's'} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval === 1 ? '' : 's'} ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval === 1 ? '' : 's'} ago`;

    return 'just now';
  };

  const RoomCard = ({ room }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Link
        to={`/room/${room.id}`}
        className={`block bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex items-stretch' : 'transform hover:-translate-y-2'
          }`}
      >
        {/* Thumbnail */}
        <div className={`${viewMode === 'list' ? 'w-32 md:w-48' : 'w-full h-40'} relative overflow-hidden`}>
          <img
            src={room.thumbnail || `./react.png`}
            // src={room.thumbnail || `/api/placeholder/300/200?text=${encodeURIComponent(room.name)}`}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <FiUsers className="mr-1" />
            {room.memberCount}
          </div>
        </div>

        {/* Content */}
        <div className={`${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''} p-5`}>
          <div>
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{room.name}</h2>
              {room.lastActive && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Active {timeAgo(room.lastActive)}
                </span>
              )}
            </div>

            <p className={`text-gray-600 dark:text-gray-300 mb-4 ${viewMode === 'list' ? 'line-clamp-1' : 'line-clamp-2'}`}>
              {room.description}
            </p>
          </div>

          {/* Tags */}
          {room.tags && room.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {room.tags.slice(0, viewMode === 'list' ? 2 : 3).map(tag => (
                <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  {tag}
                </span>
              ))}
              {room.tags.length > (viewMode === 'list' ? 2 : 3) && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                  +{room.tags.length - (viewMode === 'list' ? 2 : 3)}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <FiCalendar className="w-4 h-4 mr-1" />
              <span>{new Date(room.createdAt).toLocaleDateString()}</span>
            </div>
            <span className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              Join Room <FiArrowRight className="ml-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Project Rooms</h1>
              <p className="text-blue-100 max-w-lg mb-6">
                Join existing collaborative spaces or create your own to work together with others on projects,
                share resources, and learn collectively.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center space-x-2 bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors shadow-lg"
                >
                  <FiPlus className="w-5 h-5" />
                  <span>Create New Room</span>
                </button>
                <button className="bg-blue-700 bg-opacity-30 hover:bg-opacity-50 px-6 py-3 rounded-lg font-medium transition-colors">
                  Browse Rooms
                </button>
              </div>
            </div>
            <div className="mt-8 md:mt-0 flex items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.totalRooms}</div>
                <div className="text-blue-200">Active Rooms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{stats.activeUsers}</div>
                <div className="text-blue-200">Online Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by room name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border dark:border-gray-700 rounded-lg px-4 py-3 dark:bg-gray-700 dark:text-white flex-grow md:flex-grow-0"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="members">Most Members</option>
                <option value="active">Recently Active</option>
              </select>
              <div className="flex items-center space-x-1 border dark:border-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                  aria-label="Grid view"
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
                  aria-label="List view"
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg border ${showFilters ? 'bg-blue-100 border-blue-300 dark:bg-blue-900 dark:border-blue-700 text-blue-600 dark:text-blue-400' : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}
                aria-label="Show filters"
              >
                <FiFilter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t dark:border-gray-700">
                  <div className="mb-3 flex items-center">
                    <FiTag className="mr-2 text-gray-500 dark:text-gray-400" />
                    <h3 className="font-medium text-gray-900 dark:text-white">Filter by Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm ${selectedTags.includes(tag)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  {selectedTags.length > 0 && (
                    <button
                      onClick={() => setSelectedTags([])}
                      className="text-sm text-blue-600 dark:text-blue-400 mt-2"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Popular tags */}
        {!searchQuery && selectedTags.length === 0 && stats.popularTags.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">Popular tags:</span>
              <div className="flex flex-wrap gap-2">
                {stats.popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className="px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/40 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6 flex items-start">
            <FiInfo className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Unable to load rooms</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex flex-col space-y-4"
          }>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className={`${viewMode === 'list' ? 'h-24 w-32 md:w-48 float-left' : 'h-40 w-full'} bg-gray-200 dark:bg-gray-700`}></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredAndSortedRooms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-center mb-6">
                  <EmptyStateIllustration className="w-64 h-64" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {searchQuery || selectedTags.length > 0 ? 'No matching rooms found' : 'No rooms available'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-6 max-w-md mx-auto">
                  {searchQuery || selectedTags.length > 0
                    ? 'Try adjusting your search or filters to find what you\'re looking for.'
                    : 'Be the first to create a collaborative study room for your project!'}
                </p>
                {(searchQuery || selectedTags.length > 0) ? (
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedTags([]); }}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline mx-2"
                  >
                    Clear all filters
                  </button>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <FiPlus className="mr-2" /> Create your first room
                  </button>
                )}
              </motion.div>
            ) : (
              <>
                {/* Results info */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-500 dark:text-gray-400">
                    Showing {filteredAndSortedRooms.length} {filteredAndSortedRooms.length === 1 ? 'room' : 'rooms'}
                    {(searchQuery || selectedTags.length > 0) && ' matching your criteria'}
                  </p>
                </div>

                {/* Room grid/list */}
                <div className={
                  viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col space-y-4"
                }>
                  <AnimatePresence>
                    {filteredAndSortedRooms.map((room) => (
                      <RoomCard key={room.id} room={room} />
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Create Room Modal */}
      {showModal && (
        <CreateRoomModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateRoom}
        />
      )}
    </div>
  );
};

export default ProjectRooms;