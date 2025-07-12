# Work Experience System

This guide explains how to use the centralized work experience system for easy maintenance.

## 📁 File Structure

```
src/
├── data/
│   └── workExperience.ts       # Centralized work experience data
├── components/
│   └── WorkExperience.tsx      # Reusable work experience component
└── components/sections/
    └── About.tsx               # Uses WorkExperience component
```

## 🔧 How to Update Work Experience

### 1. Update Work Experience Data
Edit `src/data/workExperience.ts`:

```typescript
export const workExperience: WorkExperience[] = [
  {
    id: '1',
    position: 'Full Stack Web Developer',
    employmentType: 'Contract',
    company: 'Baitush Sholihin Bandung Foundation',
    startDate: 'September 2024',
    endDate: 'January 2025',
    description: 'Your job description here...',
    skills: ['Laravel', 'PHP', 'JavaScript', 'MySQL', 'Git', 'GitHub']
  },
  // Add more work experience here...
];
```

### 2. Add New Work Experience
Simply add a new object to the array:

```typescript
{
  id: '2',
  position: 'Your Position',
  employmentType: 'Full-time/Part-time/Contract/Internship',
  company: 'Company Name',
  startDate: 'Start Date',
  endDate: 'End Date',
  description: 'Detailed description of your role and achievements...',
  skills: ['Skill1', 'Skill2', 'Skill3']
}
```

## 🎨 How to Use WorkExperience Component

```tsx
import WorkExperience from '../components/WorkExperience';
import { workExperience } from '../data/workExperience';

// Display single work experience
<WorkExperience experience={workExperience[0]} />

// Display all work experience
{workExperience.map((exp) => (
  <WorkExperience key={exp.id} experience={exp} />
))}
```

## ✨ Features

1. **Clean Design**: Modern card layout with hover effects
2. **Employment Type Badge**: Visual indicator for contract/full-time/etc.
3. **Skills Display**: Technology stack shown as colored badges
4. **Responsive**: Works on all screen sizes
5. **Dark Mode Support**: Automatic theme switching
6. **Type Safety**: TypeScript interfaces ensure data consistency

## 📝 Data Structure

```typescript
interface WorkExperience {
  id: string;              // Unique identifier
  position: string;        // Job title
  employmentType: string;  // Contract, Full-time, Part-time, etc.
  company: string;         // Company name
  startDate: string;       // Start date (e.g., "September 2024")
  endDate: string;         // End date (e.g., "January 2025")
  description: string;     // Job description and achievements
  skills: string[];        // Array of skills/technologies used
}
```

## 🎯 Benefits

1. **Single Source of Truth**: All work experience data in one file
2. **Easy Maintenance**: Update once, changes everywhere
3. **Reusable Component**: Can be used in different sections
4. **Consistent Styling**: Uniform appearance across the app
5. **Scalable**: Easy to add more work experience entries

## 🔄 Adding New Features

To add new features to the WorkExperience component:

1. **Update the interface** in `src/types/index.ts`
2. **Update the data** in `src/data/workExperience.ts`
3. **Update the component** in `src/components/WorkExperience.tsx`

Example: Adding a "Location" field:
```typescript
// In types/index.ts
interface WorkExperience {
  // ... existing fields
  location: string;
}

// In workExperience.ts
{
  // ... existing fields
  location: 'Bandung, Indonesia'
}

// In WorkExperience.tsx
<div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
  <MapPin size={16} />
  <span>{experience.location}</span>
</div>
``` 