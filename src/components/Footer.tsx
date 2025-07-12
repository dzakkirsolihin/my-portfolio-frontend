import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-t border-white/20 dark:border-gray-700/20 py-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
          <span>© 2025 Dzakkir Kilman. Made with</span>
          <Heart size={16} className="text-red-500 fill-current" />
          <span>using React & Laravel</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
          Full Stack Developer | Bandung, Indonesia
        </p>
      </div>
    </footer>
  );
};

export default Footer;