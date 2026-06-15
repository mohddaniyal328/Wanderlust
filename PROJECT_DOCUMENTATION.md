# WanderLust — Full-Stack Vacation Rental Platform

> A production-grade Airbnb clone built with Node.js, Express, MongoDB, and EJS. Deployed on Render with cloud-based image storage and interactive maps.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture & Folder Structure](#3-architecture--folder-structure)
4. [Core Features](#4-core-features)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [Database Design](#6-database-design)
7. [API Routes](#7-api-routes)
8. [Key Implementations](#8-key-implementations)
9. [Challenges Faced & Solutions](#9-challenges-faced--solutions)
10. [Security Measures](#10-security-measures)
11. [Deployment Process](#11-deployment-process)
12. [Interview Talking Points](#12-interview-talking-points)

---

## 1. Project Overview

**WanderLust** is a full-stack web application that allows users to list, discover, and review vacation rental properties. It replicates core Airbnb functionality including property listings with images, user authentication, a review/rating system, interactive maps, category filtering, search, and price-based filtering.

### What it does
- Users can **sign up**, **log in**, and **manage their own property listings**
- Each listing supports **image upload** (stored on Cloudinary), **geolocation** (via OpenStreetMap Nominatim), **pricing with GST breakdown**, and **categorization**
- Users can **search** listings by title/location/country, **filter** by category and price range
- A full **review and rating system** (1-5 stars) with denormalized rating caches on listings
- **Interactive Leaflet map** on each listing showing its exact location with a custom marker
- **Flash messages** for user feedback, **responsive design** via Bootstrap 5, and **Open Graph meta tags** for social sharing

---

## 2. Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Runtime** | Node.js (>=18) | Async I/O, JavaScript ecosystem |
| **Framework** | Express.js v5 | Minimal, flexible, native async error handling |
| **Database** | MongoDB + Mongoose | Schema flexibility for listings/reviews, geospatial queries |
| **Templating** | EJS + ejs-mate | Server-side rendering with layouts |
| **Authentication** | Passport.js (Local Strategy) | Battle-tested auth middleware |
| **Session Store** | connect-mongo (MongoDB) | Persistent sessions in the database |
| **Image Storage** | Cloudinary + multer-storage-cloudinary | CDN-backed image hosting with transforms |
| **Maps** | Leaflet.js + OpenStreetMap | Free, open-source interactive maps |
| **Geocoding** | Nominatim (OSM) — reusable `utils/geocode.js` with fallback |
| **Styling** | Bootstrap 5.3.3, Font Awesome 6, Starability CSS | Responsive UI, icons, star rating widgets |
| **Validation** | Joi | Schema-based request validation |
| **Deployment** | Render | Free tier Node.js hosting with Git integration |

---

## 3. Architecture & Folder Structure

```
WANDERLUST/
├── app.js                  # Entry point — Express setup, middleware, DB connection
├── schema.js               # Joi validation schemas (listing, review)
├── middleware.js            # Auth, authorization, validation middleware
├── package.json
├── .env / .env.example
│
├── config/
│   └── cloudConfig.js      # Cloudinary + multer storage config
│
├── models/
│   ├── listing.js          # Listing schema (title, price, image, geometry, reviews[], owner)
│   ├── review.js           # Review schema (rating, comment, author)
│   └── user.js             # User schema (passport-local-mongoose plugin)
│
├── controllers/
│   ├── listings.js         # CRUD logic for listings + geocoding
│   ├── reviews.js          # Create/delete reviews + rating cache update
│   └── users.js            # Signup, login, logout
│
├── routes/
│   ├── listing.js          # /listings routes with multer upload middleware
│   ├── review.js           # /listings/:id/reviews routes (mergeParams)
│   └── user.js             # /signup, /login, /logout
│
├── views/
│   ├── layouts/boilerplate.ejs    # Master layout (Bootstrap, Leaflet, OG tags)
│   ├── includes/navbar.ejs        # Sticky navbar with search bar
│   ├── includes/footer.ejs        # Site footer with social links
│   ├── includes/flash.ejs         # Flash message alerts
│   ├── error.ejs                  # Custom error page
│   ├── listings/
│   │   ├── index.ejs              # Browse page — category bar, filters, card grid
│   │   ├── show.ejs               # Detail page — image, reviews, map
│   │   ├── new.ejs                # Create listing form
│   │   └── edit.ejs               # Edit listing form
│   └── users/
│       ├── signup.ejs
│       └── login.ejs
│
├── public/
│   ├── css/style.css              # Custom styles
│   ├── css/rating.css             # Starability rating CSS
│   ├── js/script.js               # Bootstrap validation, GST toggle
│   └── js/map.js                  # Leaflet map initialization
│
├── init/
│   ├── data.js                    # 12 sample listings across all categories
│   ├── seed.js                    # Seeds users + listings into DB
│   ├── seedReviews.js             # Seeds reviews + recalculates rating caches
│   └── migrateRatings.js          # One-time migration for denormalized ratings
│
├── utils/
│   ├── geocode.js               # Nominatim geocoding with Jaipur fallback
│   ├── wrapAsync.js               # Async error wrapper for route handlers
│   └── ExpressError.js            # Custom error class with statusCode
│
└── uploads/                       # Local upload fallback (gitignored)
```

### Architectural Pattern: MVC

The project follows the **Model-View-Controller** pattern:
- **Models** define Mongoose schemas and business logic (e.g., cascade delete middleware)
- **Controllers** handle request/response logic, database queries, and redirects
- **Routes** map HTTP methods to controllers with middleware chains
- **Views** are EJS templates rendered by controllers

This separation makes the codebase testable, maintainable, and scalable.

---

## 4. Core Features

### 4.1 Property Listings (Full CRUD)
- **Create**: Form with title, description, image upload, price, location, country, category
- **Read**: Browse all listings with filters; view individual listing with map, reviews, GST
- **Update**: Edit form pre-populated with existing data; optional image replacement
- **Delete**: Owner-only delete with cascade removal of associated reviews

### 4.2 Image Upload (Cloudinary)
- Multer intercepts `multipart/form-data` uploads
- `multer-storage-cloudinary` streams files directly to Cloudinary CDN
- Images stored in environment-specific folders (`wanderlust_prod` / `wanderlust_DEV`)
- Fallback to default Unsplash images if no upload provided
- Image setter in Mongoose model handles `null`/empty string values

### 4.3 Interactive Maps (Leaflet + GeoJSON)
- Each listing stores GeoJSON `Point` geometry (longitude, latitude)
- On creation, the location address is geocoded via Nominatim (OpenStreetMap)
- Fallback to Jaipur coordinates if geocoding fails
- Show page renders a Leaflet map centered on the listing with a custom red house marker
- Popup displays listing image, title, location, price, and GST-inclusive total

### 4.4 Search & Filtering
- **Text search**: Regex-based search across `title`, `location`, and `country` fields (case-insensitive)
- **Category filter**: Horizontal scrollable bar with 11 categories (Trending, Rooms, Mountains, Castles, etc.)
- **Price range**: Min/max price inputs with INR formatting
- **Combined filters**: All filters work together via query parameters (`?q=...&category=...&minPrice=...&maxPrice=...`)
- **Active filter badges**: Show applied filters with individual remove buttons and "Clear all"

### 4.5 Review & Rating System
- Logged-in users can submit reviews with 1-5 star rating (using Starability CSS) and a comment
- **Rating cache**: `averageRating` and `reviewCount` denormalized on the Listing document for fast reads
- **Rating breakdown**: Show page displays a bar chart of 1-5 star distribution
- Review authors can delete their own reviews
- Cascade cleanup: Deleting a listing removes all its reviews

### 4.6 GST Price Calculator
- Client-side JavaScript calculates 18% GST on listing prices
- Toggle button on cards and show page reveals price breakdown: Base + 18% GST = Total
- INR formatting via `toLocaleString('en-IN')`

### 4.7 Flash Messages
- Server-side flash messages via `connect-flash`
- Success (green) and error (red) alerts rendered as Bootstrap dismissible alerts
- Used for auth feedback, CRUD operations, validation errors

### 4.8 Responsive Design
- Bootstrap 5.3.3 grid system for card layouts (3-column on desktop, 1 on mobile)
- Sticky navbar with collapsible hamburger menu
- Horizontally scrollable category bar on mobile
- Footer with social media links

### 4.9 Social Sharing (Open Graph)
- `boilerplate.ejs` includes OG and Twitter Card meta tags
- Dynamic title and description per page
- Share image defaults to the site's branding

---

## 5. Authentication & Authorization

### Authentication (Passport.js)
- **Strategy**: `passport-local` with `passport-local-mongoose` plugin
- Passwords are hashed and salted automatically by the plugin
- Session-based auth stored in MongoDB via `connect-mongo`
- Auto-login after signup via `req.login()`

### Authorization (Middleware)
Three layers of authorization:

1. **`isLoggedIn`** — Checks `req.isAuthenticated()`. If not logged in, saves the attempted URL to session and redirects to `/login`.

2. **`isOwner`** — Compares `listing.owner` with `currUser._id`. Only the listing creator can edit/delete.

3. **`isReviewAuthor`** — Compares `review.author` with `currUser._id`. Only the review author can delete their review.

### Session Configuration
- Cookie expires after 7 days
- `httpOnly: true` prevents XSS access to session cookie
- `secure: true` in production (HTTPS only)
- `sameSite: "lax"` for CSRF protection
- `trust proxy: 1` for Render's reverse proxy

---

## 6. Database Design

### Listing Schema
```javascript
{
  title: String,          // required
  description: String,
  image: {
    url: String,          // Cloudinary URL with default fallback
    filename: String      // Cloudinary public ID
  },
  price: Number,          // min: 0
  location: String,
  country: String,
  category: String,       // enum: 11 categories, default: "Rooms"
  averageRating: Number,  // denormalized, default: 0
  reviewCount: Number,    // denormalized, default: 0
  reviews: [ObjectId → Review],  // references
  owner: ObjectId → User,        // reference
  geometry: {                      // GeoJSON Point
    type: "Point",
    coordinates: [longitude, latitude]
  }
}
```

### Review Schema
```javascript
{
  comment: String,
  rating: Number,         // min: 1, max: 5
  createdAt: Date,        // default: Date.now
  author: ObjectId → User // reference
}
```

### User Schema
```javascript
{
  email: String,          // required
  username: String,       // added by passport-local-mongoose
  hash: String,           // added by passport-local-mongoose (password hash)
  salt: String            // added by passport-local-mongoose
}
```

### Key Design Decisions
- **Denormalized ratings** (`averageRating`, `reviewCount` on Listing) — Avoids expensive aggregation queries on every page load. Updated via `updateListingRatingCache()` on review create/delete.
- **GeoJSON geometry** — Enables future geospatial queries (find listings near me) via MongoDB's `$geoNear`.
- **Embedded review references** — `reviews[]` array on Listing for quick access, with cascade delete middleware for cleanup.

---

## 7. API Routes

### Listings
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/listings` | Public | Browse all listings with search/filter |
| GET | `/listings/new` | Logged in | Render create form |
| POST | `/listings` | Logged in | Create new listing (with image upload) |
| GET | `/listings/:id` | Public | View listing details + reviews + map |
| GET | `/listings/:id/edit` | Owner | Render edit form |
| PUT | `/listings/:id` | Owner | Update listing (with optional image) |
| DELETE | `/listings/:id` | Owner | Delete listing + cascade reviews |

### Reviews
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/listings/:id/reviews` | Logged in | Add review to listing |
| DELETE | `/listings/:id/reviews/:reviewId` | Review author | Delete review |

### Users
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/signup` | Public | Render signup form |
| POST | `/signup` | Public | Register new user + auto-login |
| GET | `/login` | Public | Render login form |
| POST | `/login` | Public | Authenticate + redirect |
| GET | `/logout` | Logged in | Destroy session + redirect |

---

## 8. Key Implementations

### 8.1 Geocoding Utility (Reusable)
```javascript
// utils/geocode.js
const FALLBACK_COORDS = [75.7873, 26.9124]; // Jaipur

async function geocode(address) {
    if (!address || typeof address !== "string" || address.trim() === "") {
        return FALLBACK_COORDS;
    }
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address.trim())}&limit=1`,
            { headers: { "User-Agent": "Wanderlust_Student_Project" } }
        );
        const data = await response.json();
        if (data && data.length > 0) {
            return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
        }
    } catch (err) {
        console.log("Geocoding failed, using default coordinates:", err.message);
    }
    return FALLBACK_COORDS;
}
```
- Reusable `geocode(address)` function used by both create and update flows
- Returns `[longitude, latitude]` on success, Jaipur fallback on failure
- Handles null/empty addresses, API errors, and invalid locations (e.g., "Asgard")
- Sends `User-Agent` header as required by Nominatim's usage policy

**Create flow** (`controllers/listings.js`):
```javascript
const coordinates = await geocode(req.body.listing.location);
newListing.geometry = { type: "Point", coordinates };
```

**Update flow** — re-geocodes when location is changed:
```javascript
if (req.body.listing.location) {
    const coordinates = await geocode(req.body.listing.location);
    listing.geometry = { type: "Point", coordinates };
    await listing.save();
}
```

### 8.2 Denormalized Rating Cache
```javascript
// controllers/reviews.js — updateListingRatingCache
async function updateListingRatingCache(listingId) {
    const listing = await Listing.findById(listingId).populate("reviews");
    if (listing.reviews.length > 0) {
        const sum = listing.reviews.reduce((acc, r) => acc + r.rating, 0);
        listing.averageRating = parseFloat((sum / listing.reviews.length).toFixed(1));
        listing.reviewCount = listing.reviews.length;
    } else {
        listing.averageRating = 0;
        listing.reviewCount = 0;
    }
    await listing.save();
}
```
- Called after every review create/delete
- Avoids $group aggregation on every listing page load
- Stored as `averageRating` (1 decimal) and `reviewCount` on the Listing document

### 8.3 Cascade Review Cleanup
```javascript
// models/listing.js — post middleware
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});
```
- Triggered automatically when a listing is deleted via `findByIdAndDelete`
- Removes all associated Review documents from the database

### 8.4 Regex Injection Prevention
```javascript
// controllers/listings.js — index
const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const regex = new RegExp(escaped, "i");
```
- User search input is escaped before creating a RegExp
- Prevents ReDoS (Regular Expression Denial of Service) attacks

### 8.5 Image Setter with Fallback
```javascript
// models/listing.js
image: {
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-...",
        set: (v) => (!v || v === "") 
            ? "https://images.unsplash.com/photo-..." 
            : v,
    }
}
```
- Handles `null`, `undefined`, and empty string values
- Ensures every listing always has a displayable image

---

## 9. Challenges Faced & Solutions

### Challenge 1: Express 5 Async Error Handling
**Problem**: Express 5 handles async errors natively, but older middleware patterns (try/catch in every route) made the code verbose and error-prone.

**Solution**: Used `wrapAsync` utility to wrap async route handlers. Express 5's native handling serves as a safety net. This reduced boilerplate while maintaining reliability.

### Challenge 2: Geocoding Reliability
**Problem**: The Nominatim API could fail due to network issues, rate limiting, or invalid addresses — crashing the listing creation flow. Additionally, editing a listing's location did not update its map coordinates.

**Solution**: Extracted geocoding into a reusable `utils/geocode.js` utility with try/catch and a fallback to default coordinates (Jaipur, India). Added re-geocoding in the update flow so changing a location updates the map. The utility handles null/empty addresses, API failures, and fake locations gracefully.

### Challenge 3: Rating Consistency
**Problem**: Computing average ratings via aggregation on every page load is expensive. But denormalized ratings can drift out of sync.

**Solution**: Implemented a `updateListingRatingCache()` function that recalculates and saves ratings on every review create/delete. Created a `migrateRatings.js` script to backfill any inconsistencies.

### Challenge 4: Image Upload Edge Cases
**Problem**: Users could submit empty image fields, `null` values, or no file at all — causing display issues.

**Solution**: Added a Mongoose `set` validator on `image.url` that replaces falsy values with a default Unsplash URL. The `new.ejs` form shows a preview of the default image when no file is selected.

### Challenge 5: Session Persistence Across Restarts
**Problem**: Default Express sessions are stored in memory and lost on server restart (e.g., Render dyno cycling).

**Solution**: Used `connect-mongo` to store sessions in the same MongoDB Atlas cluster. Sessions survive server restarts and are automatically cleaned up after 7 days.

### Challenge 6: Reverse Proxy Headers
**Problem**: Render uses a reverse proxy. Without proper configuration, `req.protocol` and `req.hostname` are wrong, breaking session cookies and redirects.

**Solution**: Added `app.set('trust proxy', 1)` so Express correctly reads `X-Forwarded-*` headers from the proxy.

### Challenge 7: Search Input Validation
**Problem**: User input was being used directly in `new RegExp()` — a ReDoS vulnerability. Malicious input could freeze the server.

**Solution**: Escaped all special regex characters in user input before constructing the RegExp object.

### Challenge 8: CORS and Image Loading
**Problem**: Cloudinary images require proper URL handling. Broken image URLs would show ugly broken-image icons.

**Solution**: The image `set` validator ensures all listings have valid image URLs. Cloudinary URLs are constructed by the storage engine and are always valid CDN links.

---

## 10. Security Measures

| Measure | Implementation |
|---------|---------------|
| **Password Hashing** | passport-local-mongoose (automatic salt + hash) |
| **Session Security** | `httpOnly`, `secure` (prod), `sameSite: "lax"` cookies |
| **Env Validation** | Throws if `SECRET`/`DB_URL` missing in production |
| **Input Validation** | Joi schemas for listings and reviews |
| **Regex Injection Prevention** | Special characters escaped before RegExp construction |
| **Authorization** | Owner-only edit/delete; author-only review delete |
| **Flash Messages** | User-friendly error feedback without exposing internals |
| **.env in .gitignore** | Secrets not committed to version control |

### Known Security Gaps (Not Yet Implemented)
- No rate limiting (add `express-rate-limit`)
- No CSRF protection (add `csrf-sync`)
- No security headers (add `helmet`)
- Logout via GET instead of POST
- No XSS sanitization on user-generated content

---

## 11. Deployment Process

### Platform: Render (Free Tier)

**Steps:**
1. Push code to GitHub (`.env` is gitignored)
2. Create new Web Service on Render, connect GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in Render dashboard:
   - `NODE_ENV=production`
   - `DB_URL` (MongoDB Atlas connection string)
   - `SECRET` (random session secret)
   - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`
6. Ensure MongoDB Atlas allows connections from `0.0.0.0/0`
7. Seed database: Run seed commands via Render Shell

**Key Deployment Considerations:**
- Render uses a reverse proxy — `trust proxy: 1` is required
- Free tier dynos sleep after inactivity — first request may be slow
- `.env` is never deployed; all secrets must be in Render dashboard
- MongoDB Atlas network access must whitelist all IPs for Render

---

## 12. Interview Talking Points

### "Tell me about this project"

> WanderLust is a full-stack vacation rental platform — essentially an Airbnb clone — built with Node.js, Express, MongoDB, and EJS. It supports full CRUD operations for property listings with cloud-based image storage on Cloudinary, interactive Leaflet maps with geocoding via OpenStreetMap, a review and rating system with denormalized caching, and advanced filtering by category, price range, and text search. I deployed it on Render with MongoDB Atlas as the database.

### "What was the most challenging part?"

> **Rating consistency with denormalized data.** I wanted fast reads on the listings page, so I denormalized `averageRating` and `reviewCount` onto the Listing document. The challenge was keeping these in sync when reviews are created or deleted. I solved this by creating a `updateListingRatingCache()` function that recalculates from the actual reviews array on every mutation, and built a migration script to backfill any inconsistencies.

### "How did you handle authentication?"

> I used Passport.js with the Local Strategy and `passport-local-mongoose` plugin, which handles password hashing and salting automatically. Sessions are stored in MongoDB via `connect-mongo` so they persist across server restarts. I implemented three authorization layers: `isLoggedIn` for protected routes, `isOwner` for listing edit/delete, and `isReviewAuthor` for review deletion.

### "How did you handle file uploads?"

> I used Multer with `multer-storage-cloudinary`. When a user submits the create/edit form with `enctype="multipart/form-data"`, Multer intercepts the file and streams it directly to Cloudinary's CDN. The returned URL and filename are stored in the listing document. I also added a Mongoose `set` validator that falls back to a default Unsplash image if no file is provided.

### "How does the search and filtering work?"

> The index controller reads query parameters (`q`, `category`, `minPrice`, `maxPrice`) and builds a MongoDB filter object dynamically. Text search uses case-insensitive regex on `title`, `location`, and `country` fields — with special characters escaped to prevent ReDoS attacks. Category and price filters are applied as additional conditions. All filters combine via `$or` and `$and` operators.

### "What would you improve next?"

> 1. **Security**: Add rate limiting, CSRF protection, and security headers (helmet)
> 2. **Performance**: Add MongoDB text indexes for search instead of regex
> 3. **Testing**: Write unit and integration tests with Jest/Supertest
> 4. **Features**: Add pagination, wishlists, user profiles, and booking functionality
> 5. **Frontend**: Migrate to React/Next.js for a SPA experience with better UX

### "Why did you choose this tech stack?"

> - **Express + EJS**: Fast to prototype, server-side rendering is SEO-friendly, good for a portfolio project
> - **MongoDB**: Flexible schema for listings with varying fields, native geospatial query support
> - **Cloudinary**: Free tier handles image optimization, CDN delivery, and transformations
> - **Leaflet + OSM**: Free alternative to Google Maps API (no credit card required)
> - **Passport**: Industry-standard auth with extensive middleware ecosystem

### Key Metrics to Mention
- **12 seed listings** across 11 categories with global locations
- **3 demo user accounts** with role-based access
- **Full CRUD** with authorization checks on every mutation
- **30+ bugs fixed** during development (crash bugs, security, logic, deployment)
- **Zero dependencies on paid APIs** (free tier Cloudinary, OSM, Render, MongoDB Atlas)
