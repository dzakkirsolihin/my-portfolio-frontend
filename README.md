# Dynamic Web Portfolio

A modern, responsive portfolio website built with React frontend and designed for Laravel backend integration. Features a beautiful dark/light theme, admin panel, and production-ready deployment options.

## 🚀 Features

### Frontend (React)
- **Modern Design**: Minimalist design with blur backgrounds and gradient effects
- **Dark/Light Theme**: Toggle between themes with persistent storage
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Micro-interactions and hover effects
- **Admin Panel**: Secure admin interface for content management

### Backend Integration (Laravel)
- **Authentication**: Secure admin login system
- **Project Management**: CRUD operations for portfolio projects
- **Certificate Management**: Manage certifications and skills
- **Contact Form**: Email integration for contact submissions
- **File Upload**: Image upload for projects and certificates

## 📱 Sections

1. **Home**: Hero section with profile, featured project, and certificates preview
2. **About**: Personal information, experience, education, certificates, and skills
3. **Projects**: Portfolio showcase with detailed project pages
4. **Contact**: Contact form and social links
5. **Admin Panel**: Content management system (authenticated access only)

## 🛠 Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Context API for state management
- Vite for development and building

### Backend (Laravel Integration Ready)
- Laravel 12 with authentication
- PostgreSQL/MySQL database
- RESTful API endpoints
- File upload handling
- Email notifications

## 🚀 Deployment Options

### Option A: Split Deployment
- **Frontend**: Vercel
- **Backend**: Railway or Render
- **Database**: PostgreSQL

### Option B: Unified Deployment
- **Full Stack**: Hostinger (cPanel)
- **Database**: MySQL

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🔐 Admin Access

- **URL**: Click the settings icon in bottom-right corner
- **Demo Credentials**:
  - Email: `admin@portfolio.com`
  - Password: `admin123`

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/           # Admin panel components
│   ├── sections/        # Main page sections
│   └── Navigation.tsx   # Navigation component
├── contexts/            # React contexts
├── data/               # Mock data
├── types/              # TypeScript types
└── App.tsx             # Main application
```

## 🎨 Customization

### Personal Information
Update the following in `src/data/mockData.ts`:
- Personal details
- Work experience
- Education
- Projects
- Certificates

### Styling
- Colors: Modify Tailwind config in `tailwind.config.js`
- Themes: Update theme context in `src/contexts/ThemeContext.tsx`
- Animations: Customize in component files

### Images
- Profile image: Replace `/image.png` in public folder
- Project images: Update URLs in mock data
- Use Pexels URLs for placeholder images

## 🔧 Laravel Backend Setup

### API Endpoints
```php
// Projects
GET    /api/projects
POST   /api/projects
PUT    /api/projects/{id}
DELETE /api/projects/{id}

// Certificates
GET    /api/certificates
POST   /api/certificates
PUT    /api/certificates/{id}
DELETE /api/certificates/{id}

// Contact
POST   /api/contact

// Auth
POST   /api/login
POST   /api/logout
```

### Database Schema
```sql
-- Projects table
CREATE TABLE projects (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255),
    last_updated DATE,
    project_type ENUM('Individual', 'Team'),
    team_size INT,
    preview_image TEXT,
    overview TEXT,
    key_features JSON,
    technologies JSON,
    outcome TEXT,
    is_deployed BOOLEAN,
    deployment_url TEXT,
    gallery_images JSON,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Certificates table
CREATE TABLE certificates (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255),
    issuing_organization VARCHAR(255),
    associated_skills JSON,
    image TEXT,
    issue_date DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## 📧 Contact Form Integration

The contact form is ready for Laravel Mail integration:

```php
// ContactController.php
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email',
        'subject' => 'required|string|max:255',
        'message' => 'required|string',
    ]);

    Mail::to('your-email@example.com')->send(new ContactMail($validated));

    return response()->json(['message' => 'Message sent successfully']);
}
```

## 🌐 Environment Variables

```env
# Frontend (.env)
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Portfolio

# Backend (.env)
APP_NAME=Portfolio
APP_URL=http://localhost:8000
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=portfolio
DB_USERNAME=your_username
DB_PASSWORD=your_password

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

## 📱 Mobile Optimization

- Touch-friendly navigation
- Optimized images and loading
- Responsive typography
- Gesture-friendly interactions
- Fast loading on slower connections

## 🔒 Security Features

- CSRF protection
- Input validation
- Secure authentication
- File upload restrictions
- XSS prevention

## 📈 Performance

- Lazy loading for images
- Code splitting
- Optimized bundle size
- CDN-ready assets
- Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Alex Johnson**
- Location: Bandung, Jawa Barat, Indonesia
- Email: alex.johnson@example.com
- GitHub: [@alexjohnson](https://github.com/alexjohnson)
- LinkedIn: [Alex Johnson](https://linkedin.com/in/alexjohnson)

---

Built with ❤️ using React & Laravel