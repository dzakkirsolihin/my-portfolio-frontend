import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SocialLink } from '../data/socialLinks';

interface SocialLinksProps {
  links: SocialLink[];
  variant?: 'default' | 'contact';
  className?: string;
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

const SocialLinks: React.FC<SocialLinksProps> = ({ 
  links, 
  variant = 'default',
  className = ''
}) => {
  if (variant === 'contact') {
    return (
      <div className={`flex space-x-4 ${className}`}>
        {links.map((link) => {
          const IconComponent = iconMap[link.icon as keyof typeof iconMap];
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-lg flex items-center justify-center ${link.color} ${link.hoverColor} transition-all duration-300 hover:scale-110`}
            >
              <IconComponent size={20} />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex space-x-6 ${className}`}>
      {links.map((link) => {
        const IconComponent = iconMap[link.icon as keyof typeof iconMap];
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.color} ${link.hoverColor} transition-colors`}
          >
            <IconComponent size={24} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks; 