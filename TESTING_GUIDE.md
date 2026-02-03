# Testing Guide - Portfolio & Contact Submissions Fix

## Prerequisites

1. **Backend Server Running:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Server should start on: http://localhost:5000

2. **Frontend Server Running:**
   ```bash
   npm install
   npm run dev
   ```
   Frontend should start on: http://localhost:5173 (or similar)

---

## Test 1: Portfolio Item Creation

### Steps:
1. Navigate to: http://localhost:5173/admin/portfolio
2. Click "Add Project" button
3. Fill in the form:
   - **Title:** "Test Modern Villa"
   - **Location:** "Mumbai"
   - **Category:** Select any category (e.g., "Residential")
   - **Description:** "A beautiful modern villa with contemporary design"
   - **Images:** Upload at least one image
4. Click "Add Project"

### Expected Results:
✅ Success toast appears: "Project added successfully"
✅ New project appears in the admin list immediately
✅ Project has "Active" badge (green)
✅ Toggle switch is ON

### Check Browser Console:
```
Adding project with payload: {title: "Test Modern Villa", location: "Mumbai", ...}
Project saved successfully: {id: 1, title: "Test Modern Villa", ...}
```

### Check Backend Console:
```
[projects] Inserting: {title: "Test Modern Villa", location: "Mumbai", ...}
[projects] Query: INSERT INTO projects (title,location,category,description,image_url,is_active) VALUES (?,?,?,?,?,?)
[projects] Insert successful. ID: 1
```

---

## Test 2: Portfolio Visibility Toggle

### Steps:
1. In the admin portfolio list, find the project you just created
2. Click the toggle switch to turn it OFF (hide)
3. Navigate to: http://localhost:5173/portfolio (public page)

### Expected Results:
✅ Project should NOT appear on public portfolio page
✅ Toggle switch in admin shows OFF/Hidden

### Steps (continued):
4. Go back to admin portfolio
5. Toggle the switch back ON
6. Refresh the public portfolio page

### Expected Results:
✅ Project now appears on public portfolio page
✅ Toggle switch in admin shows ON/Active

---

## Test 3: Contact Form Submission

### Steps:
1. Navigate to: http://localhost:5173 (home page)
2. Scroll down to the contact form
3. Fill in the form:
   - **Name:** "John Doe"
   - **Email:** "john@example.com"
   - **Subject:** "Interior Design Inquiry"
   - **Message:** "I would like to discuss a residential project"
4. Click "Send Message"

### Expected Results:
✅ Success toast appears: "Message sent"
✅ Form clears automatically

### Check Browser Console:
```
Contact submission saved successfully: 1
```

### Check Backend Console:
```
Contact submission saved: {id: 1, name: "John Doe", email: "john@example.com", subject: "Interior Design Inquiry"}
```

---

## Test 4: Contact Submissions in Admin

### Steps:
1. Navigate to: http://localhost:5173/admin/contact-submissions
2. Check the submissions table

### Expected Results:
✅ Your test submission appears in the table
✅ Name: "John Doe"
✅ Email: "john@example.com"
✅ Subject: "Interior Design Inquiry"
✅ Date shows current date/time
✅ **NO hardcoded demo data** (no Rahul Sharma, Priya Patel, etc.)

### Steps (continued):
3. Click "View" button on the submission
4. Modal should open with full details

### Expected Results:
✅ All fields display correctly
✅ Email is clickable (mailto link)

---

## Test 5: Dashboard Stats

### Steps:
1. Navigate to: http://localhost:5173/admin/dashboard
2. Check the statistics cards

### Expected Results:
✅ "Projects" card shows correct count (should be 1 if you added one project)
✅ Dashboard loads without errors
✅ "Ongoing Tasks" section may show recent contact submission

---

## Test 6: Data Persistence

### Steps:
1. Close the browser completely
2. Reopen and navigate to: http://localhost:5173/admin/portfolio

### Expected Results:
✅ Previously added project still appears
✅ Visibility status is preserved

### Steps (continued):
3. Navigate to: http://localhost:5173/admin/contact-submissions

### Expected Results:
✅ Previously submitted contact form still appears
✅ Data is not lost on page refresh

---

## Test 7: Error Handling

### Test 7a: Portfolio without required fields
1. Go to admin portfolio
2. Click "Add Project"
3. Leave "Title" empty
4. Click "Add Project"

**Expected:** Error toast: "Please enter a project title"

### Test 7b: Contact form without required fields
1. Go to public contact form
2. Leave "Email" empty
3. Click "Send Message"

**Expected:** Form validation error appears

---

## Common Issues & Solutions

### Issue: "Failed to fetch"
**Solution:** Make sure backend server is running on port 5000

### Issue: Portfolio items not appearing
**Solution:** 
1. Check browser console for errors
2. Verify `is_active` is set to 1 in database
3. Check that `getActiveProjects()` is filtering correctly

### Issue: Contact submissions not saving
**Solution:**
1. Check backend console for INSERT logs
2. Verify database table exists
3. Check network tab for API call status

### Issue: Images not displaying
**Solution:**
1. Verify images are uploaded to `backend/public/assets/`
2. Check that backend is serving static files
3. Verify image path in database starts with filename only (not `/assets/`)

---

## Database Verification (Optional)

If you have SQLite tools installed, you can verify data directly:

```bash
# Navigate to database directory
cd backend/database

# Open database (if sqlite3 is installed)
sqlite3 pragati.sqlite

# Check projects
SELECT * FROM projects;

# Check contact submissions
SELECT * FROM contact_submissions;

# Exit
.quit
```

---

## Success Criteria

All tests should pass with:
- ✅ No hardcoded data anywhere
- ✅ Portfolio items save and persist
- ✅ Contact submissions save and persist
- ✅ Visibility toggle works correctly
- ✅ Real-time updates reflect in admin
- ✅ Public pages show only active content
- ✅ Comprehensive logging in console
- ✅ Error handling works properly

---

## Rollback (If Needed)

If you need to reset the database:

```bash
cd backend/database
rm pragati.sqlite
# Restart backend server - it will recreate the database from schema
```

---

**Last Updated:** 2026-01-31
**Status:** Ready for Testing ✅
