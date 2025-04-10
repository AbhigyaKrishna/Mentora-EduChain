import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaCheck, FaLock, FaFilePdf, FaExternalLinkAlt, FaPause, FaVolumeMute, FaVolumeUp, FaExpand } from 'react-icons/fa';

const VideoPlayer = ({ videoUrl, onComplete }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(null);

  // Convert IPFS URL to HTTP URL if needed
  const getVideoUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('ipfs://')) {
      const cid = url.replace('ipfs://', '');
      return `https://${cid}.ipfs.w3s.link`;
    }
    return url;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadMetadata);
      video.addEventListener('error', handleVideoError);
      video.addEventListener('ended', () => onComplete && onComplete());
      
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadMetadata);
        video.removeEventListener('error', handleVideoError);
        video.removeEventListener('ended', () => onComplete && onComplete());
      };
    }
  }, [onComplete]);

  const handleVideoError = (e) => {
    console.error('Video error:', e);
    setError('Error loading video. Please try again later.');
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleLoadMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    if (videoRef.current) {
      videoRef.current.currentTime = clickPosition * videoRef.current.duration;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative rounded-lg overflow-hidden group bg-black">
      <video
        ref={videoRef}
        src={getVideoUrl(videoUrl)}
        className="w-full aspect-video object-contain"
        playsInline
      />
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center p-4">
            <p className="text-red-500 mb-2">{error}</p>
            <button 
              onClick={() => {
                setError(null);
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Video Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* Progress Bar */}
          <div 
            className="w-full h-1 bg-gray-600 rounded cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-blue-500 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlay}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <button 
                onClick={toggleMute}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>

              <div className="hidden sm:flex w-24 items-center">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="text-sm">
                {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
              </div>
            </div>

            <button 
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/20 rounded-full transition"
            >
              <FaExpand />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseModule = ({ topics = [], onUpdateProgress }) => {
  const [activeTopic, setActiveTopic] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [activeTab, setActiveTab] = useState('content');

  const handleTopicClick = (topic) => {
    if (!topic.isLocked) {
      setActiveTopic(topic);
      setActiveTab('content');
    }
  };

  const handleTopicComplete = (topicId) => {
    setCompletedTopics((prev) => new Set([...prev, topicId]));
    const progress = Math.round((completedTopics.size + 1) / topics.length * 100);
    onUpdateProgress && onUpdateProgress(progress);
  };

  const handleVideoComplete = () => {
    if (activeTopic && !completedTopics.has(activeTopic.id)) {
      handleTopicComplete(activeTopic.id);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700/50 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[600px]">
        {/* Sidebar - Course Topics */}
        <div className="lg:col-span-1 bg-gray-900/50 border-r border-gray-700/50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Course Content</h2>
              <span className="text-sm text-gray-400">
                {completedTopics.size}/{topics.length}
              </span>
            </div>
            
            <div className="space-y-3">
        {topics.map((topic, index) => (
          <div
            key={index}
                  onClick={() => handleTopicClick(topic)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeTopic?.id === topic.id 
                      ? 'bg-blue-600 text-white shadow-lg translate-x-1'
                      : topic.isLocked 
                        ? 'bg-gray-800/70 text-gray-500 cursor-not-allowed' 
                        : 'bg-gray-800/30 text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      completedTopics.has(topic.id)
                        ? 'bg-green-500/20 text-green-400'
                        : topic.isLocked
                          ? 'bg-gray-700/30 text-gray-600'
                          : 'bg-blue-500/20 text-blue-400'
                    }`}>
              {topic.isLocked ? (
                        <FaLock className="w-4 h-4" />
                      ) : completedTopics.has(topic.id) ? (
                        <FaCheck className="w-4 h-4" />
                      ) : (
                        <FaPlay className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{topic.title}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {topic.duration || '15:00'} • {topic.isLocked ? 'Locked' : completedTopics.has(topic.id) ? 'Completed' : 'Not Started'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 flex flex-col">
          {activeTopic ? (
            <div className="h-full">
              {/* Tabs Navigation */}
              <div className="border-b border-gray-700/50">
                <div className="flex space-x-4 p-4">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'content'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    Content
                  </button>
                  <button
                    onClick={() => setActiveTab('resources')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === 'resources'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    Resources
                  </button>
                </div>
              </div>

              {/* Content Tab */}
              <div className="p-6 overflow-y-auto flex-1">
                {activeTab === 'content' ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white">{activeTopic.title}</h3>
                      <div className="text-sm text-gray-400">
                        Duration: {activeTopic.duration || '15:00'}
                      </div>
      </div>

                    <VideoPlayer 
                      videoUrl={activeTopic.videoUrl} 
                      onComplete={handleVideoComplete}
                    />

                    <div className="mt-8 space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">About this module</h4>
                        <p className="text-gray-300">{activeTopic.description}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Learning Objectives</h4>
                        <div className="grid gap-3">
                          {activeTopic.objectives?.map((objective, index) => (
                            <div 
                              key={index}
                              className="flex items-start gap-3 bg-gray-800/30 p-4 rounded-lg"
                            >
                              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              </div>
                              <p className="text-gray-300">{objective}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleTopicComplete(activeTopic.id)}
                        className={`w-full py-4 rounded-lg font-medium transition-all duration-300 ${
                          completedTopics.has(activeTopic.id)
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
                        }`}
                      >
                        {completedTopics.has(activeTopic.id) ? (
                          <span className="flex items-center gap-2 justify-center">
                            <FaCheck /> Module Completed
                          </span>
                        ) : (
                          'Complete Module'
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Resources Tab
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Module Resources</h3>
                    {activeTopic.resources && activeTopic.resources.length > 0 ? (
                      <div className="grid gap-4">
                        {activeTopic.resources.map((resource, index) => (
                          <a 
                            key={index} 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg hover:bg-gray-700/50 transition-colors group"
                          >
                            <div className={`p-4 rounded-lg ${
                              resource.type === 'pdf' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {resource.type === 'pdf' ? <FaFilePdf className="w-6 h-6" /> : <FaExternalLinkAlt className="w-6 h-6" />}
                            </div>
                            <div className="flex-1">
                              <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                {resource.name}
                              </div>
                              <div className="text-sm text-gray-400 mt-1">
                                {resource.type === 'pdf' ? 'PDF Document' : 'External Resource'}
                              </div>
                            </div>
                            <FaExternalLinkAlt className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-800/30 rounded-lg">
                        <p className="text-gray-400">No resources available for this module.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Welcome Screen
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="p-6 rounded-full bg-blue-600/20 mb-6">
                <FaPlay className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Welcome to the Course</h3>
              <p className="text-gray-400 max-w-md">
                Select a module from the curriculum to begin your learning journey. Each module contains 
                video lectures, resources, and interactive content to help you master the material.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseModule;