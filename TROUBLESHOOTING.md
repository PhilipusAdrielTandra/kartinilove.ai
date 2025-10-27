# Troubleshooting: No Articles Showing in Blog Tab

## Common Issues and Solutions

### 1. Check Strapi is Running
Make sure Strapi is running at `http://localhost:1337`

### 2. Check Permissions in Strapi Admin
Go to: `http://localhost:1337/admin/settings/users-permissions/roles/public`

For the "post" collection type, make sure these are checked:
- ✅ `find` (GET /api/posts)
- ✅ `findOne` (GET /api/posts/:id)

**Steps:**
1. Open Strapi Admin: http://localhost:1337/admin
2. Go to **Settings** (bottom left)
3. Click **Users & Permissions plugin**
4. Click **Roles**
5. Click **Public**
6. Scroll to **Post** section
7. Enable `find` and `findOne`
8. Click **Save**

### 3. Check if Posts Exist and Are Published
1. Go to **Content Manager** → **Post**
2. Make sure you have at least one post
3. Check the status is **Published** (green dot)

### 4. Check API Endpoint Directly
Open in browser: `http://localhost:1337/api/posts`

You should see JSON data. If you see an error, permissions aren't set correctly.

### 5. Restart Frontend Dev Server
After changing `.env` or Strapi permissions, restart:
```bash
# Stop the frontend server (Ctrl+C)
# Then start again
npm run dev
```

### 6. Check Browser Console for Errors
Open browser DevTools (F12) → Console tab
Look for any error messages related to fetching from Strapi

### 7. Verify `.env` File Location
Make sure `.env` is in the **root** of your project, same folder as `package.json`, not inside `src/` or `backend/`

### Quick Test
1. Go to: http://localhost:1337/api/posts
2. You should see your posts as JSON
3. If you see `{"data":[]}`, you have no posts yet
4. If you see an error, permissions aren't set

## Most Common Issue: Permissions Not Set
90% of the time, it's because the Public role doesn't have `find` and `findOne` enabled for posts!

