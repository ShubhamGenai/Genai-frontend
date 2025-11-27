import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { CONTENTMANAGER } from "../../../constants/ApiConstants";
import ModalWrapper from "./ModalWrapper"; 
 
const AddModuleModal = ({ isOpen, onClose, onSave }) => { 
  const [title, setTitle] = useState(""); 
  const [availableLessons, setAvailableLessons] = useState([]);
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [isLoadingLessons, setIsLoadingLessons] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch lessons when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchLessons();
    }
  }, [isOpen]);

  const fetchLessons = async () => {
    setIsLoadingLessons(true);
    try {
      const response = await axios.get(CONTENTMANAGER.GET_LESSONS);
      // Handle direct array response or nested lessons property
      const lessons = Array.isArray(response.data) ? response.data : response.data.lessons || [];
      setAvailableLessons(lessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      alert("Failed to load lessons. Please try again.");
    } finally {
      setIsLoadingLessons(false);
    }
  };

  // Filter lessons based on search term
  const filteredLessons = availableLessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLessonToggle = (lesson) => {
    setSelectedLessons(prev => {
      const isSelected = prev.some(selected => selected._id === lesson._id);
      if (isSelected) {
        return prev.filter(selected => selected._id !== lesson._id);
      } else {
        return [...prev, lesson];
      }
    });
  };

  const handleSave = async () => { 
    if (!title.trim()) {
      alert("Please enter a module title");
      return;
    }

    if (selectedLessons.length === 0) {
      alert("Please select at least one lesson");
      return;
    }

    setIsLoading(true);

    // Send only title and lesson IDs to backend
    const moduleData = { 
      title: title.trim(), 
      lessonIds: selectedLessons.map(lesson => lesson._id) // Send only lesson IDs
    }; 

    console.log("Sending module data:", moduleData); // Debug log
 
    try { 
      const response = await axios.post(CONTENTMANAGER.ADD_MODULE, moduleData);
      
      console.log("Backend response:", response.data); // Debug log
 
      // Call onSave with the response from backend 
      onSave(response.data.module || response.data); 
      
      // Reset form
      setTitle(""); 
      setSelectedLessons([]);
      setSearchTerm("");
      onClose(); // close modal after save 
    } catch (error) { 
      console.error("Error saving module:", error);
      console.error("Error details:", error.response?.data); // More detailed error logging
      alert(`Failed to save module: ${error.response?.data?.error || error.message}`); 
    } finally {
      setIsLoading(false);
    }
  }; 

  const handleClose = () => {
    setTitle("");
    setSelectedLessons([]);
    setSearchTerm("");
    onClose();
  };
 
  return ( 
    <ModalWrapper isOpen={isOpen} onClose={handleClose}> 
      <div className="max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Add New Module</h2> 
   
        {/* Module Title */}
        <div className="mb-6">
          <label className="block text-base font-bold text-slate-300 mb-2">
            Module Title *
          </label> 
          <input 
            type="text" 
            className="w-full bg-slate-700/40 border border-slate-600/30 rounded-xl px-5 py-3 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter module title"
          /> 
        </div>

        {/* Lessons Selection */}
        <div className="mb-6">
          <label className="block text-base font-bold text-slate-300 mb-3">
            Select Lessons * ({selectedLessons.length} selected)
          </label>

          {/* Search Lessons */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search lessons..."
              className="w-full bg-slate-700/40 border border-slate-600/30 rounded-xl px-5 py-3 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Lessons List */}
          <div className="border border-slate-600/30 rounded-xl max-h-64 overflow-y-auto bg-slate-700/20">
            {isLoadingLessons ? (
              <div className="p-4 text-center text-slate-400">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 mx-auto mb-2"></div>
                Loading lessons...
              </div>
            ) : filteredLessons.length === 0 ? (
              <div className="p-4 text-center text-slate-400 text-base">
                {searchTerm ? "No lessons found matching your search" : "No lessons available"}
              </div>
            ) : (
              <div className="space-y-2 p-2">
                {filteredLessons.map((lesson) => {
                  const isSelected = selectedLessons.some(selected => selected._id === lesson._id);
                  return (
                    <div
                      key={lesson._id}
                      onClick={() => handleLessonToggle(lesson)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        isSelected 
                          ? "bg-indigo-600/30 border-2 border-indigo-500/50" 
                          : "bg-slate-700/40 border border-slate-600/30 hover:bg-slate-700/60"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleLessonToggle(lesson)}
                              className="mr-3 h-5 w-5 text-indigo-600 rounded"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-white text-base">
                                {lesson.title}
                              </h4>
                              <p className="text-xs text-slate-400 mt-1">
                                ID: {lesson._id}
                              </p>
                              <div className="flex items-center gap-4 mt-2 text-xs">
                                {lesson.duration && (
                                  <span className="text-slate-300 font-medium">
                                    ⏱️ {lesson.duration}min
                                  </span>
                                )}
                                {lesson.videoUrl && (
                                  <span className="text-blue-400 font-medium">
                                    📹 Video
                                  </span>
                                )}
                                {lesson.content && !lesson.videoUrl && (
                                  <span className="text-green-400 font-medium">
                                    📝 Content
                                  </span>
                                )}
                                {lesson.practiceQuestions?.length > 0 && (
                                  <span className="text-purple-400 font-medium">
                                    ❓ {lesson.practiceQuestions.length} Questions
                                  </span>
                                )}
                                {lesson.quiz?.length > 0 && (
                                  <span className="text-orange-400 font-medium">
                                    📝 {lesson.quiz.length} Quiz
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selected Lessons Summary */}
        {selectedLessons.length > 0 && (
          <div className="mb-6 p-4 bg-indigo-600/20 border border-indigo-500/30 rounded-xl">
            <h4 className="text-sm font-bold text-indigo-300 mb-3 uppercase tracking-wide">
              📋 Module Summary:
            </h4>
            <div className="space-y-2 max-h-24 overflow-y-auto mb-3">
              {selectedLessons.map((lesson, index) => (
                <div key={lesson._id} className="text-xs text-indigo-200 flex justify-between items-center">
                  <div className="flex-1">
                    <span className="font-semibold">{index + 1}. {lesson.title}</span>
                    <span className="text-indigo-400 ml-2">
                      ({lesson.duration || 0}min)
                    </span>
                    <span className="text-indigo-500 ml-2 text-xs">
                      ID: {lesson._id}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLessonToggle(lesson);
                    }}
                    className="text-indigo-400 hover:text-indigo-200 ml-2 p-1 hover:bg-indigo-500/20 rounded transition-colors"
                    title="Remove lesson"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="text-xs text-indigo-300 pt-3 border-t border-indigo-500/30 grid grid-cols-3 gap-2">
              <div>
                <strong className="font-bold">📖 Lessons:</strong><br/>
                <span className="text-indigo-200">{selectedLessons.length}</span>
              </div>
              <div>
                <strong className="font-bold">⏱️ Duration:</strong><br/>
                <span className="text-indigo-200">{selectedLessons.reduce((total, lesson) => total + (lesson.duration || 0), 0)} min</span>
              </div>
              <div>
                <strong className="font-bold">❓ Questions:</strong><br/>
                <span className="text-indigo-200">{selectedLessons.reduce((total, lesson) => total + (lesson.practiceQuestions?.length || 0), 0)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6 border-t border-slate-600/30">
          <button 
            className="flex-1 bg-slate-700/40 text-white px-6 py-3 rounded-xl hover:bg-slate-700/60 transition-all font-semibold text-base border border-slate-600/30"
            onClick={handleClose}
            disabled={isLoading}
          > 
            Cancel 
          </button>
          <button 
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold text-base shadow-xl hover:shadow-2xl"
            onClick={handleSave}
            disabled={isLoading || !title.trim() || selectedLessons.length === 0}
          > 
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating Module...
              </>
            ) : (
              <>
                <span className="mr-2">💾</span>
                Create Module
              </>
            )}
          </button>
        </div>
      </div>
    </ModalWrapper> 
  ); 
}; 
 
export default AddModuleModal;