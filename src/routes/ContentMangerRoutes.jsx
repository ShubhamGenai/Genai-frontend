import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ContentManagerDashboard from "../pages/contentManager/homepage/Landing";
import Sidebar, { SidebarProvider, useSidebar } from "../component/baseComponents/contentManager/Content-Sidebar";
import Courses from "../pages/contentManager/pages/Course-list";

// Component that wraps our content and responds to sidebar state
const ContentWrapper = ({ children }) => {
  const { isOpen } = useSidebar();
  
  return (
    <div 
      className={`flex-1 transition-all duration-300 ease-in-out ${
        isOpen ? 'md:ml-64' : 'md:ml-16'
      }`}
    >
      <main className="p-6 py-16 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

const ContentManagerRoutes = () => {
  return (
    <SidebarProvider>
      <div className="flex h-fit overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <ContentWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <ContentManagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="homescreen"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <ContentManagerDashboard />
                </ProtectedRoute>
              }
            />

             <Route
              path="courses-list"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <Courses />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ContentWrapper>
      </div>
    </SidebarProvider>
  );
};

export default ContentManagerRoutes;