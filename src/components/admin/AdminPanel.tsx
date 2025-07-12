import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Edit, Trash2, Save, X, Upload, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Project, Certificate } from '../../types';
import { apiService } from '../../services/api';
import { getImageUrl } from '../../utils/image';

const AdminPanel: React.FC = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorProjects, setErrorProjects] = useState<string | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [loadingCertificates, setLoadingCertificates] = useState(true);
  const [errorCertificates, setErrorCertificates] = useState<string | null>(null);
  const [deletingCertificateId, setDeletingCertificateId] = useState<string | null>(null);

  // Fetch projects from API
  const fetchProjects = () => {
    setLoadingProjects(true);
    apiService.getProjects()
      .then((data) => {
        setProjects(data);
        setLoadingProjects(false);
      })
      .catch((err) => {
        setErrorProjects(err.message);
        setLoadingProjects(false);
      });
  };

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    }
  }, [activeTab]);

  const handleLogout = () => {
    logout();
  };

  // CREATE or UPDATE project
  const handleSaveProject = (project: Project | FormData) => {
    const isEdit = !!editingProject;
    setLoadingProjects(true);
    setErrorProjects(null); // Clear previous errors
    
    if (project instanceof FormData) {
      // Handle file upload
      const projectId = project.get('id') as string;
      if (isEdit && projectId) {
        apiService.updateProject(projectId, project)
          .then(() => {
            setShowProjectForm(false);
            setEditingProject(null);
            fetchProjects();
          })
          .catch((err) => {
            setErrorProjects(err.message);
            setLoadingProjects(false);
          });
      } else {
        apiService.createProject(project)
          .then(() => {
            setShowProjectForm(false);
            setEditingProject(null);
            fetchProjects();
          })
          .catch((err) => {
            setErrorProjects(err.message);
            setLoadingProjects(false);
          });
      }
    } else {
      // Handle JSON data
      if (isEdit && editingProject) {
        apiService.updateProject(editingProject.id, project)
          .then(() => {
            setShowProjectForm(false);
            setEditingProject(null);
            fetchProjects();
          })
          .catch((err) => {
            setErrorProjects(err.message);
            setLoadingProjects(false);
          });
      } else {
        apiService.createProject(project)
          .then(() => {
            setShowProjectForm(false);
            setEditingProject(null);
            fetchProjects();
          })
          .catch((err) => {
            setErrorProjects(err.message);
            setLoadingProjects(false);
          });
      }
    }
  };

  // DELETE project with confirmation
  const handleDeleteProject = (id: string) => {
    setDeletingProjectId(id);
  };
  
  const confirmDeleteProject = (id: string) => {
    setLoadingProjects(true);
    apiService.deleteProject(id)
      .then(() => {
        setDeletingProjectId(null);
        fetchProjects();
      })
      .catch((err) => {
        setErrorProjects(err.message);
        setLoadingProjects(false);
      });
  };

  // Fetch certificates from API
  const fetchCertificates = () => {
    setLoadingCertificates(true);
    apiService.getCertificates()
      .then((data) => {
        setCertificates(
          data.map((cert: any) => ({
            id: cert.id,
            name: cert.name,
            issuingOrganization: cert.issuing_organization,
            associatedSkills: cert.associated_skills,
            image: cert.image,
            issueDate: cert.issue_date,
          }))
        );
        setLoadingCertificates(false);
      })
      .catch((err) => {
        setErrorCertificates(err.message);
        setLoadingCertificates(false);
      });
  };

  useEffect(() => {
    if (activeTab === 'certificates') {
      fetchCertificates();
    }
  }, [activeTab]);

  // CREATE or UPDATE certificate
  const handleSaveCertificate = (certificate: Certificate | FormData) => {
    const isEdit = !!editingCertificate;
    setLoadingCertificates(true);
    setErrorCertificates(null); // Clear previous errors
    
    if (certificate instanceof FormData) {
      // Handle file upload
      const certId = certificate.get('id') as string;
      if (isEdit && certId) {
        apiService.updateCertificate(certId, certificate)
          .then(() => {
            setShowCertificateForm(false);
            setEditingCertificate(null);
            fetchCertificates();
          })
          .catch((err) => {
            setErrorCertificates(err.message);
            setLoadingCertificates(false);
          });
      } else {
        apiService.createCertificate(certificate)
          .then(() => {
            setShowCertificateForm(false);
            setEditingCertificate(null);
            fetchCertificates();
          })
          .catch((err) => {
            setErrorCertificates(err.message);
            setLoadingCertificates(false);
          });
      }
    } else {
      // Handle JSON data - Map camelCase to snake_case for backend
      const { issuingOrganization, associatedSkills, issueDate, ...rest } = certificate;
      const payload = {
        ...rest,
        issuing_organization: issuingOrganization,
        associated_skills: associatedSkills,
        issue_date: issueDate,
      };
      
      if (isEdit && editingCertificate) {
        apiService.updateCertificate(editingCertificate.id, payload)
          .then(() => {
            setShowCertificateForm(false);
            setEditingCertificate(null);
            fetchCertificates();
          })
          .catch((err) => {
            setErrorCertificates(err.message);
            setLoadingCertificates(false);
          });
      } else {
        apiService.createCertificate(payload)
          .then(() => {
            setShowCertificateForm(false);
            setEditingCertificate(null);
            fetchCertificates();
          })
          .catch((err) => {
            setErrorCertificates(err.message);
            setLoadingCertificates(false);
          });
      }
    }
  };

  // DELETE certificate with confirmation
  const handleDeleteCertificate = (id: string) => {
    setDeletingCertificateId(id);
  };
  
  const confirmDeleteCertificate = (id: string) => {
    setLoadingCertificates(true);
    apiService.deleteCertificate(id)
      .then(() => {
        setDeletingCertificateId(null);
        fetchCertificates();
      })
      .catch((err) => {
        setErrorCertificates(err.message);
        setLoadingCertificates(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Panel
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <div className="p-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'projects'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Manage Projects
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === 'certificates'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Manage Certificates
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Projects
                </h2>
                <button
                  onClick={() => setShowProjectForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  title="Add Project"
                >
                  <Plus size={20} />
                  <span>Add Project</span>
                </button>
              </div>

              {loadingProjects ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <span className="text-lg text-gray-600 dark:text-gray-300">Loading projects...</span>
                </div>
              ) : errorProjects ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <span className="text-lg text-red-600 dark:text-red-400">{errorProjects}</span>
                </div>
              ) : projects.length === 0 ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <span className="text-lg text-gray-600 dark:text-gray-300">No projects found.</span>
                </div>
              ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <img
                      src={getImageUrl(project.previewImage || (project as any).preview_image || '')}
                      alt={project.title}
                      className="w-full h-32 object-contain rounded-2xl"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {project.overview}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.isDeployed 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        }`}>
                          {project.isDeployed ? 'Live' : 'Development'}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingProject(project);
                              setShowProjectForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="Edit Project"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                              title="Delete Project"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}

              {/* Delete Confirmation Dialog */}
              {deletingProjectId && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirm Delete</h3>
                    <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this project? This action cannot be undone.</p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setDeletingProjectId(null)}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => confirmDeleteProject(deletingProjectId)}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Certificates
                </h2>
                <button
                  onClick={() => setShowCertificateForm(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  title="Add Certificate"
                >
                  <Plus size={20} />
                  <span>Add Certificate</span>
                </button>
              </div>

              {loadingCertificates ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <span className="text-lg text-gray-600 dark:text-gray-300">Loading certificates...</span>
                </div>
              ) : errorCertificates ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <span className="text-lg text-red-600 dark:text-red-400">{errorCertificates}</span>
                </div>
              ) : certificates.length === 0 ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <span className="text-lg text-gray-600 dark:text-gray-300">No certificates found.</span>
                </div>
              ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((certificate) => (
                  <div key={certificate.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <img
                      src={getImageUrl(certificate.image)}
                      alt={certificate.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {certificate.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {certificate.issuingOrganization}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(certificate.issueDate).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingCertificate(certificate);
                              setShowCertificateForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="Edit Certificate"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCertificate(certificate.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                              title="Delete Certificate"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}

              {/* Delete Confirmation Dialog */}
              {deletingCertificateId && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md">
                    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Confirm Delete</h3>
                    <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this certificate? This action cannot be undone.</p>
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setDeletingCertificateId(null)}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => confirmDeleteCertificate(deletingCertificateId)}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <ProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => {
            setShowProjectForm(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* Certificate Form Modal */}
      {showCertificateForm && (
        <CertificateForm
          certificate={editingCertificate}
          onSave={handleSaveCertificate}
          onClose={() => {
            setShowCertificateForm(false);
            setEditingCertificate(null);
          }}
        />
      )}
    </div>
  );
};

// Project Form Component
const ProjectForm: React.FC<{
  project: Project | null;
  onSave: (project: Project | FormData) => void;
  onClose: () => void;
}> = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Project>>(
    project || {
      title: '',
      lastUpdated: new Date().toISOString().split('T')[0],
      projectType: 'Individual',
      teamSize: undefined,
      previewImage: '',
      overview: '',
      keyFeatures: [''],
      technologies: [''],
      outcome: '',
      isDeployed: false,
      deploymentUrl: '',
      galleryImages: [''],
    }
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(project?.previewImage || '');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(formData.galleryImages?.filter(img => !!img) || []);

  // Tambahkan useEffect untuk update formData dan imagePreview saat project berubah
  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        previewImage: project.previewImage || (project as any).preview_image || '',
        galleryImages: project.galleryImages || (project as any).gallery_images || [],
      });
      setImagePreview(getImageUrl(project.previewImage || (project as any).preview_image || ''));
    }
  }, [project]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(files);
    setGalleryPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title || '');
    data.append('last_updated', formData.lastUpdated || '');
    data.append('project_type', formData.projectType || 'Individual');
    data.append('overview', formData.overview || '');
    data.append('outcome', formData.outcome || '');
    data.append('is_deployed', formData.isDeployed ? '1' : '0');
    data.append('deployment_url', formData.deploymentUrl || '');
    if (formData.teamSize !== undefined) data.append('team_size', String(formData.teamSize));
    (formData.keyFeatures || []).forEach((f, i) => data.append(`key_features[${i}]`, f));
    (formData.technologies || []).forEach((t, i) => data.append(`technologies[${i}]`, t));
    // Gallery images: append files if any, else append existing URLs
    if (galleryFiles.length > 0) {
      galleryFiles.forEach((file, i) => data.append(`galleryImages[${i}]`, file));
    } else if (formData.galleryImages) {
      formData.galleryImages.forEach((img, i) => data.append(`gallery_images[${i}]`, img));
    }
    if (imageFile) {
      data.append('previewImage', imageFile);
    } else if (formData.previewImage) {
      data.append('preview_image', formData.previewImage);
    }
    if (project && project.id) data.append('id', String(project.id));
    onSave(data);
  };

  const addArrayField = (field: 'keyFeatures' | 'technologies' | 'galleryImages') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), '']
    }));
  };

  const updateArrayField = (field: 'keyFeatures' | 'technologies' | 'galleryImages', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'keyFeatures' | 'technologies' | 'galleryImages', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" title="Close">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
                placeholder="Project Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Last Updated
              </label>
              <input
                type="date"
                value={formData.lastUpdated || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, lastUpdated: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
                placeholder="Last Updated"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Type
              </label>
              <select
                value={formData.projectType || 'Individual'}
                onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value as 'Individual' | 'Team' }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                title="Project Type"
              >
                <option value="Individual">Individual</option>
                <option value="Team">Team</option>
              </select>
            </div>

            {formData.projectType === 'Team' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Team Size
                </label>
                <input
                  type="number"
                  value={formData.teamSize ?? ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, teamSize: e.target.value === '' ? undefined : Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Team Size"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preview Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required={!project}
              title="Upload Preview Image"
            />
            {imagePreview && (
              <img
                src={getImageUrl(imagePreview)}
                alt="Preview"
                className="mt-2 w-40 h-32 object-cover rounded-lg border"
            />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Overview
            </label>
            <textarea
              value={formData.overview || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
              placeholder="Project Overview"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Key Features
            </label>
            {(formData.keyFeatures || []).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateArrayField('keyFeatures', index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter a key feature"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('keyFeatures', index)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove Feature"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('keyFeatures')}
              className="text-blue-600 hover:text-blue-800 text-sm"
              title="Add Feature"
            >
              + Add Feature
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technologies
            </label>
            {(formData.technologies || []).map((tech, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => updateArrayField('technologies', index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter a technology"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('technologies', index)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove Technology"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('technologies')}
              className="text-blue-600 hover:text-blue-800 text-sm"
              title="Add Technology"
            >
              + Add Technology
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Outcome
            </label>
            <textarea
              value={formData.outcome || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, outcome: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
              placeholder="Project Outcome"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!!formData.isDeployed}
                onChange={(e) => setFormData(prev => ({ ...prev, isDeployed: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Project is deployed
              </span>
            </label>
          </div>

          {formData.isDeployed ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deployment URL
              </label>
              <input
                type="url"
                value={formData.deploymentUrl || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, deploymentUrl: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Deployment URL"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gallery Images
              </label>
                  <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                title="Upload Gallery Images"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {galleryPreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Gallery Preview ${idx + 1}`}
                    className="w-24 h-20 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title="Cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              title="Save Project"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Certificate Form Component
const CertificateForm: React.FC<{
  certificate: Certificate | null;
  onSave: (certificate: Certificate | FormData) => void;
  onClose: () => void;
}> = ({ certificate, onSave, onClose }) => {
  const [formData, setFormData] = useState<Partial<Certificate>>(
    certificate || {
      name: '',
      issuingOrganization: '',
      associatedSkills: [''],
      image: '',
      issueDate: new Date().toISOString().split('T')[0],
    }
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(certificate?.image || '');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name || '');
    data.append('issuing_organization', formData.issuingOrganization || '');
    data.append('issue_date', formData.issueDate || '');
    (formData.associatedSkills || []).forEach((s, i) => data.append(`associated_skills[${i}]`, s));
    if (imageFile) {
      data.append('image', imageFile);
    } else if (formData.image) {
      data.append('image', formData.image);
    }
    if (certificate && certificate.id) data.append('id', String(certificate.id));
    onSave(data);
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      associatedSkills: [...(prev.associatedSkills || []), '']
    }));
  };

  const updateSkill = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      associatedSkills: (prev.associatedSkills || []).map((skill, i) => i === index ? value : skill)
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      associatedSkills: (prev.associatedSkills || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {certificate ? 'Edit Certificate' : 'Add New Certificate'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" title="Close">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Certificate Name
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
              placeholder="Certificate Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Issuing Organization
            </label>
            <input
              type="text"
              value={formData.issuingOrganization || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, issuingOrganization: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
              placeholder="Issuing Organization"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Certificate Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required={!certificate}
              title="Upload Certificate Image"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-40 h-32 object-cover rounded-lg border"
            />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Issue Date
            </label>
            <input
              type="date"
              value={formData.issueDate || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, issueDate: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              required
              placeholder="Issue Date"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Associated Skills
            </label>
            {(formData.associatedSkills || []).map((skill, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  placeholder="Enter a skill"
                />
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove Skill"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="text-blue-600 hover:text-blue-800 text-sm"
              title="Add Skill"
            >
              + Add Skill
            </button>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title="Cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              title="Save Certificate"
            >
              Save Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;