# KartiniLove.ai – Frontend + Strapi CMS

This repo contains the Vite React frontend (root) and a Strapi v5 CMS in `kartini-cms/`.

## Quick Start

1) Copy envs from examples
- Frontend: copy `.env.example` → `.env`
- Strapi: copy `kartini-cms/.env.example` → `kartini-cms/.env`

2) Run locally
```bash
npm ci
npm run dev           # http://localhost:5173

cd kartini-cms
npm ci
npm run develop       # http://localhost:1337
```

If you change Node versions and see native module errors (e.g. better-sqlite3), run:
```bash
cd kartini-cms && npm rebuild better-sqlite3
```

## Environment Variables

Frontend (`.env`):
```
VITE_STRAPI_URL=
VITE_STRAPI_TOKEN=
```

Strapi (`kartini-cms/.env`):
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
STRAPI_TELEMETRY_DISABLED=true

# Optional upload provider (example: Cloudinary)
# CLOUDINARY_NAME=
# CLOUDINARY_KEY=
# CLOUDINARY_SECRET=
```

## Content Model (Post)
- Title, Slug, Content, Excerpt
- Cover (image), Author, Category
- PublishedDate, Editor, Likes (default 0)

Permissions: enable Public → Post → find, findOne.

## Deployment

Frontend (Vercel):
- Build: `npm ci && npm run build`
- Output: `dist`
- Set `VITE_STRAPI_URL` to Strapi Cloud URL

Strapi Cloud:
- Create project, set APP_KEYS and secrets
- Configure CORS to include your Vercel domain
- (Optional) Configure upload provider

## Smoke Test
```bash
curl "$VITE_STRAPI_URL/api/posts?populate=Cover"
```
Open the Vercel site → Blog to verify carousel, listings, and markdown rendering.
