# ADMIN ROUTES REFERENCE

## ✅ CORRECT ADMIN ROUTES

| Section | Correct URL | ❌ Wrong URL |
|---------|-------------|--------------|
| Dashboard | `/admin/dashboard` | `/admin` (redirects to dashboard) |
| Services | `/admin/services` | - |
| Portfolio | `/admin/portfolio` | ❌ `/admin/projects` |
| Blog | `/admin/blog` | ❌ `/admin/blogs` |
| Contact Submissions | `/admin/contacts` | ❌ `/admin/contact-submissions` |
| Login | `/admin/login` | - |

## 🔗 QUICK LINKS

**Development URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Backend Assets: http://localhost:5000/assets

**Admin Panel:**
- Dashboard: http://localhost:5173/admin/dashboard
- Services: http://localhost:5173/admin/services
- Portfolio: http://localhost:5173/admin/portfolio
- Blog: http://localhost:5173/admin/blog
- Contacts: http://localhost:5173/admin/contacts

**Public Pages:**
- Home: http://localhost:5173/
- Portfolio: http://localhost:5173/portfolio
- Services: http://localhost:5173/services
- Blog: http://localhost:5173/blog
- About: http://localhost:5173/about

## 📝 SIDEBAR NAVIGATION

The admin sidebar contains these links (in order):
1. Dashboard → `/admin/dashboard`
2. Services → `/admin/services`
3. Portfolio → `/admin/portfolio`
4. Blog → `/admin/blog`
5. Contact Submissions → `/admin/contacts`

## 🔐 LOGIN CREDENTIALS

**Demo Admin:**
- Email: `admin@demo.com`
- Password: `admin123`

(Stored in localStorage as `mockAdminAuth`)

## 📊 API ENDPOINTS

### Services
- GET `/api/services` - Fetch all services
- POST `/api/services` - Create service
- PUT `/api/services/:id` - Update service
- DELETE `/api/services/:id` - Delete service

### Portfolio (Projects)
- GET `/api/projects` - Fetch all projects
- POST `/api/projects` - Create project
- PUT `/api/projects/:id` - Update project
- DELETE `/api/projects/:id` - Delete project

### Blog
- GET `/api/blogs` - Fetch all blogs
- POST `/api/blogs` - Create blog
- PUT `/api/blogs/:id` - Update blog
- DELETE `/api/blogs/:id` - Delete blog

### Contact Submissions
- GET `/api/contact-submissions` - Fetch all submissions
- POST `/api/contact-submissions` - Create submission

### Dashboard
- GET `/api/dashboard` - Fetch dashboard stats
- GET `/api/dashboard-tasks` - Fetch ongoing tasks

### File Upload
- POST `/api/upload` - Upload image file

## 🖼️ IMAGE HANDLING

**Upload Directory:**
`backend/public/assets/`

**Database Storage:**
Filename only (e.g., `1769853409997-384115523.jpg`)

**Frontend Display:**
Full URL via `getImageUrl()` helper:
`http://localhost:5000/assets/1769853409997-384115523.jpg`

## 🗄️ DATABASE

**Type:** SQLite
**Location:** `backend/database/pragati.sqlite`
**Schema:** `backend/database/pragati_design_studio.sql`

**Tables:**
- `navbar_links`
- `hero_section`
- `services`
- `projects` (portfolio)
- `testimonials`
- `principles`
- `philosophy`
- `before_after`
- `blogs`
- `contact_submissions`

## 🚀 STARTING THE APPLICATION

**Backend:**
```bash
cd backend
npm install
npm run dev
```
Server starts on: http://localhost:5000

**Frontend:**
```bash
npm install
npm run dev
```
Server starts on: http://localhost:5173

## ⚠️ COMMON MISTAKES

1. ❌ Accessing `/admin/blogs` instead of `/admin/blog`
2. ❌ Accessing `/admin/projects` instead of `/admin/portfolio`
3. ❌ Trying to load images from frontend server instead of backend
4. ❌ Thinking this is a PHP project (it's Node.js + React)
5. ❌ Using port 8080 (XAMPP) instead of 5000 (Express)

## ✅ VERIFICATION

To verify everything is working:

1. **Backend Running:**
   - Visit http://localhost:5000
   - Should see: "Pragati Design Studio API is running"

2. **Frontend Running:**
   - Visit http://localhost:5173
   - Should see the homepage

3. **Admin Access:**
   - Visit http://localhost:5173/admin/login
   - Login with demo credentials
   - Should redirect to dashboard

4. **Images Loading:**
   - Add a portfolio item with image
   - Image should load from http://localhost:5000/assets/

---

**Last Updated:** 2026-01-31 16:23 IST
