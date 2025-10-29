import React from 'react';
import { UsersIcon, MessageCircleIcon, TrendingUpIcon, CalendarIcon, MapPinIcon } from 'lucide-react';

const CommunityPage = () => {
  const communities = [
    {
      id: 1,
      name: "Web Developers Hub",
      members: 12500,
      posts: 2340,
      category: "Development",
      description: "Connect with fellow web developers, share projects, and get help with coding challenges.",
      image: "/public/community/web-dev.jpg",
      trending: true
    },
    {
      id: 2,
      name: "Data Science Enthusiasts",
      members: 8900,
      posts: 1560,
      category: "Data Science",
      description: "Discuss machine learning, data analysis, and AI trends with like-minded professionals.",
      image: "/public/community/data-science.jpg",
      trending: false
    },
    {
      id: 3,
      name: "Design Community",
      members: 6700,
      posts: 1890,
      category: "Design",
      description: "Share design inspiration, get feedback on your work, and learn from industry experts.",
      image: "/public/community/design.jpg",
      trending: true
    },
    {
      id: 4,
      name: "Startup Founders",
      members: 4500,
      posts: 980,
      category: "Entrepreneurship",
      description: "Network with fellow entrepreneurs, share experiences, and find potential collaborators.",
      image: "/public/community/startup.jpg",
      trending: false
    },
    {
      id: 5,
      name: "AI & Machine Learning",
      members: 11200,
      posts: 2100,
      category: "AI/ML",
      description: "Stay updated with the latest AI developments and discuss cutting-edge research.",
      image: "/public/community/ai-ml.jpg",
      trending: true
    },
    {
      id: 6,
      name: "Career Growth",
      members: 15600,
      posts: 3200,
      category: "Career",
      description: "Get career advice, share job opportunities, and discuss professional development.",
      image: "/public/community/career.jpg",
      trending: false
    }
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Best practices for React performance optimization",
      author: "Sarah Johnson",
      community: "Web Developers Hub",
      time: "2 hours ago",
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: "New Python libraries for data visualization",
      author: "Mike Chen",
      community: "Data Science Enthusiasts",
      time: "4 hours ago",
      likes: 32,
      comments: 8
    },
    {
      id: 3,
      title: "UI/UX trends for 2024",
      author: "Emma Davis",
      community: "Design Community",
      time: "6 hours ago",
      likes: 67,
      comments: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <UsersIcon className="w-8 h-8 text-blue-600" />
                Community
              </h1>
              <p className="text-gray-600 mt-2">Connect, learn, and grow with our vibrant community</p>
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Create Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Communities Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Popular Communities</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communities.map((community) => (
                <div key={community.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <UsersIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{community.name}</h3>
                        <p className="text-sm text-gray-500">{community.category}</p>
                      </div>
                    </div>
                    {community.trending && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full flex items-center gap-1">
                        <TrendingUpIcon className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{community.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span>{community.members.toLocaleString()} members</span>
                      <span>{community.posts.toLocaleString()} posts</span>
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Join Community
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Posts</h3>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <h4 className="font-medium text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.community}</span>
                      </div>
                      <span>{post.time}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MessageCircleIcon className="w-4 h-4" />
                        {post.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUpIcon className="w-4 h-4" />
                        {post.likes}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Web Dev Meetup</h4>
                    <p className="text-sm text-gray-500">Tomorrow, 6:00 PM</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      Online Event
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI Workshop</h4>
                    <p className="text-sm text-gray-500">Friday, 2:00 PM</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      Conference Room A
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
