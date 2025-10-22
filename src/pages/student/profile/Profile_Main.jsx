// import React, { useState, useEffect } from "react";
// import { 
//   User, 
//   Edit3, 
//   Save, 
//   X, 
//   Plus, 
//   Calendar, 
//   Building, 
//   Award, 
//   Mail,
//   Phone,
//   MapPin,
//   Github,
//   Linkedin,
//   Globe,
//   Upload,
//   Trash2,
//   Star,
//   Home,
//   Loader,
//   CheckCircle,
//   AlertCircle
// } from "lucide-react";

// const ProfilePage = () => {
//   // Mock user data - replace with your actual user context
//   const mockUser = {
//     _id: "user123",
//     name: "Varsha Sharma",
//     email: "varsha.sharma@email.com"
//   };

//   const [activeTab, setActiveTab] = useState("personal");
//   const [editProfile, setEditProfile] = useState(false);
//   const [editEducationId, setEditEducationId] = useState(null);
//   const [showAddEducation, setShowAddEducation] = useState(false);
//   const [showAddSkill, setShowAddSkill] = useState(false);
//   const [newSkill, setNewSkill] = useState("");
//   const [skillLevel, setSkillLevel] = useState("beginner");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const [profileData, setProfileData] = useState({
//     name: mockUser?.name || "Varsha Sharma",
//     email: mockUser?.email || "varsha.sharma@email.com",
//     phone: "+91 98765 43210",
//     location: "Bangalore, Karnataka",
//     role: "Aspiring Full Stack Developer",
//     bio: "Recent graduate passionate about technology and innovation. Seeking opportunities to leverage my skills in web development and contribute to meaningful projects.",
//     avatar: "/profile.jpg",
//     github: "https://github.com/varsha",
//     linkedin: "https://linkedin.com/in/varsha-sharma",
//     website: "https://varsha.dev",
//     joinDate: "2024-01-15",
//     dateOfBirth: "1999-05-15",
//     gender: "Female",
//     nationality: "Indian",
//     address: {
//       street: "123, MG Road",
//       city: "Bangalore",
//       state: "Karnataka",
//       country: "India",
//       pincode: "560001"
//     }
//   });

//   const [skills, setSkills] = useState([
//     { name: "JavaScript", level: "intermediate", category: "programming", endorsed: 12 },
//     { name: "React", level: "intermediate", category: "frontend", endorsed: 8 },
//     { name: "Node.js", level: "beginner", category: "backend", endorsed: 5 },
//     { name: "Python", level: "intermediate", category: "programming", endorsed: 15 },
//     { name: "HTML/CSS", level: "advanced", category: "frontend", endorsed: 20 },
//     { name: "Git", level: "intermediate", category: "tools", endorsed: 10 },
//     { name: "MongoDB", level: "beginner", category: "database", endorsed: 3 },
//     { name: "Problem Solving", level: "advanced", category: "soft", endorsed: 18 }
//   ]);

//   const [educationData, setEducationData] = useState([
//     {
//       _id: "e1",
//       degree: "Bachelor of Technology",
//       institution: "Manipal Institute of Technology",
//       startYear: "2020",
//       endYear: "2024",
//       gpa: "8.2",
//       description: "Computer Science and Engineering with focus on Full Stack Development",
//       achievements: ["Dean's List 2022", "Best Project Award", "Technical Society Member"]
//     }
//   ]);

//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: '', text: '' }), 5000);
//   };

//   const mockApiCall = (endpoint, data) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(`API Call to ${endpoint}:`, data);
//         resolve({ success: true, message: "Operation successful" });
//       }, 1000);
//     });
//   };

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name.startsWith('address.')) {
//       const addressField = name.split('.')[1];
//       setProfileData(prev => ({
//         ...prev,
//         address: {
//           ...prev.address,
//           [addressField]: value
//         }
//       }));
//     } else {
//       setProfileData({ ...profileData, [name]: value });
//     }
//   };

//   const saveProfile = async () => {
//     setLoading(true);
//     try {
//       const response = await mockApiCall('/api/user/profile', {
//         ...profileData,
//         userId: mockUser._id
//       });

//       if (response.success) {
//         setEditProfile(false);
//         showMessage('success', 'Profile updated successfully!');
//       } else {
//         showMessage('error', 'Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Profile update error:', error);
//       showMessage('error', 'Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEducationChange = (e, id) => {
//     const updated = educationData.map((edu) =>
//       edu._id === id ? { ...edu, [e.target.name]: e.target.value } : edu
//     );
//     setEducationData(updated);
//   };

//   const addNewEducation = () => {
//     const newId = `e${educationData.length + 1}`;
//     setEducationData([...educationData, {
//       _id: newId,
//       degree: "",
//       institution: "",
//       startYear: "",
//       endYear: "",
//       gpa: "",
//       description: "",
//       achievements: []
//     }]);
//     setEditEducationId(newId);
//     setShowAddEducation(false);
//   };

//   const saveEducation = async (id) => {
//     setLoading(true);
//     try {
//       const response = await mockApiCall('/api/user/education', {
//         education: educationData,
//         userId: mockUser._id
//       });

//       if (response.success) {
//         setEditEducationId(null);
//         showMessage('success', 'Education updated successfully!');
//       } else {
//         showMessage('error', 'Failed to update education');
//       }
//     } catch (error) {
//       console.error('Education update error:', error);
//       showMessage('error', 'Failed to update education');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteEducation = async (id) => {
//     setLoading(true);
//     try {
//       const updatedEducation = educationData.filter(edu => edu._id !== id);
      
//       const response = await mockApiCall('/api/user/education', {
//         education: updatedEducation,
//         userId: mockUser._id
//       });

//       if (response.success) {
//         setEducationData(updatedEducation);
//         showMessage('success', 'Education deleted successfully!');
//       } else {
//         showMessage('error', 'Failed to delete education');
//       }
//     } catch (error) {
//       console.error('Education delete error:', error);
//       showMessage('error', 'Failed to delete education');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addSkill = async () => {
//     if (newSkill.trim()) {
//       setLoading(true);
//       try {
//         const newSkillObj = {
//           name: newSkill,
//           level: skillLevel,
//           category: "other",
//           endorsed: 0
//         };
        
//         const updatedSkills = [...skills, newSkillObj];
        
//         const response = await mockApiCall('/api/user/skills', {
//           skills: updatedSkills,
//           userId: mockUser._id
//         });

//         if (response.success) {
//           setSkills(updatedSkills);
//           setNewSkill("");
//           setShowAddSkill(false);
//           showMessage('success', 'Skill added successfully!');
//         } else {
//           showMessage('error', 'Failed to add skill');
//         }
//       } catch (error) {
//         console.error('Skill add error:', error);
//         showMessage('error', 'Failed to add skill');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const removeSkill = async (index) => {
//     setLoading(true);
//     try {
//       const updatedSkills = skills.filter((_, i) => i !== index);
      
//       const response = await mockApiCall('/api/user/skills', {
//         skills: updatedSkills,
//         userId: mockUser._id
//       });

//       if (response.success) {
//         setSkills(updatedSkills);
//         showMessage('success', 'Skill removed successfully!');
//       } else {
//         showMessage('error', 'Failed to remove skill');
//       }
//     } catch (error) {
//       console.error('Skill remove error:', error);
//       showMessage('error', 'Failed to remove skill');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getSkillLevelWidth = (level) => {
//     switch (level) {
//       case 'beginner': return '33%';
//       case 'intermediate': return '66%';
//       case 'advanced': return '100%';
//       default: return '33%';
//     }
//   };

//   const getSkillLevelColor = (level) => {
//     switch (level) {
//       case 'beginner': return 'bg-red-400';
//       case 'intermediate': return 'bg-yellow-400';
//       case 'advanced': return 'bg-green-400';
//       default: return 'bg-gray-400';
//     }
//   };

//   return (
//     <div className={`min-h-screen bg-gray-50 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
//       <div className="max-w-7xl mx-auto p-4 space-y-6">
        
//         {/* Message Display */}
//         {message.text && (
//           <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
//             message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//           }`}>
//             {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
//             {message.text}
//           </div>
//         )}

//         {/* Loading Overlay */}
//         {loading && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg flex items-center gap-3">
//               <Loader className="w-6 h-6 animate-spin text-blue-600" />
//               <span>Updating...</span>
//             </div>
//           </div>
//         )}
        
//         {/* Enhanced Profile Header */}
//         <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
//           <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
//           <div className="relative px-8 pb-8">
//             <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
//               <div className="relative">
//                 <img
//                   src={profileData.avatar || "https://via.placeholder.com/128"}
//                   alt="User avatar"
//                   className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
//                 />
//                 <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
//                   <Upload className="w-4 h-4 text-gray-600" />
//                 </button>
//               </div>
              
//               <div className="flex-1 text-center sm:text-left">
//                 {editProfile ? (
//                   <div className="space-y-3">
//                     <input
//                       type="text"
//                       name="name"
//                       value={profileData.name}
//                       onChange={handleProfileChange}
//                       className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none w-full"
//                     />
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                       <input
//                         type="email"
//                         name="email"
//                         value={profileData.email}
//                         onChange={handleProfileChange}
//                         className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         name="phone"
//                         value={profileData.phone}
//                         onChange={handleProfileChange}
//                         className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         name="location"
//                         value={profileData.location}
//                         onChange={handleProfileChange}
//                         className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         name="role"
//                         value={profileData.role}
//                         onChange={handleProfileChange}
//                         className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                     <textarea
//                       name="bio"
//                       value={profileData.bio}
//                       onChange={handleProfileChange}
//                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       rows="3"
//                     />
//                     <div className="flex gap-2">
//                       <button
//                         onClick={saveProfile}
//                         disabled={loading}
//                         className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//                       >
//                         {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditProfile(false)}
//                         className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
//                       >
//                         <X className="w-4 h-4" />
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">{profileData.name}</h1>
//                     <p className="text-xl text-blue-600 font-semibold mb-3">{profileData.role}</p>
//                     <p className="text-gray-600 mb-4 max-w-2xl">{profileData.bio}</p>
                    
//                     <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
//                       <span className="flex items-center gap-1">
//                         <Mail className="w-4 h-4" />
//                         {profileData.email}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Phone className="w-4 h-4" />
//                         {profileData.phone}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <MapPin className="w-4 h-4" />
//                         {profileData.location}
//                       </span>
//                     </div>

//                     <div className="flex flex-wrap gap-3 mb-4">
//                       {profileData.github && (
//                         <a href={profileData.github} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
//                           <Github className="w-4 h-4" />
//                           GitHub
//                         </a>
//                       )}
//                       {profileData.linkedin && (
//                         <a href={profileData.linkedin} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
//                           <Linkedin className="w-4 h-4" />
//                           LinkedIn
//                         </a>
//                       )}
//                       {profileData.website && (
//                         <a href={profileData.website} className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
//                           <Globe className="w-4 h-4" />
//                           Website
//                         </a>
//                       )}
//                     </div>

//                     <button
//                       onClick={() => setEditProfile(true)}
//                       className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       <Edit3 className="w-4 h-4" />
//                       Edit Profile
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Navigation Tabs */}
//         <div className="bg-white shadow-lg rounded-xl overflow-hidden">
//           <div className="flex flex-wrap border-b border-gray-200">
//             {[
//               { key: "personal", label: "Personal Info", icon: User },
//               { key: "address", label: "Address", icon: Home },
//               { key: "education", label: "Education", icon: Building },
//               { key: "skills", label: "Skills", icon: Star }
//             ].map(({ key, label, icon: Icon }) => (
//               <button
//                 key={key}
//                 onClick={() => setActiveTab(key)}
//                 className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
//                   activeTab === key
//                     ? "border-b-3 border-blue-600 text-blue-600 bg-blue-50"
//                     : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 {label}
//               </button>
//             ))}
//           </div>

//           {/* Tab Content */}
//           <div className="p-6">
            
//             {/* Personal Information Tab */}
//             {activeTab === "personal" && (
//               <div className="space-y-6">
//                 <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
//                       <input
//                         type="date"
//                         name="dateOfBirth"
//                         value={profileData.dateOfBirth}
//                         onChange={handleProfileChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
//                       <select
//                         name="gender"
//                         value={profileData.gender}
//                         onChange={handleProfileChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                         <option value="Other">Other</option>
//                         <option value="Prefer not to say">Prefer not to say</option>
//                       </select>
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
//                       <input
//                         type="text"
//                         name="nationality"
//                         value={profileData.nationality}
//                         onChange={handleProfileChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </div>
                  
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
//                       <input
//                         type="url"
//                         name="github"
//                         value={profileData.github}
//                         onChange={handleProfileChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
//                       <input
//                         type="url"
//                         name="linkedin"
//                         value={profileData.linkedin}
//                         onChange={handleProfileChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
                    
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Personal Website</label>
//                       <input
//                         type="url"
//                         name="website"
//                         value={profileData.website}
//                         onChange={handleProfileChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     onClick={saveProfile}
//                     disabled={loading}
//                     className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//                   >
//                     {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Address Tab */}
//             {activeTab === "address" && (
//               <div className="space-y-6">
//                 <h3 className="text-xl font-semibold mb-4">Address Information</h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
//                       <textarea
//                         name="address.street"
//                         value={profileData.address.street}
//                         onChange={handleProfileChange}
//                         rows="3"
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter your street address"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                       <input
//                         type="text"
//                         name="address.city"
//                         value={profileData.address.city}
//                         onChange={handleProfileChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter your city"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
//                       <input
//                         type="text"
//                         name="address.pincode"
//                         value={profileData.address.pincode}
//                         onChange={handleProfileChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter PIN code"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
//                       <input
//                         type="text"
//                         name="address.state"
//                         value={profileData.address.state}
//                         onChange={handleProfileChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter your state"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
//                       <input
//                         type="text"
//                         name="address.country"
//                         value={profileData.address.country}
//                         onChange={handleProfileChange}
//                         className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter your country"
//                       />
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h4 className="font-medium text-gray-700 mb-2">Complete Address Preview</h4>
//                       <p className="text-sm text-gray-600">
//                         {profileData.address.street && `${profileData.address.street}, `}
//                         {profileData.address.city && `${profileData.address.city}, `}
//                         {profileData.address.state && `${profileData.address.state} `}
//                         {profileData.address.pincode && `- ${profileData.address.pincode}, `}
//                         {profileData.address.country}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     onClick={saveProfile}
//                     disabled={loading}
//                     className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//                   >
//                     {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                     Save Address
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Education Tab */}
//             {activeTab === "education" && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-semibold">Education</h3>
//                   <button
//                     onClick={() => setShowAddEducation(true)}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Education
//                   </button>
//                 </div>

//                 {showAddEducation && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <p className="text-blue-800 mb-3">Click "Create Entry" to add new education details.</p>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={addNewEducation}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Create Entry
//                       </button>
//                       <button
//                         onClick={() => setShowAddEducation(false)}
//                         className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 <div className="space-y-4">
//                   {educationData.map((edu) => (
//                     <div key={edu._id} className="bg-white border rounded-xl p-6 hover:shadow-lg transition-shadow">
//                       {editEducationId === edu._id ? (
//                         <div className="space-y-4">
//                           <input
//                             name="degree"
//                             placeholder="Degree"
//                             value={edu.degree}
//                             onChange={(e) => handleEducationChange(e, edu._id)}
//                             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                           />
//                           <input
//                             name="institution"
//                             placeholder="Institution"
//                             value={edu.institution}
//                             onChange={(e) => handleEducationChange(e, edu._id)}
//                             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                           />
//                           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                             <input
//                               name="startYear"
//                               placeholder="Start Year"
//                               value={edu.startYear}
//                               onChange={(e) => handleEducationChange(e, edu._id)}
//                               className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                             />
//                             <input
//                               name="endYear"
//                               placeholder="End Year"
//                               value={edu.endYear}
//                               onChange={(e) => handleEducationChange(e, edu._id)}
//                               className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                             />
//                             <input
//                               name="gpa"
//                               placeholder="GPA/CGPA"
//                               value={edu.gpa}
//                               onChange={(e) => handleEducationChange(e, edu._id)}
//                               className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                           <textarea
//                             name="description"
//                             placeholder="Description"
//                             value={edu.description}
//                             onChange={(e) => handleEducationChange(e, edu._id)}
//                             className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                             rows="3"
//                           />
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => saveEducation(edu._id)}
//                               className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                             >
//                               <Save className="w-4 h-4" />
//                               Save
//                             </button>
//                             <button
//                               onClick={() => setEditEducationId(null)}
//                               className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
//                             >
//                               <X className="w-4 h-4" />
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <div>
//                           <div className="flex justify-between items-start mb-3">
//                             <div className="flex items-center gap-3">
//                               <Building className="w-6 h-6 text-blue-600" />
//                               <div>
//                                 <h4 className="font-semibold text-lg text-gray-800">{edu.degree}</h4>
//                                 <p className="text-gray-600">{edu.institution}</p>
//                               </div>
//                             </div>
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => setEditEducationId(edu._id)}
//                                 className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
//                               >
//                                 <Edit3 className="w-4 h-4" />
//                               </button>
//                               <button
//                                 onClick={() => deleteEducation(edu._id)}
//                                 className="p-2 text-gray-600 hover:text-red-600 transition-colors"
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </button>
//                             </div>
//                           </div>
                          
//                           <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
//                             <span className="flex items-center gap-1">
//                               <Calendar className="w-4 h-4" />
//                               {edu.startYear} - {edu.endYear || "Present"}
//                             </span>
//                             {edu.gpa && (
//                               <span className="flex items-center gap-1">
//                                 <Star className="w-4 h-4" />
//                                 CGPA: {edu.gpa}
//                               </span>
//                             )}
//                           </div>
                          
//                           {edu.description && (
//                             <p className="text-gray-600 mb-3">{edu.description}</p>
//                           )}
                          
//                           {edu.achievements && edu.achievements.length > 0 && (
//                             <div>
//                               <h5 className="font-medium text-gray-700 mb-2">Achievements</h5>
//                               <div className="flex flex-wrap gap-2">
//                                 {edu.achievements.map((achievement, index) => (
//                                   <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                                     {achievement}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Skills Tab */}
//             {activeTab === "skills" && (
//               <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-xl font-semibold">Skills</h3>
//                   <button
//                     onClick={() => setShowAddSkill(true)}
//                     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Add Skill
//                   </button>
//                 </div>

//                 {showAddSkill && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <div className="flex gap-3 mb-3">
//                       <input
//                         type="text"
//                         placeholder="Skill name"
//                         value={newSkill}
//                         onChange={(e) => setNewSkill(e.target.value)}
//                         className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       />
//                       <select
//                         value={skillLevel}
//                         onChange={(e) => setSkillLevel(e.target.value)}
//                         className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="beginner">Beginner</option>
//                         <option value="intermediate">Intermediate</option>
//                         <option value="advanced">Advanced</option>
//                       </select>
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={addSkill}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                       >
//                         Add Skill
//                       </button>
//                       <button
//                         onClick={() => {
//                           setShowAddSkill(false);
//                           setNewSkill("");
//                         }}
//                         className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {skills.map((skill, index) => (
//                     <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow">
//                       <div className="flex justify-between items-start mb-3">
//                         <h4 className="font-semibold text-gray-800">{skill.name}</h4>
//                         <button
//                           onClick={() => removeSkill(index)}
//                           className="text-gray-400 hover:text-red-600 transition-colors"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
                      
//                       <div className="space-y-2">
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-500 capitalize">{skill.level}</span>
//                           <span className="text-gray-500 capitalize">{skill.category}</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div 
//                             className={`h-2 rounded-full transition-all duration-500 ${getSkillLevelColor(skill.level)}`}
//                             style={{ width: getSkillLevelWidth(skill.level) }}
//                           ></div>
//                         </div>
//                         {skill.endorsed > 0 && (
//                           <div className="flex items-center gap-1 text-xs text-gray-500">
//                             <Star className="w-3 h-3" />
//                             {skill.endorsed} endorsements
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;