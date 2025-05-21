import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ContentManagerDashboard from "../pages/contentManager/homepage/Landing";
import Sidebar, { SidebarProvider, useSidebar } from "../component/baseComponents/contentManager/Content-Sidebar";
import Courses from "../pages/contentManager/pages/Course-list";
import CourseForm from "../component/contentManagerComponents/CourseForm";
import AddQuiz from "../pages/contentManager/pages/quiz/Add-quiz";
import Quizzes from "../pages/contentManager/pages/quiz/Quiz-list";
import ModuleList from "../pages/contentManager/pages/module/Module-list";
import AddModule from "../pages/contentManager/pages/module/Add-Module";
import LessonList from "../pages/contentManager/pages/lesson/Lesson-list";
import LessonForm from "../pages/contentManager/pages/lesson/Add-lesson";
import TestList from "../pages/contentManager/pages/test/Test-lists";

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

              <Route
              path="course/add"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <CourseForm />
                </ProtectedRoute>
              }
            />

    <Route
              path="quizzes"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <Quizzes />
                </ProtectedRoute>
              }
            />

               <Route
              path="quizzes/add"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <AddQuiz />
                </ProtectedRoute>
              }
            />

               <Route
              path="modules"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <ModuleList />
                </ProtectedRoute>
              }
            />
              <Route
              path="modules/add"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <AddModule />
                </ProtectedRoute>
              }
            />

             <Route
              path="lessons"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <LessonList />
                </ProtectedRoute>
              }
            />
             <Route
              path="lessons/add"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <LessonForm />
                </ProtectedRoute>
              }
            />
             <Route
              path="lessons/add/:id"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <LessonForm />
                </ProtectedRoute>
              }
            />

              <Route
              path="test-list"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <TestList />
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