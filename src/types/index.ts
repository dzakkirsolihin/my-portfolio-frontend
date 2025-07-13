export interface Project {
  id: string;
  title: string;
  lastUpdated: string;
  projectType: 'Individual' | 'Team';
  teamSize?: number;
  previewImage: string;
  overview: string;
  keyFeatures: string[];
  technologies: string[];
  outcome: string;
  isDeployed: boolean;
  deploymentUrl?: string;
  galleryImages?: string[];
  githubRepoUrl?: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuingOrganization: string;
  associatedSkills: string[];
  image: string;
  issueDate: string;
}

export interface WorkExperience {
  id: string;
  position: string;
  employmentType: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  skills: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
  type: 'formal' | 'course' | 'certification';
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}