import React, { useState, useEffect } from 'react';
import { Folder, FileText, ChevronDown, ChevronRight, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USERENDPOINTS } from '../../../constants/ApiConstants';

const LibraryPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetchLibraryDocuments();
  }, []);

  const fetchLibraryDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(USERENDPOINTS.GET_LIBRARY_DOCUMENTS);
      if (res.data && res.data.success && res.data.documents) {
        setDocuments(res.data.documents);
      } else {
        setDocuments([]);
      }
    } catch (err) {
      console.error('Failed to fetch library documents:', err);
      setError('Failed to load library documents. Please try again.');
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Organize documents by class and category
  const organizeDocuments = () => {
    const organized = {
      ncert: {
        class8: [],
        class9: [],
        class10: [],
        class11: [],
        class12: []
      },
      competitive: {
        jee: [],
        neet: [],
        upsc: []
      },
      professional: {
        webdev: [],
        data: [],
        ai: []
      },
      study: {
        notes: [],
        guides: []
      }
    };

    documents.forEach(doc => {
      const docClass = doc.class?.toLowerCase() || '';
      const category = doc.category?.toLowerCase() || '';

      // Map to NCERT classes
      if (docClass.includes('class 8') || docClass.includes('class8')) {
        organized.ncert.class8.push(doc);
      } else if (docClass.includes('class 9') || docClass.includes('class9')) {
        organized.ncert.class9.push(doc);
      } else if (docClass.includes('class 10') || docClass.includes('class10')) {
        organized.ncert.class10.push(doc);
      } else if (docClass.includes('class 11') || docClass.includes('class11')) {
        organized.ncert.class11.push(doc);
      } else if (docClass.includes('class 12') || docClass.includes('class12')) {
        organized.ncert.class12.push(doc);
      }

      // Map to competitive exams
      if (category.includes('jee') || category.includes('engineering')) {
        organized.competitive.jee.push(doc);
      } else if (category.includes('neet') || category.includes('medical')) {
        organized.competitive.neet.push(doc);
      } else if (category.includes('upsc') || category.includes('civil')) {
        organized.competitive.upsc.push(doc);
      }

      // Map to professional skills
      if (category.includes('web') || category.includes('frontend') || category.includes('backend')) {
        organized.professional.webdev.push(doc);
      } else if (category.includes('data') || category.includes('analytics')) {
        organized.professional.data.push(doc);
      } else if (category.includes('ai') || category.includes('machine learning') || category.includes('ml')) {
        organized.professional.ai.push(doc);
      }

      // Map to study materials
      if (category.includes('note') || category.includes('study')) {
        organized.study.notes.push(doc);
      } else if (category.includes('guide') || category.includes('preparation')) {
        organized.study.guides.push(doc);
      }
    });

    return organized;
  };

  const organizedDocs = organizeDocuments();

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'ncert') {
      return Object.keys(organizedDocs.ncert).filter(key => organizedDocs.ncert[key].length > 0).length;
    }
    if (categoryId === 'competitive') {
      return Object.keys(organizedDocs.competitive).filter(key => organizedDocs.competitive[key].length > 0).length;
    }
    if (categoryId === 'professional') {
      return Object.keys(organizedDocs.professional).filter(key => organizedDocs.professional[key].length > 0).length;
    }
    if (categoryId === 'study') {
      return Object.keys(organizedDocs.study).filter(key => organizedDocs.study[key].length > 0).length;
    }
    // For sub-categories, return document count
    if (organizedDocs.ncert[categoryId]) {
      return organizedDocs.ncert[categoryId].length;
    }
    if (organizedDocs.competitive[categoryId]) {
      return organizedDocs.competitive[categoryId].length;
    }
    if (organizedDocs.professional[categoryId]) {
      return organizedDocs.professional[categoryId].length;
    }
    if (organizedDocs.study[categoryId]) {
      return organizedDocs.study[categoryId].length;
    }
    return 0;
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
    const names = {
      'class8': 'Class 8',
      'class9': 'Class 9',
      'class10': 'Class 10',
      'class11': 'Class 11',
      'class12': 'Class 12',
      'jee': 'JEE Preparation',
      'neet': 'NEET Preparation',
      'upsc': 'UPSC',
      'webdev': 'Web Development',
      'data': 'Data Science',
      'ai': 'AI & ML',
      'notes': 'Study Notes',
      'guides': 'Exam Guides'
    };
    return names[categoryId] || categoryId;
  };

  const isMainCategory = (categoryId) => {
    return ['ncert', 'competitive', 'professional', 'study'].includes(categoryId);
  };

  const getSelectedResources = () => {
    if (isMainCategory(selectedCategory)) {
      return [];
    }
    if (organizedDocs.ncert[selectedCategory]) {
      return organizedDocs.ncert[selectedCategory];
    }
    if (organizedDocs.competitive[selectedCategory]) {
      return organizedDocs.competitive[selectedCategory];
    }
    if (organizedDocs.professional[selectedCategory]) {
      return organizedDocs.professional[selectedCategory];
    }
    if (organizedDocs.study[selectedCategory]) {
      return organizedDocs.study[selectedCategory];
    }
    return [];
  };

  const getSelectedSubCategories = () => {
    if (!isMainCategory(selectedCategory)) {
      return [];
    }
    if (selectedCategory === 'ncert') {
      return ['class8', 'class9', 'class10', 'class11', 'class12'].filter(key => organizedDocs.ncert[key].length > 0);
    }
    if (selectedCategory === 'competitive') {
      return ['jee', 'neet', 'upsc'].filter(key => organizedDocs.competitive[key].length > 0);
    }
    if (selectedCategory === 'professional') {
      return ['webdev', 'data', 'ai'].filter(key => organizedDocs.professional[key].length > 0);
    }
    if (selectedCategory === 'study') {
      return ['notes', 'guides'].filter(key => organizedDocs.study[key].length > 0);
    }
    return [];
  };

  const selectedResources = getSelectedResources();
  const selectedSubCategories = getSelectedSubCategories();

  const navigate = useNavigate();

  // Helper function to get resources for a category
  const getResourcesForCategory = (categoryId) => {
    if (organizedDocs.ncert[categoryId]) {
      return organizedDocs.ncert[categoryId];
    }
    if (organizedDocs.competitive[categoryId]) {
      return organizedDocs.competitive[categoryId];
    }
    if (organizedDocs.professional[categoryId]) {
      return organizedDocs.professional[categoryId];
    }
    if (organizedDocs.study[categoryId]) {
      return organizedDocs.study[categoryId];
    }
    return [];
  };

  // Map document to UI format
  const mapDocumentToResource = (doc) => {
    const isFree = !doc.price || !doc.price.discounted || Number(doc.price.discounted) === 0;
    return {
      id: doc._id,
      title: doc.name || 'Library Document',
      subtitle: doc.category || 'Library',
      size: doc.fileSize ? `${(doc.fileSize / (1024 * 1024)).toFixed(1)} MB` : '—',
      price: isFree ? 'Free' : `₹${Number(doc.price.discounted)}`,
      iconColor: isFree ? 'gray' : 'orange'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
          <p className="text-gray-600 text-sm">Loading library...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-md">
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchLibraryDocuments}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-60 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-3">
          <h2 className="text-sm font-normal text-black mb-1">All Resources</h2>
          <p className="text-xs text-black mb-3">Browse by category</p>

          {/* NCERT & School Books Category */}
          <div className="mb-0.5">
            <button
              onClick={() => {
                toggleCategory('ncert');
                setSelectedCategory('ncert');
              }}
              className={`w-full flex items-center justify-between p-1 rounded cursor-pointer ${selectedCategory === 'ncert' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-1">
                {expandedCategories.ncert ? (
                  <ChevronDown className="w-2.5 h-2.5 text-black" />
                ) : (
                  <ChevronRight className="w-2.5 h-2.5 text-black" />
                )}
                <Folder className="w-2.5 h-2.5 text-blue-600" />
                <span className={`text-xs ${selectedCategory === 'ncert' ? 'font-medium' : 'font-normal'} text-black`}>
                  NCERT & School Books
                </span>
              </div>
              <span className="text-xs text-black">{getCategoryCount('ncert')}</span>
            </button>

            {expandedCategories.ncert && (
              <div className="ml-3 mt-0.5">
                {/* Class 8 */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('class8');
                      setSelectedCategory('class8');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'class8' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                    <div className="flex items-center gap-1">
                      {expandedCategories.class8 ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'class8' ? 'font-medium' : 'font-normal'} text-black`}>
                        Class 8
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('class8').length}</span>
                  </button>

                  {expandedCategories.class8 && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {organizedDocs.ncert.class8.length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        organizedDocs.ncert.class8.map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                            <div
                              key={resource.id}
                              onClick={() => navigate(`/library/details/${resource.id}`)}
                              className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                              <span className="text-xs text-black flex-1">{resource.title}</span>
                              {resource.price === "Free" ? (
                                <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                              ) : (
                                <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* Class 9 */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('class9');
                      setSelectedCategory('class9');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'class9' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.class9 ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'class9' ? 'font-medium' : 'font-normal'} text-black`}>
                        Class 9
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('class9').length}</span>
                  </button>

                  {expandedCategories.class9 && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('class9').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('class9').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                          <span className="text-xs text-black flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                          ) : (
                            <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                          )}
                        </div>
                      );
                    })
                  )}
                    </div>
                  )}
                </div>

                {/* Class 11 */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('class11');
                      setSelectedCategory('class11');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'class11' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.class11 ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'class11' ? 'font-medium' : 'font-normal'} text-black`}>
                        Class 11
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('class11').length}</span>
                  </button>

                  {expandedCategories.class11 && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('class11').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('class11').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                            <div
                              key={resource.id}
                              onClick={() => navigate(`/library/details/${resource.id}`)}
                              className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                              <span className="text-xs text-black flex-1">{resource.title}</span>
                              {resource.price === "Free" ? (
                                <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                              ) : (
                                <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* Class 12 */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('class12');
                      setSelectedCategory('class12');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'class12' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.class12 ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'class12' ? 'font-medium' : 'font-normal'} text-black`}>
                        Class 12
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('class12').length}</span>
                  </button>

                  {expandedCategories.class12 && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('class12').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('class12').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                        <div
                          key={resource.id}
                          onClick={() => navigate(`/library/details/${resource.id}`)}
                          className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                        >
                          <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                          <span className="text-xs text-black flex-1">{resource.title}</span>
                          {resource.price === "Free" ? (
                            <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                          ) : (
                            <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                          )}
                        </div>
                      );
                    })
                  )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Competitive Exams Category */}
          <div className="mb-0.5">
            <button
              onClick={() => {
                toggleCategory('competitive');
                setSelectedCategory('competitive');
              }}
              className={`w-full flex items-center justify-between p-1 rounded cursor-pointer ${selectedCategory === 'competitive' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-1">
                {expandedCategories.competitive ? (
                  <ChevronDown className="w-2.5 h-2.5 text-black" />
                ) : (
                  <ChevronRight className="w-2.5 h-2.5 text-black" />
                )}
                <Folder className="w-2.5 h-2.5 text-blue-600" />
                <span className={`text-xs ${selectedCategory === 'competitive' ? 'font-medium' : 'font-normal'} text-black`}>
                  Competitive Exams
                </span>
              </div>
              <span className="text-xs text-black">{getCategoryCount('competitive')}</span>
            </button>

            {expandedCategories.competitive && (
              <div className="ml-3 mt-0.5">
                {/* JEE Preparation */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('jee');
                      setSelectedCategory('jee');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'jee' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.jee ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'jee' ? 'font-medium' : 'font-normal'} text-black`}>
                        JEE Preparation
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('jee').length}</span>
                  </button>

                  {expandedCategories.jee && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('jee').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('jee').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                            <div
                              key={resource.id}
                              onClick={() => navigate(`/library/details/${resource.id}`)}
                              className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                              <span className="text-xs text-black flex-1">{resource.title}</span>
                              {resource.price === "Free" ? (
                                <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                              ) : (
                                <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* NEET Preparation */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('neet');
                      setSelectedCategory('neet');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'neet' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.neet ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'neet' ? 'font-medium' : 'font-normal'} text-black`}>
                        NEET Preparation
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('neet').length}</span>
                  </button>

                  {expandedCategories.neet && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('neet').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('neet').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                            <div
                              key={resource.id}
                              onClick={() => navigate(`/library/details/${resource.id}`)}
                              className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                              <span className="text-xs text-black flex-1">{resource.title}</span>
                              {resource.price === "Free" ? (
                                <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                              ) : (
                                <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* UPSC */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('upsc');
                      setSelectedCategory('upsc');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'upsc' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.upsc ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'upsc' ? 'font-medium' : 'font-normal'} text-black`}>
                        UPSC
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('upsc').length}</span>
                  </button>

                  {expandedCategories.upsc && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('upsc').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('upsc').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                            <div
                              key={resource.id}
                              onClick={() => navigate(`/library/details/${resource.id}`)}
                              className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                              <span className="text-xs text-black flex-1">{resource.title}</span>
                              {resource.price === "Free" ? (
                                <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                              ) : (
                                <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Professional Skills Category */}
          <div className="mb-0.5">
            <button
              onClick={() => {
                toggleCategory('professional');
                setSelectedCategory('professional');
              }}
              className={`w-full flex items-center justify-between p-1 rounded cursor-pointer ${selectedCategory === 'professional' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-1">
                {expandedCategories.professional ? (
                  <ChevronDown className="w-2.5 h-2.5 text-black" />
                ) : (
                  <ChevronRight className="w-2.5 h-2.5 text-black" />
                )}
                <Folder className="w-2.5 h-2.5 text-blue-600" />
                <span className={`text-xs ${selectedCategory === 'professional' ? 'font-medium' : 'font-normal'} text-black`}>
                  Professional Skills
                </span>
              </div>
              <span className="text-xs text-black">{getCategoryCount('professional')}</span>
            </button>

            {expandedCategories.professional && (
              <div className="ml-3 mt-0.5">
                {/* Web Development */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('webdev');
                      setSelectedCategory('webdev');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'webdev' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.webdev ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'webdev' ? 'font-medium' : 'font-normal'} text-black`}>
                        Web Development
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('webdev').length}</span>
                  </button>

                  {expandedCategories.webdev && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('webdev').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('webdev').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                            <div
                              key={resource.id}
                              onClick={() => navigate(`/library/details/${resource.id}`)}
                              className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                              <span className="text-xs text-black flex-1">{resource.title}</span>
                              {resource.price === "Free" ? (
                                <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                              ) : (
                                <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* Data Science */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('data');
                      setSelectedCategory('data');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'data' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.data ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'data' ? 'font-medium' : 'font-normal'} text-black`}>
                        Data Science
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('data').length}</span>
                  </button>

                  {expandedCategories.data && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('data').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('data').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                            <div
                              key={resource.id}
                              onClick={() => navigate(`/library/details/${resource.id}`)}
                              className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                              <span className="text-xs text-black flex-1">{resource.title}</span>
                              {resource.price === "Free" ? (
                                <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                              ) : (
                                <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* AI & ML */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('ai');
                      setSelectedCategory('ai');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'ai' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.ai ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'ai' ? 'font-medium' : 'font-normal'} text-black`}>
                        AI & ML
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('ai').length}</span>
                  </button>

                  {expandedCategories.ai && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('ai').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('ai').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                            <div
                              key={resource.id}
                              onClick={() => navigate(`/library/details/${resource.id}`)}
                              className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                              <span className="text-xs text-black flex-1">{resource.title}</span>
                              {resource.price === "Free" ? (
                                <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                              ) : (
                                <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Study Materials & Notes Category */}
          <div className="mb-0.5">
            <button
              onClick={() => {
                toggleCategory('study');
                setSelectedCategory('study');
              }}
              className={`w-full flex items-center justify-between p-1 rounded cursor-pointer ${selectedCategory === 'study' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-1">
                {expandedCategories.study ? (
                  <ChevronDown className="w-2.5 h-2.5 text-black" />
                ) : (
                  <ChevronRight className="w-2.5 h-2.5 text-black" />
                )}
                <Folder className="w-2.5 h-2.5 text-blue-600" />
                <span className={`text-xs ${selectedCategory === 'study' ? 'font-medium' : 'font-normal'} text-black`}>
                  Study Materials & Notes
                </span>
              </div>
              <span className="text-xs text-black">{getCategoryCount('study')}</span>
            </button>

            {expandedCategories.study && (
              <div className="ml-3 mt-0.5">
                {/* Study Notes */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('notes');
                      setSelectedCategory('notes');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'notes' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.notes ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'notes' ? 'font-medium' : 'font-normal'} text-black`}>
                        Study Notes
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('notes').length}</span>
                  </button>

                  {expandedCategories.notes && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('notes').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('notes').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                            <div
                              key={resource.id}
                              onClick={() => navigate(`/library/details/${resource.id}`)}
                              className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                              <span className="text-xs text-black flex-1">{resource.title}</span>
                              {resource.price === "Free" ? (
                                <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                              ) : (
                                <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* Exam Guides */}
                <div className="mb-0.5">
                  <button
                    onClick={() => {
                      toggleCategory('guides');
                      setSelectedCategory('guides');
                    }}
                    className={`w-full flex items-center justify-between p-1 rounded ${selectedCategory === 'guides' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-1">
                      {expandedCategories.guides ? (
                        <ChevronDown className="w-2.5 h-2.5 text-black" />
                      ) : (
                        <ChevronRight className="w-2.5 h-2.5 text-black" />
                      )}
                      <Folder className="w-2.5 h-2.5 text-blue-600" />
                      <span className={`text-xs ${selectedCategory === 'guides' ? 'font-medium' : 'font-normal'} text-black`}>
                        Exam Guides
                      </span>
                    </div>
                    <span className="text-xs text-black">{getResourcesForCategory('guides').length}</span>
                  </button>

                  {expandedCategories.guides && (
                    <div className="ml-3 mt-0.5 space-y-0.5">
                      {getResourcesForCategory('guides').length === 0 ? (
                        <div className="text-xs text-gray-500 p-1">No documents available</div>
                      ) : (
                        getResourcesForCategory('guides').map((doc) => {
                          const resource = mapDocumentToResource(doc);
                          return (
                            <div
                              key={resource.id}
                              onClick={() => navigate(`/library/details/${resource.id}`)}
                              className="flex items-center gap-1 p-1 hover:bg-gray-50 rounded cursor-pointer"
                            >
                              <FileText className={`w-2.5 h-2.5 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`} />
                              <span className="text-xs text-black flex-1">{resource.title}</span>
                              {resource.price === "Free" ? (
                                <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                              ) : (
                                <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                              )}
                            </div>
                          );
                        })
                      )}
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
        <div className="p-3">
          {/* Header */}
          <div className="mb-3">
            <h1 className="text-base font-normal text-black mb-0.5">
              {isMainCategory(selectedCategory) 
                ? getMainCategoryName(selectedCategory)
                : getSubCategoryName(selectedCategory)}
            </h1>
            <p className="text-xs text-black">
              {isMainCategory(selectedCategory) 
                ? `${selectedSubCategories.length} items` 
                : `${selectedResources.length} items`}
            </p>
          </div>

          {/* Folder Cards Grid (when main category is selected) */}
          {isMainCategory(selectedCategory) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {selectedSubCategories.length === 0 ? (
                <div className="text-sm text-gray-500 col-span-full text-center py-8">No categories available</div>
              ) : (
                selectedSubCategories.map((subCategoryId) => (
                  <div
                    key={subCategoryId}
                    onClick={() => setSelectedCategory(subCategoryId)}
                    className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center"
                  >
                    {/* Folder Icon */}
                    <div className="flex justify-center mb-2">
                      <Folder className="w-8 h-8 text-blue-600" />
                    </div>

                    {/* Sub-category Name */}
                    <h3 className="font-normal text-black text-xs mb-1">{getSubCategoryName(subCategoryId)}</h3>

                    {/* Item Count */}
                    <p className="text-xs text-black">{getResourcesForCategory(subCategoryId).length} items</p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Resource Grid (when sub-category is selected) */}
          {!isMainCategory(selectedCategory) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {selectedResources.length === 0 ? (
                <div className="text-sm text-gray-500 col-span-full text-center py-8">No documents available</div>
              ) : (
                selectedResources.map((doc) => {
                  const resource = mapDocumentToResource(doc);
                  return (
                    <div
                      key={resource.id}
                      onClick={() => navigate(`/library/details/${resource.id}`)}
                      className="bg-white border border-gray-200 rounded-lg p-2.5 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      {/* Document Icon */}
                      <div className="flex justify-center mb-2">
                        <FileText
                          className={`w-8 h-8 ${resource.iconColor === 'orange' ? 'text-orange-500' : 'text-black'}`}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="font-normal text-black text-xs mb-0.5 line-clamp-2">{resource.title}</h3>

                      {/* Subtitle */}
                      <p className="text-xs text-black mb-2">{resource.subtitle}</p>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-black">{resource.size}</span>
                        {resource.price === "Free" ? (
                          <span className="text-xs px-1 py-0.5 bg-green-100 text-green-700 rounded-full font-normal">Free</span>
                        ) : (
                          <span className="text-xs px-1 py-0.5 bg-orange-100 text-orange-700 rounded-full font-normal">{resource.price}</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
