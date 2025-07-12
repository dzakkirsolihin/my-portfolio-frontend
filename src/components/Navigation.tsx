import React, { useState, useEffect } from 'react';
import { Home, User, Code, Settings, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        // Always show navbar at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center space-x-8">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleSectionChange(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Portfolio
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
          
          {isMobileMenuOpen && (
            <div className="px-6 pb-4">
              <div className="space-y-2">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleSectionChange(id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;