import React from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';
import { WorkExperience as WorkExperienceType } from '../data/workExperience';

interface WorkExperienceProps {
  experience: WorkExperienceType;
  className?: string;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ experience, className = '' }) => {
  return (
    <div className={`bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-transform duration-300 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {experience.position}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Building size={16} />
              <span>{experience.company}</span>
            </div>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium">
              {experience.employmentType}
            </span>
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
          <Calendar size={16} />
          <span>{experience.startDate} - {experience.endDate}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {experience.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience; 