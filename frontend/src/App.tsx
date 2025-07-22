import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import CourseDashboard from './pages/dashboard/CourseDashboard';
import CourseList from './pages/courses/CourseList';
import CourseDetail from './pages/courses/CourseDetail';
import CoursePlayer from './pages/courses/CoursePlayer';
import ContentManager from './pages/cms/ContentManager';
import MediaLibrary from './pages/cms/MediaLibrary';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/courses" element={<CourseDashboard />} />
        {/* Courses */}
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:id/player" element={<CoursePlayer />} />
        {/* CMS */}
        <Route path="/cms/content" element={<ContentManager />} />
        <Route path="/cms/media" element={<MediaLibrary />} />
        {/* Default route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/*404*/}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App; 