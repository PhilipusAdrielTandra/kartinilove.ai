# Environment Variables Setup

## What You Need

### 1. Frontend `.env` file
**Location:** Root of your project (same folder as `package.json`)

```env
# Your Strapi URL
VITE_STRAPI_URL=http://localhost:1337

# Optional: Only if Strapi requires authentication
# VITE_STRAPI_TOKEN=your_token_here
```

### 2. Strapi Cloud `.env` file  
**Location:** Managed by Strapi Cloud (you don't create this)

Strapi Cloud automatically creates this with:
- Database credentials (PostgreSQL)
- JWT secrets
- API keys
- All security credentials

## When Deploying to Production

### On Vercel/Netlify:
Add environment variables in your hosting dashboard:

```
VITE_STRAPI_URL=https://your-strapi-cloud-url.com
```

### On Strapi Cloud:
- Environment variables are automatically managed
- Database is configured automatically
- No manual setup needed

## Summary

- ✅ **Frontend `.env`**: `VITE_STRAPI_URL` (already set to `http://localhost:1337`)
- ✅ **Strapi `.env`**: Managed by Strapi Cloud (automatic)
- ❌ **No API token needed** unless you restrict Strapi's public permissions

Your current setup is good to go!

