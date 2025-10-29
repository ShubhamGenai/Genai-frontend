import React from 'react';
import { BuildingIcon, UsersIcon, MessageCircleIcon, TrendingUpIcon, BriefcaseIcon } from 'lucide-react';

const CompanyCommunityPage = () => {
  const posts = [
    {
      id: 1,
      title: "How to transition from startup to big tech",
      author: "Jennifer Lee",
      company: "Google",
      time: "2 hours ago",
      likes: 34,
      comments: 11,
      category: "Career Growth"
    },
    {
      id: 2,
      title: "Remote work best practices in 2024",
      author: "David Rodriguez",
      company: "Microsoft",
      time: "4 hours ago",
      likes: 28,
      comments: 7,
      category: "Work Culture"
    },
    {
      id: 3,
      title: "Building inclusive teams in tech companies",
      author: "Maria Garcia",
      company: "Meta",
      time: "6 hours ago",
      likes: 52,
      comments: 15,
      category: "Leadership"
    }
  ];

  const companies = [
    { name: "Google", members: 2100, posts: 450 },
    { name: "Microsoft", members: 1800, posts: 380 },
    { name: "Meta", members: 1650, posts: 320 },
    { name: "Amazon", members: 1950, posts: 410 },
    { name: "Apple", members: 1200, posts: 280 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <BuildingIcon className="w-8 h-8 text-blue-600" />
                Company Community
              </h1>
              <p className="text-gray-600 mt-2">Connect with professionals from leading companies</p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Share Insights
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Discussions</h2>
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
                          <span>{post.company}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
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
            {/* Top Companies */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Companies</h3>
              <div className="space-y-4">
                {companies.map((company, index) => (
                  <div key={company.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-green-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{company.name}</h4>
                        <p className="text-sm text-gray-500">{company.members} members</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{company.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Opportunities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Opportunities</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Senior Developer</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Google • Remote</p>
                  <p className="text-sm text-gray-500">Posted 2 hours ago</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <BriefcaseIcon className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Product Manager</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Microsoft • Seattle</p>
                  <p className="text-sm text-gray-500">Posted 4 hours ago</p>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Members</span>
                  <span className="font-semibold text-gray-900">18,500+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Discussions</span>
                  <span className="font-semibold text-gray-900">520</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Companies</span>
                  <span className="font-semibold text-gray-900">100+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCommunityPage;
