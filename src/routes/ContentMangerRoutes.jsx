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
// import AddModule from "../pages/contentManager/pages/module/Add-Module";
import LessonList from "../pages/contentManager/pages/lesson/Lesson-list";
import LessonForm from "../pages/contentManager/pages/lesson/Add-lesson";
import TestList from "../pages/contentManager/pages/test/Test-lists";
import LessonView from "../pages/contentManager/pages/lesson/Lesson-View";
import EditLesson from "../pages/contentManager/pages/lesson/Lesson_edit";

// Component that wraps our content and responds to sidebar state
const ContentWrapper = ({ children }) => {
  const { isOpen } = useSidebar();
  
  return (
    <div 
      className={`flex-1 w-full transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? 'md:ml-56' : 'md:ml-14'
      }`}
    >
      <main className="flex-1 overflow-y-auto pb-20 px-8 pt-8">
        {children}
      </main>
    </div>
  );
};

const ContentManagerRoutes = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-b from-slate-800 to-slate-900">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content - blends with sidebar */}
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
              {/* <Route
              path="modules/add"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <AddModule />
                </ProtectedRoute>
              }
            /> */}

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
              path="lessons/edit/:lessonId"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <EditLesson />
                </ProtectedRoute>
              }
            />
             <Route
              path="lessons/:lessonId"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <LessonView />
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