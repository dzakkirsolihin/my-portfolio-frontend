export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
  type: 'formal' | 'course' | 'certification';
}

export const education: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Software Engineering',
    institution: 'Universitas Pendidikan Indonesia',
    startDate: '2022',
    endDate: 'Present',
    description: 'Currently pursuing Bachelor\'s degree in Software Engineering with focus on software development, web technologies, and database systems.',
    type: 'formal'
  },
  {
    id: '2',
    degree: 'Independent Study on PPDKM UPI Coursera',
    institution: 'Coursera',
    startDate: 'February 2025',
    endDate: 'June 2025',
    description: 'Comprehensive study program covering modern software development practices, tools, and methodologies through Coursera platform.',
    type: 'course'
  }
]; 