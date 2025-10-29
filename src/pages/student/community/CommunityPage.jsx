import React, { useState } from 'react';
import { Search, Filter, ThumbsUp, MessageCircle, MoreVertical, Sparkles, Download, FileText, Image as ImageIcon, File, Send, Smile } from 'lucide-react';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [isChannelsModalOpen, setIsChannelsModalOpen] = useState(false);
  const [channelsSearch, setChannelsSearch] = useState('');
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);
  const [usersSearch, setUsersSearch] = useState('');

  // Mock data for discussions
  const discussions = [
    {
      id: 1,
      title: "Best resources for JEE Advanced preparation?",
      author: "Rahul Sharma",
      initials: "RS",
      time: "2 hours ago",
      topicTag: "Study Help",
      categoryTags: ["JEE", "Physics", "Resources"],
      likes: 45,
      replies: 24
    },
    {
      id: 2,
      title: "How to crack NEET in 6 months?",
      author: "Priya Patel",
      initials: "PP",
      time: "4 hours ago",
      topicTag: "Study Tips",
      categoryTags: ["NEET", "Biology", "Strategy"],
      likes: 32,
      replies: 18
    },
    {
      id: 3,
      title: "SSC CGL preparation strategy",
      author: "Amit Kumar",
      initials: "AK",
      time: "5 hours ago",
      topicTag: "Career Advice",
      categoryTags: ["SSC", "Strategy", "Guidance"],
      likes: 28,
      replies: 15
    },
    {
      id: 4,
      title: "Latest AI and ML trends for developers",
      author: "Sneha Singh",
      initials: "SS",
      time: "6 hours ago",
      topicTag: "Tech Talks",
      categoryTags: ["AI", "ML", "Technology"],
      likes: 67,
      replies: 32
    }
  ];

  // Mock data for resources
  const resources = [
    {
      id: 1,
      title: "JEE Physics Notes",
      author: "Rahul Sharma",
      downloads: 234,
      type: "PDF"
    },
    {
      id: 2,
      title: "NEET Biology Flashcards",
      author: "Priya Patel",
      downloads: 189,
      type: "PDF"
    },
    {
      id: 3,
      title: "SSC Previous Year Papers",
      author: "Sneha Singh",
      downloads: 456,
      type: "PDF"
    },
    {
      id: 4,
      title: "Digital Marketing Cheatsheet",
      author: "Vikram Reddy",
      downloads: 123,
      type: "PDF"
    },
    {
      id: 5,
      title: "Coding Interview Questions",
      author: "Amit Kumar",
      downloads: 567,
      type: "DOC"
    },
    {
      id: 6,
      title: "Data Structures Mind Map",
      author: "Rahul Sharma",
      downloads: 345,
      type: "Image"
    }
  ];

  // Online users
  const onlineUsers = [
    { id: 1, name: "Rahul", initials: "RS", status: "online" },
    { id: 2, name: "Priya", initials: "PP", status: "online" },
    { id: 3, name: "Amit", initials: "AK", status: "online" },
    { id: 4, name: "Sneha", initials: "SS", status: "away" },
    { id: 5, name: "Vikram", initials: "VR", status: "online" },
    { id: 6, name: "Sara", initials: "SA", status: "online" },
    { id: 7, name: "Raj", initials: "RJ", status: "online" },
    { id: 8, name: "Meera", initials: "MR", status: "away" },
    { id: 9, name: "Karan", initials: "KR", status: "online" },
    { id: 10, name: "Anika", initials: "AK", status: "online" },
    { id: 11, name: "Neha", initials: "NH", status: "online" },
    { id: 12, name: "Arjun", initials: "AJ", status: "away" },
    { id: 13, name: "Surya", initials: "SY", status: "online" },
    { id: 14, name: "Isha", initials: "IS", status: "online" },
    { id: 15, name: "Rohan", initials: "RH", status: "online" }
  ];

  const channels = [
    'general', 
    'study-help', 
    'career-advice', 
    'tech-talks', 
    'announcements',
    'jee-preparation',
    'neet-preparation',
    'ssc-exams',
    'upsc-ias',
    'web-development',
    'data-science',
    'ai-ml',
    'placement-help',
    'interview-prep',
    'motivation',
    'study-materials',
    'exam-tips',
    'success-stories'
  ];

  // Mock chat messages
  const chatMessages = [
    { id: 1, user: "Rahul Sharma", initials: "RS", message: "Hey everyone! Anyone here preparing for JEE Advanced?", time: "10:30 AM", isOwn: false },
    { id: 2, user: "Priya Patel", initials: "PP", message: "Yes! I'm focusing on Physics right now. Any tips?", time: "10:32 AM", isOwn: false },
    { id: 3, user: "You", initials: "ME", message: "I found these notes really helpful. Let me share them.", time: "10:35 AM", isOwn: true },
    { id: 4, user: "Amit Kumar", initials: "AK", message: "That would be great! Thanks!", time: "10:36 AM", isOwn: false },
    { id: 5, user: "Sneha Singh", initials: "SS", message: "Can someone help with NEET Biology?", time: "10:40 AM", isOwn: false }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to the server
      setMessage('');
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-4 h-4" />;
      case 'DOC':
        return <File className="w-4 h-4" />;
      case 'Image':
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    return status === 'online' ? 'bg-green-500' : 'bg-orange-500';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Container with Sidebar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-4 space-y-4">
              {/* Channels Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Channels</h3>
                  {channels.length > 8 && (
                    <button onClick={() => setIsChannelsModalOpen(true)} className="text-xs text-blue-600 hover:text-blue-700">View all</button>
                  )}
                </div>
                <div className="space-y-2 max-h-[300px] overflow-auto pr-1">
                  {channels.slice(0, 12).map((channel) => (
                    <button
                      key={channel}
                      onClick={() => setSelectedChannel(channel)}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        selectedChannel === channel ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      #{channel.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              {/* Online Users Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Online - {onlineUsers.length}</h3>
                  {onlineUsers.length > 8 && (
                    <button onClick={() => setIsUsersModalOpen(true)} className="text-xs text-blue-600 hover:text-blue-700">View all</button>
                  )}
                </div>
                <div className="space-y-2 max-h-[260px] overflow-auto pr-1">
                  {onlineUsers.slice(0, 12).map((user) => (
                    <div key={user.id} className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                          {user.initials}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
                      </div>
                      <span className="text-sm text-gray-700 truncate">{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          {/* Main Column start */}
          <div className="flex-1">

      {/* Top Navigation with Search and Actions */}
      <div className="bg-white border border-gray-200 rounded-lg mb-4 px-3 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
          {/* Search Bar */}
          <div className="flex-1 max-w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter and New Discussion Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 hidden sm:inline">Filter</span>
            </button>

            <button className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base whitespace-nowrap">
              New Discussion
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex gap-3 sm:gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`py-3 sm:py-4 px-2 border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'discussions'
                  ? 'border-blue-600 text-gray-900 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Discussions
            </button>
            {/* Mobile-only tabs for Channels and Online */}
            <button
              onClick={() => setActiveTab('channels')}
              className={`md:hidden py-3 px-2 border-b-2 transition-colors whitespace-nowrap text-sm ${
                activeTab === 'channels'
                  ? 'border-blue-600 text-gray-900 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Channels
            </button>
            <button
              onClick={() => setActiveTab('online')}
              className={`md:hidden py-3 px-2 border-b-2 transition-colors whitespace-nowrap text-sm ${
                activeTab === 'online'
                  ? 'border-blue-600 text-gray-900 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Online
            </button>
            <button
              onClick={() => setActiveTab('live-chat')}
              className={`py-3 sm:py-4 px-2 border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'live-chat'
                  ? 'border-blue-600 text-gray-900 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Live Chat
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-3 sm:py-4 px-2 border-b-2 transition-colors whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'resources'
                  ? 'border-blue-600 text-gray-900 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Resources
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {activeTab === 'channels' && (
          <div className="md:hidden">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Channels</h3>
                {channels.length > 12 && (
                  <button onClick={() => setIsChannelsModalOpen(true)} className="text-xs text-blue-600 hover:text-blue-700">View all</button>
                )}
              </div>
              <div className="space-y-2">
                {channels.map((channel) => (
                  <button
                    key={channel}
                    onClick={() => {
                      setSelectedChannel(channel);
                      setActiveTab('discussions');
                    }}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      selectedChannel === channel ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    #{channel.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'online' && (
          <div className="md:hidden">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Online - {onlineUsers.length}</h3>
                {onlineUsers.length > 12 && (
                  <button onClick={() => setIsUsersModalOpen(true)} className="text-xs text-blue-600 hover:text-blue-700">View all</button>
                )}
              </div>
              <div className="space-y-3">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                        {user.initials}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
                    </div>
                    <span className="text-sm text-gray-700">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className="space-y-3 sm:space-y-4">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white border border-gray-200 rounded-lg p-3 sm:p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* Avatar */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium text-gray-700 flex-shrink-0">
                    {discussion.initials}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title Section */}
                    <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2">
                      <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{discussion.title}</h3>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                        <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>

                    {/* Author and Topic Tag */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
                      <span className="text-xs sm:text-sm text-gray-500">
                        {discussion.author} • {discussion.time}
                      </span>
                      <span className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {discussion.topicTag}
                      </span>
                    </div>

                    {/* Category Tags */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
                      {discussion.categoryTags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Engagement Metrics */}
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{discussion.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{discussion.replies} replies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'live-chat' && (
          <div className="flex flex-col h-[calc(100vh-300px)] sm:h-[calc(100vh-250px)] max-h-[700px] bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                    {selectedChannel === 'general' ? '#' : selectedChannel.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900 text-sm sm:text-base capitalize">{selectedChannel.replace('-', ' ')}</h2>
                    <p className="text-xs sm:text-sm text-gray-500">{onlineUsers.length} members online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium text-gray-700 flex-shrink-0`}>
                    {msg.initials}
                  </div>
                  <div className={`flex-1 ${msg.isOwn ? 'flex flex-col items-end' : ''}`}>
                    <div className={`inline-block px-4 sm:px-5 py-2 sm:py-3 rounded-lg max-w-[80%] sm:max-w-[70%] ${
                      msg.isOwn
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs sm:text-sm font-medium ${msg.isOwn ? 'text-blue-100' : 'text-gray-700'}`}>
                          {msg.user}
                        </span>
                        <span className={`text-xs ${msg.isOwn ? 'text-blue-200' : 'text-gray-500'}`}>
                          {msg.time}
                        </span>
                      </div>
                      <p className={`text-sm sm:text-base ${msg.isOwn ? 'text-white' : 'text-gray-800'}`}>
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow"
              >
                {/* Top Section */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-600 flex items-center gap-1">
                      {getFileIcon(resource.type)}
                      <span>{resource.type}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">{resource.title}</h3>

                {/* Author */}
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">by {resource.author}</p>

                {/* Downloads */}
                <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{resource.downloads} downloads</p>

                {/* Download Button */}
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
          {/* Main Column end */}
        </div>
      </div>

      {/* Channels Modal */}
      {isChannelsModalOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">All Channels</h3>
              <button onClick={() => setIsChannelsModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4">
              <input
                type="text"
                value={channelsSearch}
                onChange={(e) => setChannelsSearch(e.target.value)}
                placeholder="Search channels..."
                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="max-h-80 overflow-auto space-y-1 pr-1">
                {channels
                  .filter((c) => c.toLowerCase().includes(channelsSearch.toLowerCase()))
                  .map((channel) => (
                    <button
                      key={channel}
                      onClick={() => {
                        setSelectedChannel(channel);
                        setIsChannelsModalOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-sm ${selectedChannel === channel ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'}`}
                    >
                      #{channel.replace('-', ' ')}
                    </button>
                  ))}
              </div>
            </div>
            <div className="p-4 border-t text-right">
              <button onClick={() => setIsChannelsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Users Modal */}
      {isUsersModalOpen && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-gray-900">Online Users</h3>
              <button onClick={() => setIsUsersModalOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="p-4">
              <input
                type="text"
                value={usersSearch}
                onChange={(e) => setUsersSearch(e.target.value)}
                placeholder="Search users..."
                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="max-h-80 overflow-auto space-y-2 pr-1">
                {onlineUsers
                  .filter((u) => u.name.toLowerCase().includes(usersSearch.toLowerCase()))
                  .map((user) => (
                    <div key={user.id} className="flex items-center gap-2">
                      <div className="relative">
                        <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                          {user.initials}
                        </div>
                        <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
                      </div>
                      <span className="text-sm text-gray-700">{user.name}</span>
                    </div>
                  ))}
              </div>
            </div>
            <div className="p-4 border-t text-right">
              <button onClick={() => setIsUsersModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default CommunityPage;
