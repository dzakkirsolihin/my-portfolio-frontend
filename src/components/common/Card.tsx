import React from 'react';
import { getImageUrl } from '../../utils/image';

interface CardProps {
  image: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  imageClassName?: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, children, className, imageClassName }) => (
  <div className={`bg-white/10 dark:bg-gray-900/10 rounded-2xl p-6 shadow ${className || ''}`}>
    <img
      src={getImageUrl(image)}
      alt={title}
      className={`object-contain w-full h-auto max-h-60 rounded-2xl mb-4 ${imageClassName || ''}`}
    />
    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
    {description && <p className="text-gray-600 dark:text-gray-400 mb-2">{description}</p>}
    {children}
  </div>
);

export default Card; 