import React, { useState, useEffect } from 'react';
import { Calendar, Users, User, ExternalLink, ArrowLeft, Eye } from 'lucide-react';
import { Project } from '../../types';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { getImageUrl } from '../../utils/image';
import Card from '../common/Card';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    apiService.getProjects()
      .then((data) => {
        setProjects(
          data.map((proj: any) => ({
            ...proj,
            previewImage: proj.preview_image,
            isDeployed: !!proj.is_deployed,
            lastUpdated: proj.last_updated,
            projectType: proj.project_type,
            teamSize: proj.team_size,
            keyFeatures: proj.key_features,
            technologies: proj.technologies,
            deploymentUrl: proj.deployment_url,
            galleryImages: proj.gallery_images,
          }))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading projects..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (selectedProject) {
    return (
      <div className="min-h-screen pt-32 md:pt-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </button>

          {/* Project Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedProject.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <span>Last updated: {new Date(selectedProject.lastUpdated).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                {selectedProject.projectType === 'Team' ? <Users size={16} /> : <User size={16} />}
                <span>
                  {selectedProject.projectType}
                  {selectedProject.teamSize && ` (${selectedProject.teamSize} members)`}
                </span>
              </div>
            </div>
          </div>

          {/* Project Image */}
          <div className="mb-12">
            <img
              src={getImageUrl(selectedProject.previewImage)}
              alt={selectedProject.title}
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>

          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Overview */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedProject.overview}
                </p>
              </section>

              {/* Key Features */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {selectedProject.keyFeatures?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Outcome */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Outcome
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedProject.outcome}
                </p>
              </section>

              {/* Gallery or Live Link */}
              {selectedProject.isDeployed ? (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Live Website
                  </h2>
                  <a
                    href={selectedProject.deploymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    <ExternalLink size={20} />
                    <span>Visit Website</span>
                  </a>
                </section>
              ) : (
                selectedProject.galleryImages && (
                  <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Project Gallery
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.galleryImages.map((image: string, index: number) => (
                        <img
                          key={index}
                          src={getImageUrl(image)}
                          alt={`${selectedProject.title} screenshot ${index + 1}`}
                          className="object-contain w-full max-h-96 rounded-lg"
                        />
                      ))}
                    </div>
                  </section>
                )
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Technology Stack */}
              <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Technology Stack
                </h3>
                <div className="space-y-2">
                  {selectedProject.technologies?.map((tech: string) => (
                    <span
                      key={tech}
                      className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Project Info
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Type:</span>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {selectedProject.projectType}
                      {selectedProject.teamSize && ` (${selectedProject.teamSize} members)`}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Last Updated:</span>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {new Date(selectedProject.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Status:</span>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {selectedProject.isDeployed ? 'Live' : 'In Development'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    }

  return (
    <div className="min-h-screen pt-32 md:pt-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of projects that showcase my skills in full-stack development, 
            from concept to deployment.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col h-full border border-white/20 dark:border-gray-700/20 transition hover:scale-105"
            >
              {/* Gambar */}
              <div className="aspect-[16/9] w-full overflow-hidden rounded-t-xl bg-gray-800">
                <img
                  src={getImageUrl(project.previewImage)}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Konten */}
              <div className="flex flex-col flex-1 p-5">
                <h2 className="text-lg font-bold text-white mb-1 line-clamp-2">{project.title}</h2>
                <span className="text-xs text-gray-400 mb-2">{new Date(project.lastUpdated).toLocaleDateString()}</span>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.overview}</p>
                <div className="mt-auto">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    View Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;