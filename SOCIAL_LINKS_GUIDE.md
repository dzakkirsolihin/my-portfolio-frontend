# Social Links & Contact Information System

This guide explains how to use the centralized social links and contact information system for easy maintenance.

## 📁 File Structure

```
src/
├── data/
│   └── socialLinks.ts          # Centralized data for social links & contact info
├── components/
│   ├── SocialLinks.tsx         # Reusable social links component
│   └── ContactInfo.tsx         # Reusable contact info component
└── components/sections/
    ├── Home.tsx                # Uses SocialLinks component
    └── Contact.tsx             # Uses both SocialLinks & ContactInfo components
```

## 🔧 How to Update Social Links

### 1. Update Social Media URLs
Edit `src/data/socialLinks.ts`:

```typescript
// Update these URLs
export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/your-username', // ← Change this
    icon: 'github',
    color: 'text-gray-600 dark:text-gray-400',
    hoverColor: 'hover:text-gray-900 dark:hover:text-white'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/your-profile', // ← Change this
    icon: 'linkedin',
    color: 'text-gray-600 dark:text-gray-400',
    hoverColor: 'hover:text-blue-600 dark:hover:text-blue-400'
  },
  // Add more social links here...
];
```

### 2. Update Contact Information
Edit `src/data/socialLinks.ts`:

```typescript
// Update contact details
export const contactInfo: ContactInfo = {
  email: 'your.email@example.com',        // ← Change this
  phone: '+62 812-3456-7890',            // ← Change this
  location: 'Your City, Country',         // ← Change this
  whatsapp: '6281234567890'              // ← Change this
};
```

## 🎨 How to Use Components

### SocialLinks Component
```tsx
import SocialLinks from '../components/SocialLinks';
import { socialLinks, contactSocialLinks } from '../data/socialLinks';

// Default variant (simple icons)
<SocialLinks links={socialLinks} />

// Contact variant (styled buttons)
<SocialLinks links={contactSocialLinks} variant="contact" />
```

### ContactInfo Component
```tsx
import ContactInfo from '../components/ContactInfo';

// Displays email, phone, and location
<ContactInfo />
```

## ✨ Benefits

1. **Single Source of Truth**: All social links and contact info in one file
2. **Easy Maintenance**: Change URLs once, updates everywhere
3. **Reusable Components**: Use the same components across different pages
4. **Type Safety**: TypeScript interfaces ensure data consistency
5. **Flexible Styling**: Different variants for different use cases

## 🔄 Adding New Social Platforms

1. **Add to data file** (`src/data/socialLinks.ts`):
```typescript
{
  name: 'Twitter',
  url: 'https://twitter.com/your-handle',
  icon: 'twitter',
  color: 'text-gray-600 dark:text-gray-400',
  hoverColor: 'hover:text-blue-400'
}
```

2. **Add icon to component** (`src/components/SocialLinks.tsx`):
```typescript
import { Twitter } from 'lucide-react';

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter, // ← Add this
};
```

## 📝 Notes

- The system automatically generates `mailto:` links for email
- WhatsApp links are automatically formatted with `https://wa.me/`
- All links open in new tabs (`target="_blank"`)
- Components are responsive and support dark mode 