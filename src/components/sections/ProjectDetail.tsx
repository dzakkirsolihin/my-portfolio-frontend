import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { Project } from '../../types';
import { ArrowLeft } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiService.getProjectById(id as string)
      .then(setProject)
      .catch(() => setError('Project not found or error occurred.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!project) return <div className="text-center py-20">No project data.</div>;

  return (
    <div className="min-h-screen pt-32 md:pt-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Projects</span>
        </button>
        {/* ... tampilkan detail project seperti di Projects.tsx */}
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        {/* Tambahkan detail lain sesuai kebutuhan */}
      </div>
    </div>
  );
};

export default ProjectDetail;
