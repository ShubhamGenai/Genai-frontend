import React from "react";
import { Plus, X, Star } from "lucide-react";

const Skills = ({ 
  skills,
  showAddSkill,
  setShowAddSkill,
  newSkill,
  setNewSkill,
  skillLevel,
  setSkillLevel,
  addSkill,
  removeSkill,
  getSkillLevelWidth,
  getSkillLevelColor 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Skills</h3>
        <button
          onClick={() => setShowAddSkill(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {showAddSkill && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Skill name"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={skillLevel}
              onChange={(e) => setSkillLevel(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Skill
            </button>
            <button
              onClick={() => {
                setShowAddSkill(false);
                setNewSkill("");
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-gray-800">{skill.name}</h4>
              <button
                onClick={() => removeSkill(index)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 capitalize">{skill.level}</span>
                <span className="text-gray-500 capitalize">{skill.category}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getSkillLevelColor(skill.level)}`}
                  style={{ width: getSkillLevelWidth(skill.level) }}
                ></div>
              </div>
              {skill.endorsed > 0 && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star className="w-3 h-3" />
                  {skill.endorsed} endorsements
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;