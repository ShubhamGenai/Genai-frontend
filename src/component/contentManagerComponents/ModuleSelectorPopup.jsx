import React, { useState, useEffect } from "react";
import axios from "axios";
import { CONTENTMANAGER } from "../../constants/ApiConstants";

const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-slate-800/95 backdrop-blur-md w-full max-w-4xl p-8 rounded-xl shadow-2xl border border-slate-600/50 relative max-h-[90vh] overflow-hidden flex flex-col">
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200 text-2xl font-bold z-10"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="overflow-y-auto flex-1 pr-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const ModuleSelectorPopup = ({ isOpen, onClose, selectedModules = [], onSelect }) => {
  const [availableModules, setAvailableModules] = useState([]);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModuleIds, setSelectedModuleIds] = useState(
    selectedModules.map(m => typeof m === 'string' ? m : m._id || m.id)
  );

  // Fetch modules when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchModules();
      // Initialize selected modules from props
      setSelectedModuleIds(selectedModules.map(m => typeof m === 'string' ? m : m._id || m.id));
    }
  }, [isOpen, selectedModules]);

  const fetchModules = async () => {
    setIsLoadingModules(true);
    try {
      const response = await axios.get(CONTENTMANAGER.GET_MODULES);
      // GET_MODULES already populates lessons, so we can use modules directly
      const modules = response.data.modules || [];
      setAvailableModules(modules);
    } catch (error) {
      console.error("Error fetching modules:", error);
      alert("Failed to load modules. Please try again.");
    } finally {
      setIsLoadingModules(false);
    }
  };

  // Filter modules based on search term
  const filteredModules = availableModules.filter(module =>
    module.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModuleToggle = (module) => {
    const moduleId = module._id || module.id;
    setSelectedModuleIds(prev => {
      const isSelected = prev.includes(moduleId);
      if (isSelected) {
        return prev.filter(id => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
  };

  const handleConfirm = () => {
    const selectedModulesData = availableModules.filter(module =>
      selectedModuleIds.includes(module._id || module.id)
    );
    onSelect(selectedModulesData);
    onClose();
  };

  const handleClose = () => {
    setSearchTerm("");
    onClose();
  };

  const selectedModulesData = availableModules.filter(module =>
    selectedModuleIds.includes(module._id || module.id)
  );

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight pr-8">
          Select Modules ({selectedModuleIds.length} selected)
        </h2>

        {/* Search Modules */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full bg-slate-700/40 border border-slate-600/30 rounded-xl px-5 py-3 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Modules List */}
        <div className="border border-slate-600/30 rounded-xl max-h-96 overflow-y-auto bg-slate-700/20 mb-4">
          {isLoadingModules ? (
            <div className="p-4 text-center text-slate-400">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500 mx-auto mb-2"></div>
              Loading modules...
            </div>
          ) : filteredModules.length === 0 ? (
            <div className="p-4 text-center text-slate-400 text-base">
              {searchTerm ? "No modules found matching your search" : "No modules available"}
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {filteredModules.map((module) => {
                const moduleId = module._id || module.id;
                const isSelected = selectedModuleIds.includes(moduleId);
                const lessonsCount = module.lessons?.length || 0;
                return (
                  <div
                    key={moduleId}
                    onClick={() => handleModuleToggle(module)}
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
                            onChange={() => handleModuleToggle(module)}
                            className="mr-3 h-5 w-5 text-indigo-600 rounded"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-base">
                              {module.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-1">
                              ID: {moduleId}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs">
                              <span className="text-slate-300 font-medium">
                                📚 {lessonsCount} {lessonsCount === 1 ? 'Lesson' : 'Lessons'}
                              </span>
                              {module.createdAt && (
                                <span className="text-slate-400 font-medium">
                                  📅 {new Date(module.createdAt).toLocaleDateString()}
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

        {/* Selected Modules Summary */}
        {selectedModuleIds.length > 0 && (
          <div className="mb-4 p-4 bg-indigo-600/20 border border-indigo-500/30 rounded-xl">
            <h4 className="text-sm font-bold text-indigo-300 mb-3 uppercase tracking-wide">
              📋 Selected Modules Summary:
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {selectedModulesData.map((module, index) => {
                const moduleId = module._id || module.id;
                return (
                  <div key={moduleId} className="text-xs text-indigo-200 flex justify-between items-center">
                    <div className="flex-1">
                      <span className="font-semibold">{index + 1}. {module.title}</span>
                      <span className="text-indigo-400 ml-2">
                        ({module.lessons?.length || 0} lessons)
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModuleToggle(module);
                      }}
                      className="text-indigo-400 hover:text-indigo-200 ml-2 p-1 hover:bg-indigo-500/20 rounded transition-colors"
                      title="Remove module"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-indigo-300 pt-3 border-t border-indigo-500/30">
              <strong className="font-bold">Total Modules:</strong>{" "}
              <span className="text-indigo-200">{selectedModuleIds.length}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6 border-t border-slate-600/30">
          <button
            className="flex-1 bg-slate-700/40 text-white px-6 py-3 rounded-xl hover:bg-slate-700/60 transition-all font-semibold text-base border border-slate-600/30"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold text-base shadow-xl hover:shadow-2xl"
            onClick={handleConfirm}
          >
            <span className="mr-2">✓</span>
            Confirm Selection ({selectedModuleIds.length})
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ModuleSelectorPopup;
