# Pragati Interior Design Studio

A modern, full-stack interior design portfolio and blog website with a comprehensive admin panel. Built with React, TypeScript, Node.js, and SQLite.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Admin Panel](#admin-panel)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### **Frontend (Public Website)**

- 🏠 **Home Page** - Hero section, featured projects, services overview
- 📁 **Portfolio** - Dynamic project gallery with category filtering
- 🛠️ **Services** - Comprehensive service listings
- ℹ️ **About Us** - Company information and team details
- 📝 **Blog** - Multi-image blog posts with dynamic categories
- 📧 **Contact** - Contact form with backend integration
- 🌓 **Dark/Light Mode** - Theme toggle with persistence
- 📱 **Responsive Design** - Mobile-first, works on all devices
- ⚡ **Performance** - Optimized loading and smooth animations

### **Admin Panel**

- 🔐 **Authentication** - Secure login with JWT tokens
- 📊 **Dashboard** - Overview of all content
- 🖼️ **Portfolio Manager** - CRUD operations for projects
- 🛠️ **Services Manager** - Manage service offerings
- 📝 **Blog Manager** - Create/edit blog posts with multiple images
- 📧 **Contact Submissions** - View all contact form submissions
- 🎨 **Category Management** - Dynamic category system
- 📤 **Image Upload** - Real image upload to server

### **Backend API**

- 🔌 **RESTful API** - Clean, organized endpoints
- 💾 **SQLite Database** - Lightweight, file-based database
- 🔒 **Authentication** - Bcrypt password hashing, JWT tokens
- 📁 **File Upload** - Multer for image handling
- ✅ **Validation** - Input validation on all endpoints
- 🚀 **CORS Enabled** - Cross-origin resource sharing

---

## 🛠️ Tech Stack

### **Frontend**

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| React Router | Client-side routing |
| TanStack Query | Data fetching & caching |
| Tailwind CSS | Utility-first styling |
| Lucide React | Icon library |
| Shadcn/ui | Component library |
| next-themes | Theme management |
| date-fns | Date formatting |

### **Backend**

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express | Web framework |
| TypeScript | Type safety |
| SQLite3 | Database |
| Bcrypt | Password hashing |
| JWT | Authentication tokens |
| Multer | File upload handling |
| CORS | Cross-origin requests |

---

## 📁 Project Structure

```
pragati-design-studio/
├── backend/
│   ├── database/
│   │   ├── pragati.sqlite          # SQLite database file
│   │   └── pragati_design_studio.sql  # Database schema
│   ├── public/
│   │   └── assets/                 # Uploaded images
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts              # Database configuration
│   │   ├── routes/
│   │   │   ├── api.routes.ts      # Main API routes
│   │   │   ├── auth.routes.ts     # Authentication routes
│   │   │   └── admin.routes.ts    # Admin-specific routes
│   │   └── middleware/
│   │       └── auth.middleware.ts # JWT verification
│   ├── server.ts                   # Express server setup
│   └── package.json
│
├── src/
│   ├── components/
│   │   ├── admin/                  # Admin panel components
│   │   ├── ui/                     # Reusable UI components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx         # Authentication state
│   │   ├── BlogContext.tsx         # Blog data management
│   │   ├── PortfolioContext.tsx    # Portfolio data
│   │   ├── ServicesContext.tsx     # Services data
│   │   └── ContactSubmissionsContext.tsx
│   ├── pages/
│   │   ├── Index.tsx               # Home page
│   │   ├── Portfolio.tsx           # Portfolio gallery
│   │   ├── ServicesPage.tsx        # Services listing
│   │   ├── AboutUs.tsx             # About page
│   │   ├── Blog.tsx                # Blog grid
│   │   ├── BlogDetail.tsx          # Individual blog post
│   │   ├── Contact.tsx             # Contact form
│   │   └── admin/                  # Admin pages
│   │       ├── Login.tsx
│   │       ├── Dashboard.tsx
│   │       ├── PortfolioManager.tsx
│   │       ├── ServicesManager.tsx
│   │       ├── BlogManager.tsx
│   │       └── ContactSubmissions.tsx
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # Utility functions
│   ├── App.tsx                     # Main app component
│   └── main.tsx                    # Entry point
│
├── .env                            # Environment variables
├── .env.example                    # Environment template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js (v18 or higher)
- npm or yarn
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pragati-design-studio.git
   cd pragati-design-studio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

   Create `.env` file in the `backend` directory:
   ```env
   PORT=5000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

5. **Initialize the database**
   
   The database will be automatically created when you first run the backend server. The schema is located at `backend/database/pragati_design_studio.sql`.

---

## 🔧 Environment Variables

### **Frontend (.env)**

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

### **Backend (backend/.env)**

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `JWT_SECRET` | Secret key for JWT tokens | (required) |
| `NODE_ENV` | Environment mode | `development` |

---

## 🏃 Running the Application

### **Development Mode**

You need to run both the frontend and backend servers:

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Frontend will run on: `http://localhost:8080`

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:5000`

### **Production Build**

**Build Frontend:**
```bash
npm run build
```

**Build Backend:**
```bash
cd backend
npm run build
```

**Start Production Server:**
```bash
cd backend
npm start
```

---

## 🔐 Admin Panel

### **Access**

- URL: `http://localhost:8080/admin/login`
- Default credentials are set up during database initialization

### **Default Admin Account**

```
Email: admin@pragati.com
Password: admin123
```

**⚠️ IMPORTANT:** Change the default password immediately in production!

### **Admin Features**

1. **Dashboard** - Overview of all content
2. **Services Manager** - Add/edit/delete services
3. **Portfolio Manager** - Manage projects and categories
4. **Blog Manager** - Create blog posts with multiple images
5. **Contact Submissions** - View all contact form entries

### **Creating a New Admin**

Currently, admin accounts must be created directly in the database. Use a tool like DB Browser for SQLite or run:

```sql
INSERT INTO administrators (email, password_hash, created_at)
VALUES ('newemail@example.com', '$2b$10$hashedpassword', datetime('now'));
```

Use bcrypt to hash the password before inserting.

---

## 📡 API Documentation

### **Base URL**
```
http://localhost:5000/api
```

### **Public Endpoints**

#### **Portfolio**
- `GET /portfolio` - Get all active portfolio projects
- `GET /portfolio/:id` - Get single project

#### **Services**
- `GET /services` - Get all active services

#### **Blog**
- `GET /blogs` - Get all published blog posts
- `GET /blogs/:id` - Get single blog post

#### **Contact**
- `POST /contact-submissions` - Submit contact form
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I'd like to discuss..."
  }
  ```

#### **Navbar**
- `GET /navbar` - Get navigation links

### **Authentication Endpoints**

#### **Login**
- `POST /auth/login`
  ```json
  {
    "email": "admin@pragati.com",
    "password": "admin123"
  }
  ```
  Returns: `{ token: "jwt-token", user: {...} }`

### **Protected Admin Endpoints**

All admin endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

#### **Portfolio Management**
- `POST /admin/portfolio` - Create project
- `PUT /admin/portfolio/:id` - Update project
- `DELETE /admin/portfolio/:id` - Delete project

#### **Services Management**
- `POST /admin/services` - Create service
- `PUT /admin/services/:id` - Update service
- `DELETE /admin/services/:id` - Delete service

#### **Blog Management**
- `POST /blogs` - Create blog post
- `PUT /blogs/:id` - Update blog post
- `DELETE /blogs/:id` - Delete blog post

#### **File Upload**
- `POST /upload` - Upload image file
  - Content-Type: `multipart/form-data`
  - Field name: `image`
  - Returns: `{ filePath: "filename.jpg" }`

---

## 💾 Database Schema

### **Key Tables**

#### **administrators**
```sql
CREATE TABLE administrators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

#### **projects** (Portfolio)
```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category_id INTEGER,
    image_url TEXT,
    is_active BOOLEAN DEFAULT 1,
    display_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES portfolio_categories(id)
);
```

#### **blogs**
```sql
CREATE TABLE blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    is_published BOOLEAN DEFAULT 0,
    published_at TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    image_url TEXT,
    images TEXT  -- JSON array of image paths
);
```

#### **contact_submissions**
```sql
CREATE TABLE contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TEXT NOT NULL
);
```

For complete schema, see: `backend/database/pragati_design_studio.sql`

---

## 🎨 Customization

### **Theming**

The project uses Tailwind CSS with custom design tokens. Modify colors in:
- `tailwind.config.ts` - Color palette
- `src/index.css` - CSS variables for light/dark themes

### **Typography**

Custom fonts are defined in `src/index.css`:
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

### **Components**

Reusable UI components are in `src/components/ui/` using Shadcn/ui.

---

## 📤 Deployment

### **Frontend (Vercel/Netlify)**

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder

3. Set environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

### **Backend (Railway/Render/Heroku)**

1. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

2. Set environment variables:
   ```
   PORT=5000
   JWT_SECRET=your-production-secret
   NODE_ENV=production
   ```

3. Start command:
   ```bash
   npm start
   ```

### **Database**

For production, consider migrating from SQLite to PostgreSQL or MySQL for better scalability and concurrent access.

---

## 🧪 Testing

### **Manual Testing Checklist**

- [ ] Homepage loads correctly
- [ ] Portfolio filtering works
- [ ] Services page displays all services
- [ ] Blog posts load with images
- [ ] Blog category filtering works
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Admin can create/edit/delete content
- [ ] Image upload works
- [ ] Dark/light mode toggle works
- [ ] Mobile responsive design

---

## 🐛 Troubleshooting

### **Common Issues**

**Issue: Backend won't start**
- Check if port 5000 is already in use
- Verify `.env` file exists in backend directory
- Check database file permissions

**Issue: Images not displaying**
- Verify images are in `backend/public/assets/`
- Check CORS settings in `backend/server.ts`
- Ensure `VITE_API_URL` is correct

**Issue: Admin login fails**
- Verify admin account exists in database
- Check JWT_SECRET is set
- Clear browser cookies/localStorage

**Issue: Blog categories not showing**
- Refresh the page
- Check browser console for errors
- Verify blog posts have categories assigned

---

## 📝 Features Roadmap

- [ ] User registration and comments
- [ ] Newsletter subscription
- [ ] Project inquiry form
- [ ] Image optimization
- [ ] SEO improvements
- [ ] Analytics integration
- [ ] Email notifications
- [ ] Social media integration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Pragati Design Team** - *Initial work*

---

## 🙏 Acknowledgments

- Shadcn/ui for beautiful components
- Lucide for icons
- Tailwind CSS for styling utilities
- The React and Node.js communities

---

## 📞 Support

For support, email info@pragatidesign.com or create an issue in the repository.

---

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Project Wiki]
- **Issue Tracker**: [GitHub Issues]

---

**Pragati Design Studio**
