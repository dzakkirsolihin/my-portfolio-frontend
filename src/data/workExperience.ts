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

export const workExperience: WorkExperience[] = [
  {
    id: '1',
    position: 'Full Stack Web Developer',
    employmentType: 'Contract',
    company: 'Baitush Sholihin Bandung Foundation',
    startDate: 'September 2024',
    endDate: 'January 2025',
    description: 'Contracted as a Full Stack Developer to deliver a responsive corporate website and a GPS- and photo-based attendance system using Laravel, Tailwind, JavaScript, and MySQL. Key features include educator geolocation and image-based authentication for teacher attendance, plus student attendance tracking.',
    skills: ['Laravel', 'PHP', 'JavaScript', 'MySQL', 'Git', 'GitHub']
  }
]; 