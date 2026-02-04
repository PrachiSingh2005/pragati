# 🚀 Quick Start Guide - Pragati Design Studio

Get your Pragati Design Studio website up and running in 5 minutes!

---

## ⚡ Prerequisites

Make sure you have these installed:
- ✅ Node.js (v18 or higher) - [Download](https://nodejs.org/)
- ✅ npm (comes with Node.js)
- ✅ Git - [Download](https://git-scm.com/)

---

## 📥 Step 1: Clone the Project

```bash
git clone https://github.com/yourusername/pragati-design-studio.git
cd pragati-design-studio
```

---

## 📦 Step 2: Install Dependencies

**Install frontend dependencies:**
```bash
npm install
```

**Install backend dependencies:**
```bash
cd backend
npm install
cd ..
```

---

## ⚙️ Step 3: Set Up Environment Variables

**Create `.env` in the root directory:**
```bash
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

**Create `.env` in the backend directory:**
```bash
cd backend
echo "PORT=5000" > .env
echo "JWT_SECRET=your-secret-key-change-in-production" >> .env
echo "NODE_ENV=development" >> .env
cd ..
```

Or simply copy the example files:
```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

---

## 🏃 Step 4: Run the Application

**Open TWO terminal windows:**

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on: `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```
✅ Frontend running on: `http://localhost:8080`

---

## 🎉 Step 5: Open in Browser

Visit: **http://localhost:8080**

You should see the Pragati Design Studio homepage!

---

## 🔐 Access Admin Panel

1. Go to: **http://localhost:8080/admin/login**

2. Use default credentials:
   ```
   Email: admin@pragati.com
   Password: admin123
   ```

3. **⚠️ Important:** Change the password in production!

---

## ✅ Verify Everything Works

### **Test the Website:**
- [ ] Homepage loads
- [ ] Portfolio page shows projects
- [ ] Services page displays
- [ ] Blog page loads
- [ ] Contact form works
- [ ] Dark/Light mode toggle works

### **Test Admin Panel:**
- [ ] Login successful
- [ ] Dashboard displays
- [ ] Can create/edit services
- [ ] Can create/edit portfolio items
- [ ] Can create blog posts
- [ ] Can view contact submissions

---

## 🐛 Troubleshooting

### **Backend won't start?**

**Error: Port 5000 already in use**
```bash
# Change port in backend/.env
PORT=5001
```

**Error: Database error**
```bash
# Delete and recreate database
cd backend/database
rm pragati.sqlite
cd ..
npm run dev  # Database will be recreated
```

### **Frontend won't start?**

**Error: Cannot connect to backend**
```bash
# Check VITE_API_URL in .env
# Make sure backend is running
```

**Error: Port 8080 already in use**
```bash
# Vite will automatically use next available port
# Or specify port in vite.config.ts
```

### **Images not showing?**

```bash
# Make sure backend/public/assets directory exists
mkdir -p backend/public/assets
```

---

## 📝 Next Steps

1. **Customize Content:**
   - Add your own portfolio projects
   - Create services
   - Write blog posts
   - Update About page

2. **Customize Design:**
   - Modify colors in `tailwind.config.ts`
   - Update fonts in `src/index.css`
   - Add your logo

3. **Deploy:**
   - See [README.md](README.md#deployment) for deployment instructions

---

## 📚 Learn More

- **Full Documentation:** [README.md](README.md)
- **API Documentation:** [README.md#api-documentation](README.md#api-documentation)
- **Contributing:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🆘 Need Help?

- Check the [README.md](README.md) for detailed documentation
- Open an issue on GitHub
- Contact: info@pragatidesign.com

---

**Happy Building! 🎨✨**
