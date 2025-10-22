import React from "react";
import { 
  Edit3, 
  Save, 
  X, 
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Upload,
  Loader
} from "lucide-react";

const ProfileHeader = ({ 
  profileData, 
  editProfile, 
  setEditProfile,
  handleProfileChange,
  saveProfile,
  loading 
}) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
      <div className="h-32 "></div>
      <div className="relative px-8 pb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
          <div className="relative mb-18">
            <img
              src={profileData.avatar || "https://via.placeholder.com/128"}
              alt="User avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
              <Upload className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            {editProfile ? (
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none w-full"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleProfileChange}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="role"
                    value={profileData.role}
                    onChange={handleProfileChange}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveProfile}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save
                  </button>
                  <button
                    onClick={() => setEditProfile(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{profileData.name}</h1>
                <p className="text-xl text-blue-600 font-semibold mb-3">{profileData.role}</p>
                <p className="text-gray-600 mb-4 max-w-2xl">{profileData.bio}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {profileData.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {profileData.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profileData.location}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  {profileData.github && (
                    <a href={profileData.github} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {profileData.linkedin && (
                    <a href={profileData.linkedin} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {profileData.website && (
                    <a href={profileData.website} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                      <Globe className="w-4 h-4" />
                      Website
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setEditProfile(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;