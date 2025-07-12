import React from 'react';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex justify-center items-center min-h-[100px]">
    <span className="text-lg text-red-600 dark:text-red-400">{message}</span>
  </div>
);

export default ErrorMessage; 