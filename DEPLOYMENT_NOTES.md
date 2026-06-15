# WanderLust Deployment Notes
## Last Updated: June 15, 2026

---

## Rating Cache Refactor (June 15, 2026)

| Change | Details |
|--------|---------|
| **New field** | `ratingSum` on Listing model — running total of all review ratings |
| **Create review** | Uses `$inc` to add rating to `ratingSum` and increment `reviewCount` (1 write) |
| **Delete review** | Uses `$inc` to subtract rating from `ratingSum` and decrement `reviewCount` (1 write) |
| **Migration** | Run `node init/migrateRatings.js` to backfill `ratingSum` for existing listings |
| **Before** | Loaded ALL reviews into memory to sum, 2 DB writes per operation |
| **After** | Zero reviews loaded, 1 DB write per operation |

---

## Security Fixes (June 15, 2026)

| # | Severity | Issue | File | Fix Applied |
|---|----------|-------|------|-------------|
| 1 | HIGH | Mass assignment — `req.body.listing` spread into DB | `controllers/listings.js` | **FIXED**: Whitelisted fields: title, description, location, country, price, category |
| 2 | HIGH | Open redirect after login | `controllers/users.js` | **FIXED**: Validate redirectUrl starts with `/` and has no `://` |
| 3 | MED | No rate limiting on listings/reviews | `app.js` | **FIXED**: Added `listingLimiter` (20/15min) and `reviewLimiter` (10/15min) |
| 4 | MED | No file size limit on uploads | `routes/listing.js` | **FIXED**: Added `limits: { fileSize: 5MB }` to multer |
| 5 | MED | No MIME type filter on uploads | `routes/listing.js` | **FIXED**: Added `fileFilter` allowing only png/jpg/jpeg |
| 6 | MED | Error handler leaks internals | `app.js` | **FIXED**: Only pass `statusCode` + `message` to error template |
| 7 | MED | Session cookie 7 days | `app.js` | **FIXED**: Reduced to 1 day |

### Previously Fixed (June 15, 2026)

| # | Issue | Status |
|---|-------|--------|
| 1 | Geocoding only on create, not update | **FIXED**: Re-geocodes on location change |
| 2 | `.env` credentials in tracked file | **ACTION NEEDED**: Rotate credentials, purge git history |
| 3 | Hardcoded fallback secret | **FIXED**: App throws if SECRET not set |
| 4 | No rate limiting on auth routes | **FIXED**: 10 attempts/15min |
| 5 | Logout via GET | **FIXED**: Changed to POST |
| 6 | No CSRF protection | DEFERRED |
| 7 | No security headers | **FIXED**: Added helmet |
| 8 | No try/catch on geocoding | **FIXED**: Wrapped in try/catch with fallback |
| 9 | `isOwner` crashes if currUser undefined | **FIXED**: Added null check |
| 10 | No NoSQL injection protection | **FIXED**: Added mongo-sanitize |
| 11 | `uploads/` not gitignored | **FIXED**: Added to .gitignore |
| 12 | wrapAsync redundant with Express 5 | **FIXED**: Removed from route files |

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
| `DB_URL` | Your MongoDB Atlas connection string |
| `SECRET` | Your random session secret |
| `CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUD_API_KEY` | Your Cloudinary API key |
| `CLOUD_API_SECRET` | Your Cloudinary API secret |

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
