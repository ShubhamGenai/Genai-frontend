import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ContentManagerDashboard from "../pages/contentManager/homepage/Landing";
import Sidebar, { SidebarProvider, useSidebar } from "../component/baseComponents/contentManager/Content-Sidebar";
import Courses from "../pages/contentManager/pages/Course-list";
import CourseView from "../pages/contentManager/pages/Course-View";
import CourseForm from "../component/contentManagerComponents/CourseForm";
import AddQuiz from "../pages/contentManager/pages/quiz/Add-quiz";
import Quizzes from "../pages/contentManager/pages/quiz/Quiz-list";
import QuizBulkUpload from "../pages/contentManager/pages/quiz/Quiz-BulkUpload";
import QuizView from "../pages/contentManager/pages/quiz/Quiz-View";
import EditQuiz from "../pages/contentManager/pages/quiz/Edit-quiz";
import ModuleList from "../pages/contentManager/pages/module/Module-list";
// import AddModule from "../pages/contentManager/pages/module/Add-Module";
import LessonList from "../pages/contentManager/pages/lesson/Lesson-list";
import LessonForm from "../pages/contentManager/pages/lesson/Add-lesson";
import TestList from "../pages/contentManager/pages/test/Test-lists";
import LessonView from "../pages/contentManager/pages/lesson/Lesson-View";
import EditLesson from "../pages/contentManager/pages/lesson/Lesson_edit";
import TestBulkUpload from "../pages/contentManager/pages/test/Test-BulkUpload";
import TestView from "../pages/contentManager/pages/test/Test-View";
import TestCreate from "../pages/contentManager/pages/test/Test-Create";
import TestPDFUpload from "../pages/contentManager/pages/test/Test-PDFUpload";
import PlaceholderPage from "../pages/contentManager/pages/PlaceholderPage";
import LibraryAllFiles from "../pages/contentManager/pages/library/LibraryAllFiles";
import LibraryUploadDocument from "../pages/contentManager/pages/library/LibraryUploadDocument";

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
              path="course/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <CourseForm />
                </ProtectedRoute>
              }
            />

            <Route
              path="courses/:courseId"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <CourseView />
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
              path="quizzes/bulk-upload"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <QuizBulkUpload />
                </ProtectedRoute>
              }
            />

            <Route
              path="quizzes/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <EditQuiz />
                </ProtectedRoute>
              }
            />

            <Route
              path="quizzes/:quizId"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <QuizView />
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

            <Route
              path="tests/bulk-upload"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <TestBulkUpload />
                </ProtectedRoute>
              }
            />

            <Route
              path="tests/:testId"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <TestView />
                </ProtectedRoute>
              }
            />

            {/* Tests: Create + Analytics */}
            <Route
              path="tests/add"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <TestCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="tests/edit/:id"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <TestCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="tests/pdf-upload"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <TestPDFUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="tests/analytics"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Test Analytics"
                    description="This is a placeholder analytics page for tests. Add charts and metrics here."
                  />
                </ProtectedRoute>
              }
            />

            {/* Library */}
            <Route
              path="library/resources"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <LibraryAllFiles />
                </ProtectedRoute>
              }
            />
            <Route
              path="library/documents"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <LibraryUploadDocument />
                </ProtectedRoute>
              }
            />
            <Route
              path="library/videos"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Library - Media"
                    description="Manage video assets used across lessons and courses."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="library/audio"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Library - Audio"
                    description="Manage audio assets like podcasts or voiceovers."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="library/images"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Library - Images"
                    description="Manage image assets for courses, tests, and marketing."
                  />
                </ProtectedRoute>
              }
            />

            {/* Classes placeholders */}
            <Route
              path="classes/all"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Classes - All"
                    description="View and manage all live/recorded classes."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="classes/create"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Create Class"
                    description="Create new live or recorded classes for your learners."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="classes/schedules"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Class Schedules"
                    description="Manage schedules and calendars for classes."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="classes/attendance"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Class Attendance"
                    description="Review attendance details for each class session."
                  />
                </ProtectedRoute>
              }
            />

            {/* Exam Types placeholders */}
            <Route
              path="exam-types/mcq"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Exam Types - Multiple Choice"
                    description="Configure MCQ-style exam templates and settings."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="exam-types/essay"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Exam Types - Essay"
                    description="Configure essay-style exams and evaluation rubrics."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="exam-types/practical"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Exam Types - Practical"
                    description="Configure practical exams and associated workflows."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="exam-types/oral"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Exam Types - Oral"
                    description="Configure oral/viva-style exams and schedules."
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="exam-types/mixed"
              element={
                <ProtectedRoute allowedRoles={["content"]}>
                  <PlaceholderPage
                    title="Exam Types - Mixed"
                    description="Combine multiple exam types into mixed assessments."
                  />
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