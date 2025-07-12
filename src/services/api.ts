const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Accept': 'application/json',
      ...options.headers,
    };

    // Don't set Content-Type for FormData (browser will set it automatically)
    if (!(options.body instanceof FormData)) {
      (headers as Record<string, string>)['Content-Type'] = 'application/json';
    }

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle validation errors (422)
      if (response.status === 422 && errorData.errors) {
        const validationErrors = Object.entries(errorData.errors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('; ');
        throw new Error(`Validation failed: ${validationErrors}`);
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }

  async logout() {
    await this.request('/logout', { method: 'POST' });
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async getUser() {
    return this.request('/user');
  }

  // Projects
  async getProjects() {
    return this.request('/projects');
  }

  async getProjectById(id: string) {
    return this.request(`/projects/${id}`);
  }

  async createProject(project: any) {
    return this.request('/admin/projects', {
      method: 'POST',
      body: project instanceof FormData ? project : JSON.stringify(project),
    });
  }

  async updateProject(id: string, project: any) {
    return this.request(`/admin/projects/${id}`, {
      method: 'PUT',
      body: project instanceof FormData ? project : JSON.stringify(project),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/admin/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Certificates
  async getCertificates() {
    return this.request('/certificates');
  }

  async getCertificateById(id: string) {
    return this.request(`/certificates/${id}`);
  }

  async createCertificate(certificate: any) {
    return this.request('/admin/certificates', {
      method: 'POST',
      body: certificate instanceof FormData ? certificate : JSON.stringify(certificate),
    });
  }

  async updateCertificate(id: string, certificate: any) {
    return this.request(`/admin/certificates/${id}`, {
      method: 'PUT',
      body: certificate instanceof FormData ? certificate : JSON.stringify(certificate),
    });
  }

  async deleteCertificate(id: string) {
    return this.request(`/admin/certificates/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact
  async sendContactMessage(message: any) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }
}

export const apiService = new ApiService();