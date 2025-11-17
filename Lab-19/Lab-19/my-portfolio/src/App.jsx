import React, { useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeContext } from './context/ThemeContext';

// Import page components
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

// Import global components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Read the state directly from the global context
  const { isDarkMode } = useContext(ThemeContext); 
  
  // Apply dark mode class conditionally
  const appClasses = `flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`;

  return (
    // Use flex-col and min-h-screen from original tutorial with dark mode classes
    <div className={appClasses}>
      <Header />
      
      <main className="grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route
            path="*"
            element={
              <div className={`text-center p-20 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                <h1 className="text-6xl font-bold text-red-600">404</h1>
                <p className="text-2xl mt-4">Page Not Found</p>
                <Link to="/" className="text-blue-600 hover:underline mt-6 inline-block">
                  Go back home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;