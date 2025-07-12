# Laravel Backend Integration Guide

This guide explains how to integrate the React portfolio frontend with a Laravel backend.

## 🏗️ Project Structure

```
portfolio-project/
├── frontend/                 # React application (current project)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend/                  # Laravel application
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── composer.json
└── README.md
```

## 🚀 Step 1: Create Laravel Backend

### 1.1 Initialize Laravel Project

```bash
# Create new Laravel project
composer create-project laravel/laravel portfolio-backend

# Navigate to backend directory
cd portfolio-backend

# Install additional packages
composer require laravel/sanctum
composer require intervention/image
```

### 1.2 Environment Configuration

Create `.env` file in Laravel backend:

```env
APP_NAME="Portfolio API"
APP_ENV=local
APP_KEY=base64:your-app-key
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=portfolio_db
DB_USERNAME=your_username
DB_PASSWORD=your_password

# CORS Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"

# File Storage
FILESYSTEM_DISK=public
```

## 🗄️ Step 2: Database Setup

### 2.1 Create Migrations

```bash
# Create migrations
php artisan make:migration create_projects_table
php artisan make:migration create_certificates_table
php artisan make:migration create_work_experiences_table
php artisan make:migration create_education_table
php artisan make:migration create_contact_messages_table
```

### 2.2 Migration Files

**database/migrations/create_projects_table.php:**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('last_updated');
            $table->enum('project_type', ['Individual', 'Team']);
            $table->integer('team_size')->nullable();
            $table->text('preview_image');
            $table->text('overview');
            $table->json('key_features');
            $table->json('technologies');
            $table->text('outcome');
            $table->boolean('is_deployed')->default(false);
            $table->text('deployment_url')->nullable();
            $table->json('gallery_images')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('projects');
    }
};
```

**database/migrations/create_certificates_table.php:**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('issuing_organization');
            $table->json('associated_skills');
            $table->text('image');
            $table->date('issue_date');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('certificates');
    }
};
```

**database/migrations/create_contact_messages_table.php:**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('subject');
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('contact_messages');
    }
};
```

### 2.3 Run Migrations

```bash
php artisan migrate
```

## 🔐 Step 3: Authentication Setup

### 3.1 Configure Sanctum

```bash
# Publish Sanctum configuration
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Run Sanctum migrations
php artisan migrate
```

### 3.2 Update Kernel.php

**app/Http/Kernel.php:**
```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

### 3.3 Create Admin User Seeder

```bash
php artisan make:seeder AdminUserSeeder
```

**database/seeders/AdminUserSeeder.php:**
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@portfolio.com',
            'password' => Hash::make('admin123'),
            'email_verified_at' => now(),
        ]);
    }
}
```

## 📝 Step 4: Create Models

### 4.1 Project Model

```bash
php artisan make:model Project
```

**app/Models/Project.php:**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'last_updated',
        'project_type',
        'team_size',
        'preview_image',
        'overview',
        'key_features',
        'technologies',
        'outcome',
        'is_deployed',
        'deployment_url',
        'gallery_images',
    ];

    protected $casts = [
        'key_features' => 'array',
        'technologies' => 'array',
        'gallery_images' => 'array',
        'is_deployed' => 'boolean',
        'last_updated' => 'date',
    ];
}
```

### 4.2 Certificate Model

```bash
php artisan make:model Certificate
```

**app/Models/Certificate.php:**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'issuing_organization',
        'associated_skills',
        'image',
        'issue_date',
    ];

    protected $casts = [
        'associated_skills' => 'array',
        'issue_date' => 'date',
    ];
}
```

### 4.3 Contact Message Model

```bash
php artisan make:model ContactMessage
```

**app/Models/ContactMessage.php:**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'is_read',
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];
}
```

## 🎮 Step 5: Create Controllers

### 5.1 Auth Controller

```bash
php artisan make:controller Api/AuthController
```

**app/Http/Controllers/Api/AuthController.php:**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'message' => 'Login successful'
            ]);
        }

        return response()->json([
            'message' => 'Invalid credentials'
        ], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
```

### 5.2 Project Controller

```bash
php artisan make:controller Api/ProjectController --resource
```

**app/Http/Controllers/Api/ProjectController.php:**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('last_updated', 'desc')->get();
        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'last_updated' => 'required|date',
            'project_type' => 'required|in:Individual,Team',
            'team_size' => 'nullable|integer|min:1',
            'preview_image' => 'required|url',
            'overview' => 'required|string',
            'key_features' => 'required|array',
            'technologies' => 'required|array',
            'outcome' => 'required|string',
            'is_deployed' => 'boolean',
            'deployment_url' => 'nullable|url',
            'gallery_images' => 'nullable|array',
        ]);

        $project = Project::create($request->all());
        return response()->json($project, 201);
    }

    public function show(Project $project)
    {
        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        $request->validate([
            'title' => 'string|max:255',
            'last_updated' => 'date',
            'project_type' => 'in:Individual,Team',
            'team_size' => 'nullable|integer|min:1',
            'preview_image' => 'url',
            'overview' => 'string',
            'key_features' => 'array',
            'technologies' => 'array',
            'outcome' => 'string',
            'is_deployed' => 'boolean',
            'deployment_url' => 'nullable|url',
            'gallery_images' => 'nullable|array',
        ]);

        $project->update($request->all());
        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully']);
    }
}
```

### 5.3 Certificate Controller

```bash
php artisan make:controller Api/CertificateController --resource
```

**app/Http/Controllers/Api/CertificateController.php:**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::orderBy('issue_date', 'desc')->get();
        return response()->json($certificates);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'issuing_organization' => 'required|string|max:255',
            'associated_skills' => 'required|array',
            'image' => 'required|url',
            'issue_date' => 'required|date',
        ]);

        $certificate = Certificate::create($request->all());
        return response()->json($certificate, 201);
    }

    public function show(Certificate $certificate)
    {
        return response()->json($certificate);
    }

    public function update(Request $request, Certificate $certificate)
    {
        $request->validate([
            'name' => 'string|max:255',
            'issuing_organization' => 'string|max:255',
            'associated_skills' => 'array',
            'image' => 'url',
            'issue_date' => 'date',
        ]);

        $certificate->update($request->all());
        return response()->json($certificate);
    }

    public function destroy(Certificate $certificate)
    {
        $certificate->delete();
        return response()->json(['message' => 'Certificate deleted successfully']);
    }
}
```

### 5.4 Contact Controller

```bash
php artisan make:controller Api/ContactController
```

**app/Http/Controllers/Api/ContactController.php:**
```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Save to database
        $contactMessage = ContactMessage::create($request->all());

        // Send email notification
        try {
            Mail::to(config('mail.from.address'))->send(new ContactFormMail($request->all()));
        } catch (\Exception $e) {
            // Log error but don't fail the request
            \Log::error('Failed to send contact email: ' . $e->getMessage());
        }

        return response()->json([
            'message' => 'Message sent successfully',
            'data' => $contactMessage
        ], 201);
    }

    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        return response()->json($messages);
    }

    public function markAsRead(ContactMessage $contactMessage)
    {
        $contactMessage->update(['is_read' => true]);
        return response()->json(['message' => 'Message marked as read']);
    }
}
```

## 📧 Step 6: Create Mail Class

```bash
php artisan make:mail ContactFormMail
```

**app/Mail/ContactFormMail.php:**
```php
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public $contactData;

    public function __construct($contactData)
    {
        $this->contactData = $contactData;
    }

    public function build()
    {
        return $this->subject('New Contact Form Submission')
                    ->view('emails.contact-form')
                    ->with('data', $this->contactData);
    }
}
```

**resources/views/emails/contact-form.blade.php:**
```html
<!DOCTYPE html>
<html>
<head>
    <title>New Contact Form Submission</title>
</head>
<body>
    <h2>New Contact Form Submission</h2>
    
    <p><strong>Name:</strong> {{ $data['name'] }}</p>
    <p><strong>Email:</strong> {{ $data['email'] }}</p>
    <p><strong>Subject:</strong> {{ $data['subject'] }}</p>
    
    <h3>Message:</h3>
    <p>{{ $data['message'] }}</p>
    
    <hr>
    <p><small>Sent from Portfolio Website</small></p>
</body>
</html>
```

## 🛣️ Step 7: API Routes

**routes/api.php:**
```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\Api\ContactController;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/contact', [ContactController::class, 'store']);

// Public data routes
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{project}', [ProjectController::class, 'show']);
Route::get('/certificates', [CertificateController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Admin only routes
    Route::apiResource('admin/projects', ProjectController::class)->except(['index', 'show']);
    Route::apiResource('admin/certificates', CertificateController::class)->except(['index']);
    Route::get('/admin/contact-messages', [ContactController::class, 'index']);
    Route::patch('/admin/contact-messages/{contactMessage}/read', [ContactController::class, 'markAsRead']);
});
```

## 🔧 Step 8: CORS Configuration

**config/cors.php:**
```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

## ⚛️ Step 9: Update React Frontend

### 9.1 Create API Service

**src/services/api.ts:**
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('auth_token', response.token);
    }
    
    return response;
  }

  async logout() {
    await this.request('/logout', { method: 'POST' });
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Projects
  async getProjects() {
    return this.request('/projects');
  }

  async createProject(project: any) {
    return this.request('/admin/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: string, project: any) {
    return this.request(`/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/admin/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Certificates
  async getCertificates() {
    return this.request('/certificates');
  }

  async createCertificate(certificate: any) {
    return this.request('/admin/certificates', {
      method: 'POST',
      body: JSON.stringify(certificate),
    });
  }

  async updateCertificate(id: string, certificate: any) {
    return this.request(`/admin/certificates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(certificate),
    });
  }

  async deleteCertificate(id: string) {
    return this.request(`/admin/certificates/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact
  async sendContactMessage(message: any) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }
}

export const apiService = new ApiService();
```

### 9.2 Update Environment Variables

**frontend/.env:**
```env
VITE_API_URL=http://localhost:8000/api
```

### 9.3 Update Auth Context

**src/contexts/AuthContext.tsx:**
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Verify token with backend
      // For now, we'll use the mock data
      setUser({
        id: '1',
        email: 'admin@portfolio.com',
        name: 'Admin',
        isAuthenticated: true,
      });
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiService.login(email, password);
      const userData: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        isAuthenticated: true,
      };
      setUser(userData);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## 🚀 Step 10: Deployment

### 10.1 Option A: Split Deployment

**Frontend (Vercel):**
1. Push React code to GitHub
2. Connect Vercel to repository
3. Set environment variables in Vercel dashboard
4. Deploy automatically

**Backend (Railway/Render):**
1. Push Laravel code to GitHub
2. Connect Railway/Render to repository
3. Set environment variables
4. Configure database
5. Deploy

### 10.2 Option B: Unified Deployment (Hostinger)

1. Build React app: `npm run build`
2. Copy `dist` folder to Laravel `public` directory
3. Update Laravel routes to serve React app
4. Upload to Hostinger via cPanel
5. Configure database and environment

## 🔧 Step 11: Final Configuration

### 11.1 Laravel Route Fallback

**routes/web.php:**
```php
<?php

use Illuminate\Support\Facades\Route;

// Serve React app for all non-API routes
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*$');
```

**resources/views/app.blade.php:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    @vite(['resources/js/app.js'])
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

### 11.2 Update Contact Form

**src/components/sections/Contact.tsx:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    await apiService.sendContactMessage(formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  } catch (error) {
    console.error('Error submitting form:', error);
    // Handle error state
  }
  
  setIsSubmitting(false);
};
```

## ✅ Testing the Integration

1. **Start Laravel backend:**
   ```bash
   php artisan serve
   ```

2. **Start React frontend:**
   ```bash
   npm run dev
   ```

3. **Test endpoints:**
   - Login: POST `/api/login`
   - Projects: GET `/api/projects`
   - Contact: POST `/api/contact`

## 🔒 Security Considerations

1. **API Rate Limiting**
2. **Input Validation**
3. **CSRF Protection**
4. **SQL Injection Prevention**
5. **File Upload Security**
6. **Environment Variables**

This integration provides a complete full-stack solution with Laravel handling the backend API and database operations while React manages the frontend user interface.