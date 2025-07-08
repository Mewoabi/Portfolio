import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load pages
import { lazy, Suspense } from 'react';
const HomePage = lazy(() => import('./pages/HomePage')); // New consolidated page
const Blog = lazy(() => import('./pages/Blog'));
const Login = lazy(() => import('./pages/Login'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminBlogPosts = lazy(() => import('./pages/admin/BlogPosts'));
const AdminProjects = lazy(() => import('./pages/admin/Projects'));
const AdminMessages = lazy(() => import('./pages/admin/Messages'));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public Routes */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/blog" element={<Blog />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="blog" element={<AdminBlogPosts />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="messages" element={<AdminMessages />} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
