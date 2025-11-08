import React from 'react';
import { AwardIcon, UsersIcon, MessageCircleIcon, TrendingUpIcon, StarIcon } from 'lucide-react';

const SkillsCommunityPage = () => {
  const posts = [
    {
      id: 1,
      title: "How to master React hooks in 30 days",
      author: "Alex Johnson",
      skill: "React",
      time: "2 hours ago",
      likes: 67,
      comments: 18,
      category: "Tutorial"
    },
    {
      id: 2,
      title: "Python data structures every developer should know",
      author: "Sarah Chen",
      skill: "Python",
      time: "4 hours ago",
      likes: 45,
      comments: 12,
      category: "Learning Path"
    },
    {
      id: 3,
      title: "Building scalable microservices with Node.js",
      author: "Mike Rodriguez",
      skill: "Node.js",
      time: "6 hours ago",
      likes: 89,
      comments: 23,
      category: "Advanced"
    }
  ];

  const skills = [
    { name: "JavaScript", members: 12000, posts: 1800 },
    { name: "Python", members: 9800, posts: 1450 },
    { name: "React", members: 8500, posts: 1200 },
    { name: "Node.js", members: 7200, posts: 980 },
    { name: "Machine Learning", members: 6500, posts: 850 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
    <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <AwardIcon className="w-8 h-8 text-blue-600" />
                Skills Community
              </h1>
              <p className="text-gray-600 mt-2">Learn and master new skills with expert guidance</p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Share Knowledge
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skill Discussions</h2>
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
                          <span>{post.skill}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
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
            {/* Popular Skills */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-orange-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{skill.name}</h4>
                        <p className="text-sm text-gray-500">{skill.members} learners</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{skill.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Challenges */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Challenges</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <h4 className="font-medium text-gray-900">30-Day JavaScript Challenge</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Build a project every day</p>
                  <p className="text-sm text-gray-500">1,250 participants</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <h4 className="font-medium text-gray-900">Python Data Science Sprint</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Complete 5 projects in 2 weeks</p>
                  <p className="text-sm text-gray-500">890 participants</p>
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Learners</span>
                  <span className="font-semibold text-gray-900">35,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Discussions</span>
                  <span className="font-semibold text-gray-900">920</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Skills Covered</span>
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

export default SkillsCommunityPage;
