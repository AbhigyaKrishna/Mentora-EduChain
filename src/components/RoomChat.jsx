import React, { useState, useEffect, useRef } from 'react';

const RoomChat = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);
  const messageIdsRef = useRef(new Set()); // Track message IDs to prevent duplicates

  // Generate a unique ID for this user (in real app, use authentication)
  const currentUser = useRef({
    id: `user-${Date.now()}`,
    name: `User ${Math.floor(Math.random() * 1000)}`
  }).current;

  const addMessage = (message) => {
    // Check if message already exists
    if (!messageIdsRef.current.has(message.id)) {
      messageIdsRef.current.add(message.id);
      setMessages(prev => [...prev, message]);
    }
  };

  useEffect(() => {
    // Connect to WebSocket for chat
    const connectWebSocket = () => {
      try {
        const ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomId}`);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('Chat WebSocket connected');
          setIsConnected(true);
          setError(null);
        };

        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          
          if (data.type === 'message') {
            // Add message ID if not present
            const message = {
              ...data.message,
              id: data.message.id || `${data.message.userId}-${data.message.timestamp}`
            };
            addMessage(message);
          } 
          else if (data.type === 'history') {
            // Reset message IDs for new history
            messageIdsRef.current.clear();
            // Add IDs to messages if not present and update the Set
            const messagesWithIds = data.messages.map(msg => ({
              ...msg,
              id: msg.id || `${msg.userId}-${msg.timestamp}`
            }));
            messagesWithIds.forEach(msg => messageIdsRef.current.add(msg.id));
            setMessages(messagesWithIds);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setError('Failed to connect to chat server');
        };

        ws.onclose = () => {
          console.log('WebSocket closed');
          setIsConnected(false);
          // Attempt to reconnect after a delay
          setTimeout(() => {
            if (document.visibilityState !== 'hidden') {
              connectWebSocket();
            }
          }, 3000);
        };

        return () => {
          if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
            ws.close();
          }
        };
      } catch (err) {
        console.error('Error connecting to WebSocket:', err);
        setError('Failed to connect to chat server');
      }
    };

    connectWebSocket();

    // Cleanup function
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      // Clear message IDs on unmount
      messageIdsRef.current.clear();
    };
  }, [roomId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !isConnected) return;

    const messageId = `${currentUser.id}-${Date.now()}`;
    const messageData = {
      type: 'message',
      message: {
        id: messageId,
        userId: currentUser.id,
        userName: currentUser.name,
        text: newMessage,
        timestamp: new Date().toISOString()
      }
    };

    // Send message over WebSocket
    if (wsRef.current && isConnected) {
      wsRef.current.send(JSON.stringify(messageData));
      
      // Only add message locally if not in Set (prevent duplication)
      if (!messageIdsRef.current.has(messageId)) {
        addMessage(messageData.message);
      }
    }

    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className=" px-4 py-2 flex justify-between items-center">
        <h3 className="font-medium">Room Chat</h3>
        <div className="flex items-center">
          <span className={`h-2 w-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 text-sm">
          {error}
        </div>
      )}

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(groupedMessages).map(([date, dateMessages]) => (
          <div key={date} className="space-y-3">
            {/* Date separator */}
            <div className="flex justify-center">
              <div className="bg-gray-100 text-gray-500 rounded-full px-3 py-1 text-xs">
                {date}
              </div>
            </div>
            
            {/* Messages for this date */}
            {dateMessages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.userId === currentUser.id ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                    message.userId === currentUser.id 
                      ? 'bg-blue-500 text-white'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  {message.userId !== currentUser.id && (
                    <div className="font-medium text-sm mb-1 text-white/90">{message.userName}</div>
                  )}
                  <div>{message.text}</div>
                  <div className="text-xs text-right mt-1 text-white/75">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="border-t p-2">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border text-black rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isConnected}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r"
            disabled={!isConnected || !newMessage.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomChat;