import React from 'react';
import { Calendar, GraduationCap, BookOpen, Award } from 'lucide-react';
import { Education as EducationType } from '../data/education';

interface EducationProps {
  education: EducationType;
  className?: string;
}

const Education: React.FC<EducationProps> = ({ education, className = '' }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'formal':
        return GraduationCap;
      case 'course':
        return BookOpen;
      case 'certification':
        return Award;
      default:
        return GraduationCap;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'formal':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'course':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'certification':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'formal':
        return 'Formal Education';
      case 'course':
        return 'Course';
      case 'certification':
        return 'Certification';
      default:
        return 'Education';
    }
  };

  const IconComponent = getTypeIcon(education.type);

  return (
    <div className={`bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-transform duration-300 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <IconComponent size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {education.degree}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold">
                  {education.institution}
                </p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(education.type)}`}>
              {getTypeLabel(education.type)}
            </span>
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
          <Calendar size={16} />
          <span>{education.startDate} - {education.endDate}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {education.description}
        </p>
      </div>
    </div>
  );
};

export default Education; 