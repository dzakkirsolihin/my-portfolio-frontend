import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo } from '../data/socialLinks';

interface ContactDetail {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href: string;
}

const ContactInfo: React.FC = () => {
  const contactDetails: ContactDetail[] = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: contactInfo.phone,
      href: `https://wa.me/${contactInfo.whatsapp}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: contactInfo.location,
      href: '#',
    },
  ];

  return (
    <div className="space-y-6">
      {contactDetails.map(({ icon: Icon, label, value, href }) => (
        <div key={label} className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Icon size={20} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            {href === '#' ? (
              <p className="text-gray-900 dark:text-white font-medium">{value}</p>
            ) : (
              <a
                href={href}
                className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {value}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfo; 