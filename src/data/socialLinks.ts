export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
  hoverColor: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  whatsapp: string;
}

// Centralized contact information
export const contactInfo: ContactInfo = {
  email: 'dzakirsolihin@gmail.com',
  phone: '+62 851-6111-5013',
  location: 'Bandung, West Java, Indonesia',
  whatsapp: '6285161115013'
};

// Centralized social media links
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/dzakkirsolihin',
    icon: 'github',
    color: 'text-gray-600 dark:text-gray-400',
    hoverColor: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/muhammad-dzakkir-kilman-solihin',
    icon: 'linkedin',
    color: 'text-gray-600 dark:text-gray-400',
    hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400'
  },
  {
    name: 'Email',
    url: `mailto:${contactInfo.email}`,
    icon: 'mail',
    color: 'text-gray-600 dark:text-gray-400',
    hoverColor: 'hover:text-red-600 dark:hover:text-red-400'
  }
];

// Social links for contact page (with different styling)
export const contactSocialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/dzakkirsolihin',
    icon: 'github',
    color: 'text-gray-600 dark:text-gray-400',
    hoverColor: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/muhammad-dzakkir-kilman-solihin',
    icon: 'linkedin',
    color: 'text-gray-600 dark:text-gray-400',
    hoverColor: 'hover:text-blue-600'
  },
  {
    name: 'Email',
    url: `mailto:${contactInfo.email}`,
    icon: 'mail',
    color: 'text-gray-600 dark:text-gray-400',
    hoverColor: 'hover:text-red-600'
  }
]; 