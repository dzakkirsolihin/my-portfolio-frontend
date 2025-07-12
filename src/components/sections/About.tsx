import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { workExperience } from '../../data/workExperience';
import { education } from '../../data/education';
import WorkExperience from '../WorkExperience';
import Education from '../Education';
import { skills } from '../../data/skills';
import { apiService } from '../../services/api';
import { getImageUrl } from '../../utils/image';
import Card from '../common/Card';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

// Certificate type (should match backend)
type Certificate = {
  id: number;
  name: string;
  issuingOrganization: string;
  associatedSkills: string[];
  image: string;
  issueDate: string;
};

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [certLoading, setCertLoading] = useState(true);
  const [certError, setCertError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'certificates') {
      setCertLoading(true);
      apiService.getCertificates()
        .then((data) => {
          // Map backend snake_case to camelCase if needed
          setCertificates(
            data.map((cert: any) => ({
              ...cert,
              issuingOrganization: cert.issuing_organization,
              associatedSkills: cert.associated_skills,
              image: cert.image,
              issueDate: cert.issue_date,
            }))
          );
          setCertLoading(false);
        })
        .catch((err) => {
          setCertError(err.message);
          setCertLoading(false);
        });
    }
  }, [activeTab]);

  const tabs = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'skills', label: 'Skills', icon: Code },
  ];

  return (
    <div className="min-h-screen pt-32 md:pt-24 px-6 md:px-12 lg:px-24">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          About Me
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1 flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1">
                  <img
                    src="/profile-about.png"
                  alt="Dzakkir Kilman"
                    className="w-full h-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 text-left space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Muhammad Dzakkir Kilman Solihin
                </h2>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin size={16} className="mr-2" />
                  <span>Bandung, West Java, Indonesia</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm a passionate Full Stack Developer with a strong focus on creating innovative 
                web solutions that deliver exceptional user experiences. With expertise in modern 
                technologies like React, Laravel, and cloud platforms, I enjoy tackling complex 
                challenges and turning ideas into reality.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Currently pursuing my Bachelor's degree in Software Engineering while actively 
                seeking internship opportunities to apply my skills in real-world projects 
                and contribute to meaningful software development initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white/10 dark:bg-gray-900/10 text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20'
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto">
        {activeTab === 'experience' && (
          <div className="space-y-8">
            {workExperience.map((exp) => (
              <WorkExperience key={exp.id} experience={exp} />
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-8">
            {education.map((edu) => (
              <Education key={edu.id} education={edu} />
            ))}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certLoading ? (
              <LoadingSpinner text="Loading certificates..." />
            ) : certError ? (
              <ErrorMessage message={certError} />
            ) : certificates.length === 0 ? (
              <div className="col-span-full flex justify-center items-center min-h-[200px]">
                <span className="text-lg text-gray-600 dark:text-gray-300">No certificates found.</span>
              </div>
            ) : (
              certificates.map((cert) => (
                <Card
                  key={cert.id}
                  image={cert.image}
                  title={cert.name}
                  description={cert.issuingOrganization}
                  imageClassName="max-h-40"
                >
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                    <Calendar size={14} className="mr-2" />
                    <span>{new Date(cert.issueDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {cert.associatedSkills.slice(0, 3).map((skill: string) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.associatedSkills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs">
                        +{cert.associatedSkills.length - 3}
                      </span>
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-8 border border-white/20 dark:border-gray-700/20">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Technical skills
                </h3>
              <div className="flex flex-wrap gap-8 items-center justify-center">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex flex-col items-center">
                    <div className="mb-2">{skill.icon}</div>
                    <span className="font-semibold text-white text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;