import React, { useState, useEffect, useContext } from "react";

// Import all sub-components
import ProfileHeader from "./Profile_header";
import PersonalInfo from "./PersonalInfo";
import AddressInfo from "./AddressInfo";
import Education from "./Education";
import Skills from "./Skills";
import TabNavigation from "./TabNavigation";
import Notification from "./Notification";
import LoadingOverlay from "./LoadingOverlay";
import { apiService } from "./Profile_API";
import { mainContext } from "../../../context/MainContext";

const ProfileMain = () => {
  // Mock user data - replace with your actual user context
  // const mockUser = {
  //   _id: "user123",
  //   name: "Varsha Sharma",
  //   email: "varsha.sharma@email.com"
  // };
  const {user} = useContext(mainContext)

  // State management
  const [activeTab, setActiveTab] = useState("personal");
  const [editProfile, setEditProfile] = useState(false);
  const [editEducationId, setEditEducationId] = useState(null);
  const [showAddEducation, setShowAddEducation] = useState(false);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState("beginner");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Profile data state
  const [profileData, setProfileData] = useState({
    name: user?.name || "Varsha Sharma",
    email: user?.email || "varsha.sharma@email.com",
    phone: "+91 98765 43210",
    location: "Bangalore, Karnataka",
    role: user.role|| "Student",
    bio: "Recent graduate passionate about technology and innovation. Seeking opportunities to leverage my skills in web development and contribute to meaningful projects.",
    avatar: "/profile.jpg",
    github: "https://github.com/varsha",
    linkedin: "https://linkedin.com/in/varsha-sharma",
    website: "https://varsha.dev",
    joinDate: "2024-01-15",
    dateOfBirth: "1999-05-15",
    gender: "Female",
    nationality: "Indian",
    address: {
      street: "123, MG Road",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      pincode: "560001"
    }
  });

  // Skills state
  const [skills, setSkills] = useState([
    { name: "JavaScript", level: "intermediate", category: "programming", endorsed: 12 },
    { name: "React", level: "intermediate", category: "frontend", endorsed: 8 },
    { name: "Node.js", level: "beginner", category: "backend", endorsed: 5 },
    { name: "Python", level: "intermediate", category: "programming", endorsed: 15 },
    { name: "HTML/CSS", level: "advanced", category: "frontend", endorsed: 20 },
    { name: "Git", level: "intermediate", category: "tools", endorsed: 10 },
    { name: "MongoDB", level: "beginner", category: "database", endorsed: 3 },
    { name: "Problem Solving", level: "advanced", category: "soft", endorsed: 18 }
  ]);

  // Education state
  const [educationData, setEducationData] = useState([
    {
      _id: "e1",
      degree: "Bachelor of Technology",
      institution: "Manipal Institute of Technology",
      startYear: "2020",
      endYear: "2024",
      gpa: "8.2",
      description: "Computer Science and Engineering with focus on Full Stack Development",
      achievements: ["Dean's List 2022", "Best Project Award", "Technical Society Member"]
    }
  ]);

  // Animation effect
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Utility functions
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const getSkillLevelWidth = (level) => {
    switch (level) {
      case 'beginner': return '33%';
      case 'intermediate': return '66%';
      case 'advanced': return '100%';
      default: return '33%';
    }
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-red-400';
      case 'intermediate': return 'bg-yellow-400';
      case 'advanced': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  // Event handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      const response = await apiService.updateProfile({
        ...profileData,
        userId: user?._id || user?.id
      });

      if (response.success) {
        setEditProfile(false);
        showMessage('success', 'Profile updated successfully!');
      } else {
        showMessage('error', 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      showMessage('error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEducationChange = (e, id) => {
    const updated = educationData.map((edu) =>
      edu._id === id ? { ...edu, [e.target.name]: e.target.value } : edu
    );
    setEducationData(updated);
  };

  const addNewEducation = () => {
    const newId = `e${educationData.length + 1}`;
    setEducationData([...educationData, {
      _id: newId,
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
      gpa: "",
      description: "",
      achievements: []
    }]);
    setEditEducationId(newId);
    setShowAddEducation(false);
  };

  const saveEducation = async (id) => {
    setLoading(true);
    try {
      const response = await apiService.updateEducation(educationData, user?._id || user?.id);

      if (response.success) {
        setEditEducationId(null);
        showMessage('success', 'Education updated successfully!');
      } else {
        showMessage('error', 'Failed to update education');
      }
    } catch (error) {
      console.error('Education update error:', error);
      showMessage('error', 'Failed to update education');
    } finally {
      setLoading(false);
    }
  };

  const deleteEducation = async (id) => {
    setLoading(true);
    try {
      const updatedEducation = educationData.filter(edu => edu._id !== id);
      
      const response = await apiService.deleteEducation(updatedEducation, user?._id || user?.id);

      if (response.success) {
        setEducationData(updatedEducation);
        showMessage('success', 'Education deleted successfully!');
      } else {
        showMessage('error', 'Failed to delete education');
      }
    } catch (error) {
      console.error('Education delete error:', error);
      showMessage('error', 'Failed to delete education');
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async () => {
    if (newSkill.trim()) {
      setLoading(true);
      try {
        const newSkillObj = {
          name: newSkill,
          level: skillLevel,
          category: "other",
          endorsed: 0
        };
        
        const updatedSkills = [...skills, newSkillObj];
        
        const response = await apiService.updateSkills(updatedSkills, user?._id || user?.id);

        if (response.success) {
          setSkills(updatedSkills);
          setNewSkill("");
          setShowAddSkill(false);
          showMessage('success', 'Skill added successfully!');
        } else {
          showMessage('error', 'Failed to add skill');
        }
      } catch (error) {
        console.error('Skill add error:', error);
        showMessage('error', 'Failed to add skill');
      } finally {
        setLoading(false);
      }
    }
  };

  const removeSkill = async (index) => {
    setLoading(true);
    try {
      const updatedSkills = skills.filter((_, i) => i !== index);
      
      const response = await apiService.updateSkills(updatedSkills, user?._id || user?.id);

      if (response.success) {
        setSkills(updatedSkills);
        showMessage('success', 'Skill removed successfully!');
      } else {
        showMessage('error', 'Failed to remove skill');
      }
    } catch (error) {
      console.error('Skill remove error:', error);
      showMessage('error', 'Failed to remove skill');
    } finally {
      setLoading(false);
    }
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfo 
            profileData={profileData}
            handleProfileChange={handleProfileChange}
            saveProfile={saveProfile}
            loading={loading}
          />
        );
      case "address":
        return (
          <AddressInfo 
            profileData={profileData}
            handleProfileChange={handleProfileChange}
            saveProfile={saveProfile}
            loading={loading}
          />
        );
      case "education":
        return (
          <Education 
            educationData={educationData}
            setEducationData={setEducationData}
            editEducationId={editEducationId}
            setEditEducationId={setEditEducationId}
            showAddEducation={showAddEducation}
            setShowAddEducation={setShowAddEducation}
            handleEducationChange={handleEducationChange}
            addNewEducation={addNewEducation}
            saveEducation={saveEducation}
            deleteEducation={deleteEducation}
          />
        );
      case "skills":
        return (
          <Skills 
            skills={skills}
            showAddSkill={showAddSkill}
            setShowAddSkill={setShowAddSkill}
            newSkill={newSkill}
            setNewSkill={setNewSkill}
            skillLevel={skillLevel}
            setSkillLevel={setSkillLevel}
            addSkill={addSkill}
            removeSkill={removeSkill}
            getSkillLevelWidth={getSkillLevelWidth}
            getSkillLevelColor={getSkillLevelColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Notification Component */}
      <Notification message={message} />

      {/* Loading Overlay Component */}
      <LoadingOverlay loading={loading} />
      
      {/* Profile Header Component */}
      <ProfileHeader 
        profileData={profileData}
        editProfile={editProfile}
        setEditProfile={setEditProfile}
        handleProfileChange={handleProfileChange}
        saveProfile={saveProfile}
        loading={loading}
      />

      {/* Tab Navigation Component */}
      <TabNavigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Tab Content Container */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-5 md:p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProfileMain;