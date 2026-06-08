# WanderLust Deployment Session Summary
## Date: June 9, 2026

---

## What Was Fixed (30 Issues)

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

## Credentials

### MongoDB Atlas
- Cluster: `cluster0.970bv3p.mongodb.net`
- Username: `mohddaniyal12b_db_user`
- Password: `Wanderlust6969`
- DB: `wanderlust`

### Cloudinary
- Cloud Name: `dvnjod5oh`
- API Key: `236521699624632`
- API Secret: `NVWC2MaXhux_PRVlmjtkTL_2Qzo`

### Render Environment Variables
| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DB_URL` | `mongodb+srv://mohddaniyal12b_db_user:Wanderlust6969@cluster0.970bv3p.mongodb.net/wanderlust?retryWrites=true&w=majority` |
| `SECRET` | `a3f8b2c9d1e5g7h0i4j6k8l2m5n7o1` |
| `CLOUD_NAME` | `dvnjod5oh` |
| `CLOUD_API_KEY` | `236521699624632` |
| `CLOUD_API_SECRET` | `NVWC2MaXhux_PRVlmjtkTL_2Qzo` |

### User Accounts
| Username | Password | Role |
|----------|----------|------|
| `demo` | `741` | 4 listings |
| `demo2` | `741` | 4 listings |
| `demo3` | `741` | 4 listings |

---

## Deployment Steps (Render)
1. Go to render.com → New Web Service → Connect GitHub repo
2. Build: `npm install`
3. Start: `npm start`
4. Add environment variables in Render dashboard (NOT from .env file)
5. Make sure Atlas Network Access allows 0.0.0.0/0

---

## Important Notes
- `.env` file is in `.gitignore` and NOT deployed to Render
- Environment variables must be added manually in Render dashboard
- Always reset Atlas password if it's been shared publicly
- Run `node init/seed.js` to re-seed listings
- Run `node init/seedReviews.js` to re-seed reviews
