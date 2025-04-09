import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiUsers, FiCalendar, FiSearch, FiGrid, FiList } from 'react-icons/fi';
import CreateRoomModal from '../components/CreateRoomModal';
import { toast } from 'react-hot-toast';

const ProjectRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'name', 'members'

  useEffect(() => {
    fetchRooms();
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
          description: 'Collaborative React application', 
          createdAt: new Date().toISOString(), 
          memberCount: 3,
          tags: ['react', 'frontend']
        },
        // ... other sample rooms
      ]);
    } finally {
      setIsLoading(false);
    }
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
      setRooms([...rooms, createdRoom]);
      toast.success('Room created successfully!');
      setShowModal(false);
    } catch (err) {
      toast.error('Failed to create room');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAndSortedRooms = rooms
    .filter(room => 
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
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
        default:
          return 0;
      }
    });

  const RoomCard = ({ room }) => (
    <Link 
      to={`/room/${room.id}`} 
      className="block bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{room.name}</h2>
        <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
          <FiUsers className="w-4 h-4" />
          <span className="text-sm">{room.memberCount}</span>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{room.description}</p>
      {room.tags && (
        <div className="flex flex-wrap gap-2 mb-4">
          {room.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <FiCalendar className="w-4 h-4" />
          <span>{new Date(room.createdAt).toLocaleDateString()}</span>
        </div>
        <span className="text-blue-600 dark:text-blue-400 hover:underline">Join Room →</span>
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Rooms</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          <span>Create New Room</span>
        </button>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border dark:border-gray-700 rounded-lg px-3 py-2 dark:bg-gray-800 dark:text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name</option>
            <option value="members">Most Members</option>
          </select>
          <div className="flex items-center space-x-2 border dark:border-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}`}
            >
              <FiGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}`}
            >
              <FiList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {filteredAndSortedRooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                {searchQuery ? 'No rooms match your search.' : 'No rooms available.'}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Create your first room
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col space-y-4"
            }>
              {filteredAndSortedRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </>
      )}

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