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
    if (path.includes("/community/forum")) setActiveItem("community-forum");
    else if (path.includes("/community/groups")) setActiveItem("community-groups");
    else if (path.includes("/community/events")) setActiveItem("community-events");
    else if (path.includes("/progress/courses")) setActiveItem("progress-courses");
    else if (path.includes("/progress/skills")) setActiveItem("progress-skills");
    else if (path.includes("/progress/certificates")) setActiveItem("progress-certificates");
    else if (path.includes("/leaderboard")) setActiveItem("progress-leaderboard");
    
    // Check for main menu routes
    else if (path.includes("/learn")) setActiveItem("learn");
    else if (path.includes("/tests")) setActiveItem("tests");
    else if (path.includes("/jobs")) setActiveItem("jobs");
    else if (path.includes("/community")) setActiveItem("community");
    else if (path.includes("/progress")) setActiveItem("progress");
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
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;
