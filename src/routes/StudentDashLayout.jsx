import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../component/dashboard/Sidebar";
import { Header } from "../component/dashboard/Dash_Header";

const StudentDashboardLayout = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("dashboard");

  // Update active sidebar item based on current route
  useEffect(() => {
    const path = location.pathname;
    
    // Check for specific submenu routes first
    if (path.includes("/community/all")) setActiveItem("community-all");
    else if (path.includes("/community/college")) setActiveItem("community-college");
    else if (path.includes("/community/company")) setActiveItem("community-company");
    else if (path.includes("/community/examprep")) setActiveItem("community-examprep");
    else if (path.includes("/community/skills")) setActiveItem("community-skills");
    else if (path.includes("/progress/mycourses")) setActiveItem("progress-mycourses");
    else if (path.includes("/progress/mytests")) setActiveItem("progress-mytests");
    else if (path.includes("/progress/myjobapplications")) setActiveItem("progress-myjobapplications");
    else if (path.includes("/progress/mydocuments")) setActiveItem("progress-mydocuments");
    else if (path.includes("/progress/mynotes")) setActiveItem("progress-mynotes");
    else if (path.includes("/profile")) setActiveItem("progress-profile");
    
    // Check for main menu routes
    else if (path.includes("/learn") || path.includes("/course-details") || path.includes("/course-player")) setActiveItem("learn");
    else if (path.includes("/tests") || path.includes("/test-details") || path.includes("/test-results") || path.includes("/test-player")) setActiveItem("tests");
    else if (path.includes("/jobs") || path.includes("/job-details")) setActiveItem("jobs");
    else if (path.includes("/community")) setActiveItem("community");
    else if (path.includes("/progress")) setActiveItem("progress");
    else if (path.includes("/library")) setActiveItem("library");
    else if (path.includes("/ai-chat")) setActiveItem("ai-chat");
    else if (path.includes("/settings")) setActiveItem("settings");
    else if (path.includes("/cart")) setActiveItem("cart");
    else if (path.includes("/list")) setActiveItem("list");
    else if (path.includes("/profile")) setActiveItem("profile");
    
    // Default to dashboard
    else setActiveItem("dashboard");
  }, [location]);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Header */}
        <Header/>

        {/* Outlet renders the child routes */}
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
