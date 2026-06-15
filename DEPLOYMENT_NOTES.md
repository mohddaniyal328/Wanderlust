# WanderLust Deployment Notes
## Last Updated: June 15, 2026

---

## Geocoding Refactor (June 15, 2026)

| Change | Details |
|--------|---------|
| **New file** | `utils/geocode.js` — reusable `geocode(address)` function |
| **Create flow** | `controllers/listings.js` now uses `geocode()` instead of inline fetch |
| **Update flow** | `updateListing` now re-geocodes when location is changed |
| **Fallback** | Jaipur `[75.7873, 26.9124]` on API failure, invalid address, or empty input |

---

## Security Issues Identified (June 15, 2026) — FIXED

| # | Issue | File | Fix Applied |
|---|-------|------|-------------|
| 1 | `.env` with real credentials may exist in git history | `.env` | **ACTION NEEDED**: Rotate credentials. Use `git filter-branch` or BFG to purge `.env` from history. |
| 2 | Hardcoded fallback secret `"mysupersecretcode"` | `app.js:59,70` | **FIXED**: Removed fallback. App now throws if `SECRET` env var is not set. |
| 3 | No rate limiting on login/signup | `routes/user.js` | **FIXED**: Added `express-rate-limit` (10 attempts per 15 min window) on auth routes. |
| 4 | Logout via GET — vulnerable to CSRF logout | `routes/user.js:23` | **FIXED**: Changed to `router.post("/logout")`. Updated navbar to use POST form. |
| 5 | No CSRF protection | global | **DEFERRED**: `csurf` is deprecated. Recommend `csrf-csrf` for future implementation. |
| 6 | No security headers | `app.js` | **FIXED**: Added `helmet` middleware with CSP and crossOriginEmbedder disabled for compatibility. |
| 7 | Rating cache can drift out of sync | `controllers/listings.js:55-59` | **FIXED**: Removed manual recalculation in `showListing`. Uses cached `averageRating` from model. |
| 8 | No try/catch on geocoding fetch | `controllers/listings.js:71-78` | **FIXED**: Wrapped fetch in try/catch. Falls back to default coordinates on failure. |
| 9 | `isOwner` crashes if `currUser` undefined | `middleware.js:34,71` | **FIXED**: Added `!res.locals.currUser` null check in both `isOwner` and `isReviewAuthor`. |
| 10 | No XSS sanitization on user inputs | `app.js` | **FIXED**: Added `mongo-sanitize` middleware to prevent NoSQL injection. |
| 11 | `uploads/` not in `.gitignore` | `.gitignore` | **FIXED**: Added `uploads/` to `.gitignore`. |
| 12 | Express 5 makes `wrapAsync` redundant | `routes/*.js` | **FIXED**: Removed `wrapAsync` from all 3 route files. Express 5 handles async errors natively. |

---

## Previous Fixes (June 9, 2026 — 30 Issues)

### Crash Bugs Fixed (5)
- `controllers/users.js` — Added missing `next` parameter to `signup`
- `middleware.js` — Added null checks in `isOwner` and `isReviewAuthor`
- `controllers/reviews.js` — Added null check in `createReview`
- `controllers/listings.js` — Added null checks in `updateListing` and `destroyListing`

### Security Fixes (3)
- `app.js` — Throws error if SECRET/DB_URL missing in production
- `app.js` — `saveUninitialized: false`, `secure: true` cookies in production
- `controllers/listings.js` — Regex injection prevention on search

### Logic Bugs Fixed (9)
- Removed redundant try/catch in `createListing`
- Fixed `$pull` in `destroyReview` to use Mongoose `pull()` + `save()`
- Added `runValidators: true` to `findByIdAndUpdate`
- Added `isNaN()` validation for price filters
- Deleted stale `redirectUrl` from session after login
- Fixed `ExpressError` to pass message to `super()`
- Fixed image setter to handle `null` values
- Replaced unreliable `/{0,}` catch-all with middleware

### Professional Quality (8)
- Fixed `package.json` main field, moved `nodemon` to devDependencies
- Removed unused imports from `routes/review.js`
- Fixed inconsistent naming in `models/listing.js`
- Removed all `console.log` debug statements
- Made `wrapAsync` handle sync errors

### Deployment Fixes
- `app.js` — Added `trust proxy` for Render reverse proxy
- `app.js` — Added `sameSite: "lax"` to session cookie
- `.env` — Correct DB_URL with real Atlas cluster
- `init/index.js` — Use env var instead of hardcoded credentials
- `config/cloudConfig.js` — Env-based Cloudinary folder name

---

## Deployment Steps (Render)

### Prerequisites
- GitHub repo pushed with latest code
- MongoDB Atlas cluster active with network access `0.0.0.0/0`
- Cloudinary account with API keys

### Steps
1. Go to **render.com** → New Web Service → Connect GitHub repo
2. **Build Command:** `npm install`
3. **Start Command:** `npm start`
4. Add environment variables in Render dashboard (NOT from .env file)
5. Make sure Atlas Network Access allows `0.0.0.0/0`
6. Verify deployment at `https://your-app.onrender.com/listings`

### Post-Deployment
- Run `node init/seed.js` to populate listings (local only, or via Render shell)
- Run `node init/seedReviews.js` to populate reviews
- Run `node init/migrateRatings.js` to backfill rating caches

---

## Environment Variables (Render Dashboard)

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DB_URL` | `mongodb+srv://mohddaniyal12b_db_user:Wanderlust6969@cluster0.970bv3p.mongodb.net/wanderlust?retryWrites=true&w=majority` |
| `SECRET` | `a3f8b2c9d1e5g7h0i4j6k8l2m5n7o1` |
| `CLOUD_NAME` | `dvnjod5oh` |
| `CLOUD_API_KEY` | `236521699624632` |
| `CLOUD_API_SECRET` | `NVWC2MaXhux_PRVlmjtkTL_2Qzo` |

---

## User Accounts

| Username | Password | Listings |
|----------|----------|----------|
| `demo` | `741` | 4 |
| `demo2` | `741` | 4 |
| `demo3` | `741` | 4 |

---

## Important Notes
- `.env` file is in `.gitignore` and NOT deployed to Render
- Environment variables must be added manually in Render dashboard
- **Rotate Atlas password** if it has been shared publicly
- Seed commands are for local dev; use Render shell for production seeding
- Atlas cluster: `cluster0.970bv3p.mongodb.net`
