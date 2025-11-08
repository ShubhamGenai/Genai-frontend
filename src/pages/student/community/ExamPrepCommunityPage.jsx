import React from 'react';
import { FileTextIcon, UsersIcon, MessageCircleIcon, TrendingUpIcon, BookOpenIcon } from 'lucide-react';

const ExamPrepCommunityPage = () => {
  const posts = [
    {
      id: 1,
      title: "JEE Main 2024 preparation strategy",
      author: "Rahul Sharma",
      exam: "JEE Main",
      time: "1 hour ago",
      likes: 45,
      comments: 12,
      category: "Strategy"
    },
    {
      id: 2,
      title: "NEET Biology important topics",
      author: "Priya Patel",
      exam: "NEET",
      time: "3 hours ago",
      likes: 38,
      comments: 9,
      category: "Study Material"
    },
    {
      id: 3,
      title: "GATE CS preparation timeline",
      author: "Amit Kumar",
      exam: "GATE",
      time: "5 hours ago",
      likes: 52,
      comments: 15,
      category: "Planning"
    }
  ];

  const exams = [
    { name: "JEE Main", members: 8500, posts: 1200 },
    { name: "NEET", members: 7200, posts: 980 },
    { name: "GATE", members: 4500, posts: 650 },
    { name: "UPSC", members: 3800, posts: 520 },
    { name: "CAT", members: 2900, posts: 420 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
    <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <FileTextIcon className="w-8 h-8 text-blue-600" />
                Exam Prep Community
              </h1>
              <p className="text-gray-600 mt-2">Prepare for competitive exams with fellow aspirants</p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Share Tips
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Discussions</h2>
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
                          <span>{post.exam}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
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
            {/* Popular Exams */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Exams</h3>
              <div className="space-y-4">
                {exams.map((exam, index) => (
                  <div key={exam.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{exam.name}</h4>
                        <p className="text-sm text-gray-500">{exam.members} aspirants</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{exam.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Resources */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Resources</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpenIcon className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">JEE Main Mock Tests</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">50+ practice tests available</p>
                  <p className="text-sm text-gray-500">Updated daily</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpenIcon className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">NEET Question Bank</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">1000+ questions with solutions</p>
                  <p className="text-sm text-gray-500">Subject-wise organization</p>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Aspirants</span>
                  <span className="font-semibold text-gray-900">25,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Discussions</span>
                  <span className="font-semibold text-gray-900">680</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Exams Covered</span>
                  <span className="font-semibold text-gray-900">15+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPrepCommunityPage;
