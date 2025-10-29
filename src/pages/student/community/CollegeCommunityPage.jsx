import React from 'react';
import { GraduationCapIcon, UsersIcon, MessageCircleIcon, TrendingUpIcon, CalendarIcon } from 'lucide-react';

const CollegeCommunityPage = () => {
  const posts = [
    {
      id: 1,
      title: "Best study techniques for college students",
      author: "Alex Thompson",
      college: "MIT",
      time: "1 hour ago",
      likes: 23,
      comments: 8,
      category: "Study Tips"
    },
    {
      id: 2,
      title: "How to balance academics and extracurriculars",
      author: "Sarah Wilson",
      college: "Stanford",
      time: "3 hours ago",
      likes: 45,
      comments: 12,
      category: "Life Balance"
    },
    {
      id: 3,
      title: "Internship opportunities for CS students",
      author: "Mike Chen",
      college: "UC Berkeley",
      time: "5 hours ago",
      likes: 67,
      comments: 19,
      category: "Career"
    }
  ];

  const colleges = [
    { name: "MIT", members: 1250, posts: 340 },
    { name: "Stanford", members: 980, posts: 280 },
    { name: "UC Berkeley", members: 1100, posts: 320 },
    { name: "Harvard", members: 890, posts: 250 },
    { name: "CMU", members: 750, posts: 200 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <GraduationCapIcon className="w-8 h-8 text-blue-600" />
                College Community
              </h1>
              <p className="text-gray-600 mt-2">Connect with students from top universities worldwide</p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Share Experience
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Discussions</h2>
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.college}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MessageCircleIcon className="w-4 h-4" />
                        {post.comments} comments
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUpIcon className="w-4 h-4" />
                        {post.likes} likes
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Colleges */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Colleges</h3>
              <div className="space-y-4">
                {colleges.map((college, index) => (
                  <div key={college.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{college.name}</h4>
                        <p className="text-sm text-gray-500">{college.members} members</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{college.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-semibold text-gray-900">12,500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Discussions</span>
                  <span className="font-semibold text-gray-900">340</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Universities</span>
                  <span className="font-semibold text-gray-900">50+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCommunityPage;
