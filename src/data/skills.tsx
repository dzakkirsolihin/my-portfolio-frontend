import { LucideIcon, Github, GitBranch, Database, Docker, Cloud, JavaScript, Python } from 'lucide-react';
// Import icon dari react-icons (lebih lengkap dan sesuai logo asli)
import { SiLaravel, SiMysql, SiGithub, SiJavascript, SiPython, SiTensorflow, SiDocker, SiCloudflare, SiPhp, SiCss3, SiPostman, SiFigma, SiExpress } from 'react-icons/si';
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { FaHtml5, FaReact, FaNodeJs, FaJava } from "react-icons/fa";

export interface Skill {
  name: string;
  icon: React.ReactNode;
}

export const skills: Skill[] = [
  { name: 'HTML5', icon: <FaHtml5 size={40} /> },
  { name: 'CSS3', icon: <SiCss3 size={40} /> },
  { name: 'Laravel', icon: <SiLaravel size={40} /> },
  { name: 'MySQL', icon: <SiMysql size={40} /> },
  { name: 'Git', icon: <GitBranch size={40} /> },
  { name: 'GitHub', icon: <SiGithub size={40} /> },
  { name: 'JavaScript', icon: <SiJavascript size={40} /> },
  { name: 'Python', icon: <SiPython size={40} /> },
  { name: 'PHP', icon: <SiPhp size={40} /> },
  { name: 'Java', icon: <FaJava size={40} /> },
  { name: 'Next.JS', icon: <RiNextjsFill size={40} /> },
  { name: 'React.js', icon: <FaReact size={40} /> },
  { name: 'Node.js', icon: <FaNodeJs size={40} /> },
  { name: 'Express.js', icon: <SiExpress size={40} /> },
  { name: 'Tailwind CSS', icon: <RiTailwindCssFill size={40} /> },
  { name: 'Postman', icon: <SiPostman size={40} /> },
  { name: 'Figma', icon: <SiFigma size={40} /> },
];
