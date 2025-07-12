import React, { useEffect, useState } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { socialLinks } from '../../data/socialLinks';
import SocialLinks from '../SocialLinks';
import { getImageUrl } from '../../utils/image';
import Card from '../common/Card';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

interface HomeProps {
  onSectionChange: (section: string) => void;
}

const Home: React.FC<HomeProps> = ({ onSectionChange }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('/api/projects').then((res) => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      }),
      fetch('/api/certificates').then((res) => {
        if (!res.ok) throw new Error('Failed to fetch certificates');
        return res.json();
      })
    ])
      .then(([projectsData, certificatesData]) => {
        setProjects(projectsData);
        setCertificates(certificatesData.map((cert: any) => ({
          ...cert,
          issuingOrganization: cert.issuing_organization,
          associatedSkills: cert.associated_skills,
          image: cert.image,
          issueDate: cert.issue_date,
        })));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const featuredProject = projects[0];
  const featuredCertificates = certificates.slice(0, 2);

  if (loading) {
    return <LoadingSpinner text="Loading..." />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen pt-20 md:pt-0 px-6 md:px-12 lg:px-24">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="text-gray-900 dark:text-white">Hi, I'm</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Dzakkir Kilman
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                Full Stack Developer
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg">
                Passionate about creating innovative web solutions that bridge the gap between 
                design and functionality. Currently seeking internship opportunities to grow 
                and contribute to impactful projects.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onSectionChange('projects')}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <span>View My Work</span>
                <ArrowRight size={20} />
              </button>
              <button className="flex items-center justify-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                <Download size={20} />
                <span>Download CV</span>
              </button>
            </div>

            <SocialLinks links={socialLinks} />
          </div>

          {/* Right Content - Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-2">
                  <img
                    src="/profile-home.png"
                    alt="Alex Johnson"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-70"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Project Section */}
      <div className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Project
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Take a look at my latest work that showcases my skills and passion for development
          </p>
        </div>

        {featuredProject ? (
          <Card
            image={featuredProject.previewImage || featuredProject.preview_image || ''}
            title={featuredProject.title}
            description={featuredProject.overview}
            className="max-w-2xl mx-auto"
          >
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {featuredProject.technologies?.slice(0, 4).map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={() => onSectionChange('projects')}
              className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </button>
          </Card>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400">No featured project found.</div>
        )}
      </div>

      {/* Certificates Preview */}
      <div className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Continuous learning and professional development through industry-recognized certifications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {featuredCertificates.map((cert) => (
            <Card
              key={cert.id}
              image={cert.image}
              title={cert.name}
              description={cert.issuingOrganization}
              imageClassName="max-h-32"
            >
              <div className="flex flex-wrap gap-1 justify-center mb-2">
                {cert.associatedSkills?.slice(0, 3).map((skill: string) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onSectionChange('about')}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline mx-auto"
          >
            <span>View All Certificates</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;