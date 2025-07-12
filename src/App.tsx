import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './components/sections/Home';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import Login from './components/admin/Login';
import AdminPanel from './components/admin/AdminPanel';
import { Settings } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectDetail from './components/sections/ProjectDetail'; // (akan dibuat)

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAuth();

  // Admin panel access
  if (user?.isAuthenticated) {
    return <AdminPanel />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home onSectionChange={setActiveSection} />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-green-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Admin Access Button */}
      <button
        onClick={() => setShowLogin(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gray-800/20 dark:bg-gray-200/20 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 z-40"
        title="Admin Access"
      >
        <Settings size={20} />
      </button>

      {/* Main Content */}
      <main className="relative z-10">
        {renderSection()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;