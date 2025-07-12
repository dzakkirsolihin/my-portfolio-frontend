import React from 'react';

const LoadingSpinner: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex flex-col justify-center items-center min-h-[100px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
    {text && <span className="text-gray-600 dark:text-gray-300">{text}</span>}
  </div>
);

export default LoadingSpinner; 