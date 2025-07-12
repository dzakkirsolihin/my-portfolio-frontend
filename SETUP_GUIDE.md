# Frontend Setup Guide

This guide will help you set up the React frontend to connect with the Laravel backend.

## 🚀 Quick Setup Steps

### 1. Create .env File
Create a `.env` file in the frontend directory:
```bash
# frontend/.env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

## 🔧 Configuration

### Environment Variables
The frontend needs these environment variables:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api

# App Configuration
VITE_APP_NAME=Portfolio
```

### API Service Configuration
The API service is configured in `src/services/api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

## 🧪 Testing the Connection

### 1. Check if Backend is Running
Make sure your Laravel backend is running on `http://localhost:8000`

### 2. Test API Connection
Open browser console and test:
```javascript
fetch('http://localhost:8000/api/projects')
  .then(response => response.json())
  .then(data => console.log(data));
```

### 3. Test Login
Use these credentials in the admin panel:
- **Email:** admin@portfolio.com
- **Password:** admin123

## 🔍 Troubleshooting

### 404 Error on API Calls
1. **Check if backend is running:**
   ```bash
   # In backend directory
   php artisan serve
   ```

2. **Verify API URL in .env:**
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

3. **Check browser console for CORS errors**

### CORS Issues
1. **Check if frontend URL is in backend CORS config:**
   ```php
   // backend/config/cors.php
   'allowed_origins' => ['http://localhost:5173', 'http://localhost:5174'],
   ```

2. **Clear backend cache:**
   ```bash
   php artisan config:clear
   ```

### Environment Variables Not Loading
1. **Restart development server:**
   ```bash
   npm run dev
   ```

2. **Check .env file location:**
   - Must be in `frontend/` directory
   - Must be named `.env` (not `.env.local`)

## 📁 File Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminPanel.tsx
│   │   │   └── Login.tsx
│   │   ├── sections/
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Home.tsx
│   │   │   └── Projects.tsx
│   │   ├── Education.tsx
│   │   ├── SocialLinks.tsx
│   │   └── WorkExperience.tsx
│   ├── data/
│   │   ├── education.ts
│   │   ├── mockData.ts
│   │   ├── socialLinks.ts
│   │   └── workExperience.ts
│   ├── services/
│   │   └── api.ts
│   └── types/
│       └── index.ts
├── .env
└── package.json
```

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=Portfolio
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔗 API Endpoints Used

### Authentication
- `POST /api/login` - Login user
- `POST /api/logout` - Logout user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/{id}` - Update project
- `DELETE /api/admin/projects/{id}` - Delete project

### Certificates
- `GET /api/certificates` - Get all certificates
- `POST /api/admin/certificates` - Create certificate
- `PUT /api/admin/certificates/{id}` - Update certificate
- `DELETE /api/admin/certificates/{id}` - Delete certificate

## 🎯 Features

### Admin Panel
- Login/logout functionality
- CRUD operations for projects
- CRUD operations for certificates
- Secure authentication with Sanctum

### Public Pages
- Home page with featured content
- About page with experience, education, certificates
- Projects page with portfolio showcase
- Contact page with form (frontend only)

### Responsive Design
- Mobile-first approach
- Dark/light theme support
- Modern UI with Tailwind CSS 