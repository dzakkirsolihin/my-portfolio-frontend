# Education System

This guide explains how to use the centralized education system for easy maintenance.

## 📁 File Structure

```
src/
├── data/
│   └── education.ts            # Centralized education data
├── components/
│   └── Education.tsx           # Reusable education component
└── components/sections/
    └── About.tsx               # Uses Education component
```

## 🔧 How to Update Education

### 1. Update Education Data
Edit `src/data/education.ts`:

```typescript
export const education: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Software Engineering',
    institution: 'Universitas Pendidikan Indonesia',
    startDate: '2022',
    endDate: 'Present',
    description: 'Currently pursuing Bachelor\'s degree in Software Engineering...',
    type: 'formal'
  },
  // Add more education entries here...
];
```

### 2. Add New Education Entry
Simply add a new object to the array:

```typescript
{
  id: '3',
  degree: 'Your Degree/Course Name',
  institution: 'Institution Name',
  startDate: 'Start Date',
  endDate: 'End Date',
  description: 'Detailed description of your education...',
  type: 'formal' | 'course' | 'certification'
}
```

## 🎨 How to Use Education Component

```tsx
import Education from '../components/Education';
import { education } from '../data/education';

// Display single education entry
<Education education={education[0]} />

// Display all education entries
{education.map((edu) => (
  <Education key={edu.id} education={edu} />
))}
```

## ✨ Features

1. **Type-Based Styling**: Different colors and icons for formal education, courses, and certifications
2. **Clean Design**: Modern card layout with hover effects
3. **Visual Indicators**: Icons and badges to distinguish education types
4. **Responsive**: Works on all screen sizes
5. **Dark Mode Support**: Automatic theme switching
6. **Type Safety**: TypeScript interfaces ensure data consistency

## 📝 Data Structure

```typescript
interface Education {
  id: string;              // Unique identifier
  degree: string;          // Degree or course name
  institution: string;     // Institution name
  startDate: string;       // Start date (e.g., "2022")
  endDate: string;         // End date (e.g., "Present")
  description: string;     // Detailed description
  type: 'formal' | 'course' | 'certification';  // Education type
}
```

## 🎯 Education Types

### Formal Education
- **Icon**: GraduationCap
- **Color**: Blue
- **Use**: University degrees, formal academic programs

### Course
- **Icon**: BookOpen
- **Color**: Green
- **Use**: Online courses, bootcamps, workshops

### Certification
- **Icon**: Award
- **Color**: Purple
- **Use**: Professional certifications, licenses

## 🎯 Benefits

1. **Single Source of Truth**: All education data in one file
2. **Easy Maintenance**: Update once, changes everywhere
3. **Reusable Component**: Can be used in different sections
4. **Consistent Styling**: Uniform appearance across the app
5. **Scalable**: Easy to add more education entries
6. **Type-Based Organization**: Visual distinction between education types

## 🔄 Adding New Education Types

To add new education types:

1. **Update the interface** in `src/types/index.ts`:
```typescript
type: 'formal' | 'course' | 'certification' | 'workshop' | 'seminar';
```

2. **Update the component** in `src/components/Education.tsx`:
```typescript
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'workshop':
      return Users;
    case 'seminar':
      return Presentation;
    // ... existing cases
  }
};
```

## 📝 Current Education Data

### Formal Education
- **Bachelor of Software Engineering** at Universitas Pendidikan Indonesia (2022 - Present)

### Course
- **Independent Study on PPDKM UPI Coursera** at Coursera (February 2025 - June 2025) 