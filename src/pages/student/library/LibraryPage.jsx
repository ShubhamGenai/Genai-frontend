import React, { useState } from 'react';
import { Folder, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { subCategories, resources } from '../../../mock-data/libraryMockData';

const LibraryPage = () => {
  const [expandedCategories, setExpandedCategories] = useState({
    'ncert': true,
    'competitive': false,
    'professional': false,
    'study': false,
    'class8': false,
    'class9': false,
    'class10': false,
    'class11': false,
    'class12': false,
    'jee': false,
    'neet': false,
    'upsc': false,
    'webdev': false,
    'data': false,
    'ai': false,
    'notes': false,
    'guides': false
  });
  const [selectedCategory, setSelectedCategory] = useState('ncert');

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'ncert') {
      return subCategories.ncert.length; // Number of sub-categories
    }
    if (categoryId === 'competitive') {
      return subCategories.competitive.length; // Number of sub-categories
    }
    if (categoryId === 'professional') {
      return subCategories.professional.length; // Number of sub-categories
    }
    if (categoryId === 'study') {
      return subCategories.study.length; // Number of sub-categories
    }
    return resources[categoryId]?.length || 0;
  };

  const getMainCategoryName = (categoryId) => {
    const names = {
      'ncert': 'NCERT & School Books',
      'competitive': 'Competitive Exams',
      'professional': 'Professional Skills',
      'study': 'Study Materials & Notes'
    };
    return names[categoryId] || categoryId;
  };

  const getSubCategoryName = (categoryId) => {
    const allSubCategories = [
      ...subCategories.ncert,
      ...subCategories.competitive,
      ...subCategories.professional,
      ...subCategories.study
    ];
    const subCategory = allSubCategories.find(sub => sub.id === categoryId);
    return subCategory ? subCategory.name : categoryId;
  };

  const isMainCategory = (categoryId) => {
    return ['ncert', 'competitive', 'professional', 'study'].includes(categoryId);
  };

  const selectedResources = isMainCategory(selectedCategory) ? [] : (resources[selectedCategory] || []);
  const selectedSubCategories = isMainCategory(selectedCategory) ? (subCategories[selectedCategory] || []) : [];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">All Resources</h2>
          <p className="text-sm text-gray-500 mb-6">Browse by category</p>

          {/* NCERT & School Books Category */}
          <div className="mb-2">
            <button
              onClick={() => {
                toggleCategory('ncert');
                setSelectedCategory('ncert');
              }}
              className={`w-full flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedCategory === 'ncert' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {expandedCategories.ncert ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <Folder className="w-4 h-4 text-blue-600" />
                <span className={`text-sm ${selectedCategory === 'ncert' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                  NCERT & School Books
                </span>
              </div>
              <span className="text-xs text-gray-500">{getCategoryCount('ncert')}</span>
            </button>

            {expandedCategories.ncert && (
              <div className="ml-6 mt-1">
                {/* Class 8 */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('class8');
                      setSelectedCategory('class8');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'class8' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                    >
                    <div className="flex items-center gap-2">
                      {expandedCategories.class8 ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'class8' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Class 8
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.class8?.length || 0}</span>
                  </button>

                  {expandedCategories.class8 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.class8.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Class 9 */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('class9');
                      setSelectedCategory('class9');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'class9' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.class9 ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'class9' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Class 9
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.class9?.length || 0}</span>
                  </button>

                  {expandedCategories.class9 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.class9.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Class 10 */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('class10');
                      setSelectedCategory('class10');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'class10' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.class10 ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'class10' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Class 10
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.class10?.length || 0}</span>
              </button>

                  {expandedCategories.class10 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.class10.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Class 11 */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('class11');
                      setSelectedCategory('class11');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'class11' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.class11 ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'class11' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Class 11
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.class11?.length || 0}</span>
                  </button>

                  {expandedCategories.class11 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.class11.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Class 12 */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('class12');
                      setSelectedCategory('class12');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'class12' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.class12 ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'class12' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Class 12
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.class12?.length || 0}</span>
                  </button>

                  {expandedCategories.class12 && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.class12.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Competitive Exams Category */}
          <div className="mb-2">
            <button
              onClick={() => {
                toggleCategory('competitive');
                setSelectedCategory('competitive');
              }}
              className={`w-full flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedCategory === 'competitive' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {expandedCategories.competitive ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <Folder className="w-4 h-4 text-blue-600" />
                <span className={`text-sm ${selectedCategory === 'competitive' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                  Competitive Exams
                </span>
              </div>
              <span className="text-xs text-gray-500">{getCategoryCount('competitive')}</span>
            </button>

            {expandedCategories.competitive && (
              <div className="ml-6 mt-1">
                {/* JEE Preparation */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('jee');
                      setSelectedCategory('jee');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'jee' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.jee ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'jee' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        JEE Preparation
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.jee?.length || 0}</span>
                  </button>

                  {expandedCategories.jee && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.jee.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* NEET Preparation */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('neet');
                      setSelectedCategory('neet');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'neet' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.neet ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'neet' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        NEET Preparation
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.neet?.length || 0}</span>
                  </button>

                  {expandedCategories.neet && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.neet.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* UPSC */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('upsc');
                      setSelectedCategory('upsc');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'upsc' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.upsc ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'upsc' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        UPSC
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.upsc?.length || 0}</span>
                  </button>

                  {expandedCategories.upsc && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.upsc.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Professional Skills Category */}
          <div className="mb-2">
            <button
              onClick={() => {
                toggleCategory('professional');
                setSelectedCategory('professional');
              }}
              className={`w-full flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedCategory === 'professional' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {expandedCategories.professional ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <Folder className="w-4 h-4 text-blue-600" />
                <span className={`text-sm ${selectedCategory === 'professional' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                  Professional Skills
                </span>
              </div>
              <span className="text-xs text-gray-500">{getCategoryCount('professional')}</span>
            </button>

            {expandedCategories.professional && (
              <div className="ml-6 mt-1">
                {/* Web Development */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('webdev');
                      setSelectedCategory('webdev');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'webdev' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.webdev ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'webdev' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Web Development
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.webdev?.length || 0}</span>
                  </button>

                  {expandedCategories.webdev && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.webdev.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Data Science */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('data');
                      setSelectedCategory('data');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'data' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.data ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'data' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Data Science
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.data?.length || 0}</span>
                  </button>

                  {expandedCategories.data && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.data.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* AI & ML */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('ai');
                      setSelectedCategory('ai');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'ai' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.ai ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'ai' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        AI & ML
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.ai?.length || 0}</span>
                  </button>

                  {expandedCategories.ai && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.ai.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Study Materials & Notes Category */}
          <div className="mb-2">
            <button
              onClick={() => {
                toggleCategory('study');
                setSelectedCategory('study');
              }}
              className={`w-full flex items-center justify-between p-2 rounded cursor-pointer ${
                selectedCategory === 'study' ? 'bg-gray-100' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                {expandedCategories.study ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                <Folder className="w-4 h-4 text-blue-600" />
                <span className={`text-sm ${selectedCategory === 'study' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                  Study Materials & Notes
                </span>
              </div>
              <span className="text-xs text-gray-500">{getCategoryCount('study')}</span>
            </button>

            {expandedCategories.study && (
              <div className="ml-6 mt-1">
                {/* Study Notes */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('notes');
                      setSelectedCategory('notes');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'notes' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.notes ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'notes' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Study Notes
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.notes?.length || 0}</span>
                  </button>

                  {expandedCategories.notes && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.notes.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Exam Guides */}
                <div className="mb-1">
                  <button
                    onClick={() => {
                      toggleCategory('guides');
                      setSelectedCategory('guides');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded ${
                      selectedCategory === 'guides' ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {expandedCategories.guides ? (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      )}
                      <Folder className="w-4 h-4 text-blue-600" />
                      <span className={`text-sm ${selectedCategory === 'guides' ? 'font-semibold' : 'font-medium'} text-gray-700`}>
                        Exam Guides
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{resources.guides?.length || 0}</span>
                  </button>

                  {expandedCategories.guides && (
                    <div className="ml-6 mt-1 space-y-1">
                      {resources.guides.map((resource) => (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-4 h-4 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-500'}`} />
                          <span className="text-sm text-gray-600 flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">Free</span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">{resource.price}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {isMainCategory(selectedCategory) 
                ? getMainCategoryName(selectedCategory)
                : getSubCategoryName(selectedCategory)}
            </h1>
            <p className="text-sm text-gray-500">
              {isMainCategory(selectedCategory) 
                ? `${selectedSubCategories.length} items` 
                : `${selectedResources.length} items`}
            </p>
          </div>

          {/* Folder Cards Grid (when main category is selected) */}
          {isMainCategory(selectedCategory) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {selectedSubCategories.map((subCategory) => (
                <div
                  key={subCategory.id}
                  onClick={() => setSelectedCategory(subCategory.id)}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center"
                >
                  {/* Folder Icon */}
                  <div className="flex justify-center mb-4">
                    <Folder className="w-16 h-16 text-blue-600" />
                  </div>

                  {/* Sub-category Name */}
                  <h3 className="font-semibold text-gray-900 text-base mb-2">{subCategory.name}</h3>

                  {/* Item Count */}
                  <p className="text-sm text-gray-500">{subCategory.count} items</p>
                </div>
              ))}
            </div>
          )}

          {/* Resource Grid (when sub-category is selected) */}
          {!isMainCategory(selectedCategory) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {selectedResources.map((resource) => (
                <div
                  key={resource.id}
                  onClick={() => navigate(`/library/details/${resource.id}`)}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  {/* Document Icon */}
                  <div className="flex justify-center mb-4">
                    <FileText
                      className={`w-16 h-16 ${
                        resource.iconColor === 'orange' ? 'text-orange-500' : 'text-gray-400'
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{resource.title}</h3>

                  {/* Subtitle */}
                  <p className="text-xs text-gray-500 mb-4">{resource.subtitle}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500">{resource.size}</span>
                    {resource.price === "Free" ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Free</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">{resource.price}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
