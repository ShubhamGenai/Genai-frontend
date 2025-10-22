import React from "react";
import { 
  Plus, 
  Save, 
  X, 
  Edit3, 
  Trash2, 
  Building, 
  Calendar, 
  Star 
} from "lucide-react";

const Education = ({ 
  educationData,
  setEducationData,
  editEducationId,
  setEditEducationId,
  showAddEducation,
  setShowAddEducation,
  handleEducationChange,
  addNewEducation,
  saveEducation,
  deleteEducation
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Education</h3>
        <button
          onClick={() => setShowAddEducation(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {showAddEducation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 mb-3">Click "Create Entry" to add new education details.</p>
          <div className="flex gap-2">
            <button
              onClick={addNewEducation}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Entry
            </button>
            <button
              onClick={() => setShowAddEducation(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {educationData.map((edu) => (
          <div key={edu._id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
            {editEducationId === edu._id ? (
              <div className="space-y-4">
                <input
                  name="degree"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(e, edu._id)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="institution"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(e, edu._id)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    name="startYear"
                    placeholder="Start Year"
                    value={edu.startYear}
                    onChange={(e) => handleEducationChange(e, edu._id)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    name="endYear"
                    placeholder="End Year"
                    value={edu.endYear}
                    onChange={(e) => handleEducationChange(e, edu._id)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    name="gpa"
                    placeholder="GPA/CGPA"
                    value={edu.gpa}
                    onChange={(e) => handleEducationChange(e, edu._id)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={edu.description}
                  onChange={(e) => handleEducationChange(e, edu._id)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEducation(edu._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditEducationId(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <Building className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditEducationId(edu._id)}
                      className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteEducation(edu._id)}
                      className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {edu.startYear} - {edu.endYear || "Present"}
                  </span>
                  {edu.gpa && (
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      CGPA: {edu.gpa}
                    </span>
                  )}
                </div>
                
                {edu.description && (
                  <p className="text-gray-600 mb-3">{edu.description}</p>
                )}
                
                {edu.achievements && edu.achievements.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">Achievements</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;