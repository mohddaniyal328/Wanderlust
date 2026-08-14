<div align="center">

# WanderLust

**A full-stack vacation rental platform inspired by Airbnb — list properties, book stays, leave reviews, and explore with interactive maps.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit-brightgreen?style=for-the-badge)](https://wanderlust-2-aeji.onrender.com)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## Live Demo

**https://wanderlust-2-aeji.onrender.com**

### Test Accounts

| Username | Password |
|----------|----------|
| `demo` | `741` |
| `demo2` | `741` |
| `demo3` | `741` |
| `alice` | `741` |
| `bob` | `741` |

---

## Features

### Core
- **97 listings** across 11 categories with images, pricing, and geocoded locations
- **Full CRUD** — create, edit, delete listings (owner-only)
- **Image uploads** — Cloudinary CDN with fallback to default images
- **Interactive maps** — Leaflet.js + OpenStreetMap with custom markers
- **Review & rating system** — 1-5 star ratings with denormalized rating cache

### Search & Discovery
- **Text search** — search by title, location, or country
- **Category filter** — 11 categories (Trending, Rooms, Mountains, Castles, etc.)
- **Price range filter** — min/max price with INR formatting
- **Server-side pagination** — 6 items per page, filter-aware
- **GST price calculator** — toggle 18% GST breakdown on cards

### User Features
- **Wishlists** — save/unsave listings with heart icon
- **Booking system** — date pickers, availability checking, price calculation
- **My Listings** — dashboard of your created properties
- **My Bookings** — view all reservations with status tracking
- **Flash messages** — real-time feedback for all actions

### Security & Quality
- **Authentication** — Passport.js with password hashing
- **Authorization** — owner-only edit/delete, author-only review delete
- **Rate limiting** — auth (10/15min), listings (20/15min), reviews (10/15min)
- **Input validation** — Joi schemas for listings and reviews
- **NoSQL injection prevention** — mongo-sanitize on all request data
- **Regex injection prevention** — special characters escaped in search input
- **Self-booking prevention** — owners cannot book their own listings
- **Past date rejection** — booking dates validated server-side + client-side

### Responsive Design
- **3-tier breakpoints** — phones (≤576px), tablets (≤768px), desktops (≥992px)
- Bootstrap 5.3.3 grid with responsive column classes across all pages
- Collapsible navbar with full-width search on mobile
- Listing grid: 1 col → 2 cols → 3 cols → 4 cols

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js 5 |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Authentication** | Passport.js + passport-local-mongoose |
| **File Uploads** | Multer + Cloudinary |
| **Maps** | Leaflet.js + OpenStreetMap + Photon Geocoding |
| **Templating** | EJS + ejs-mate |
| **Frontend** | Bootstrap 5.3.3, Font Awesome 6, Custom CSS |
| **Session Store** | connect-mongo (MongoDB-backed) |
| **Validation** | Joi |
| **Security** | Helmet, express-rate-limit, mongo-sanitize |
| **Deployment** | Render |

---

## Project Structure

```
WanderLust/
├── app.js                  # Express server, middleware, DB connection
├── schema.js               # Joi validation schemas
├── middleware.js            # Auth, authorization, validation middleware
├── config/
│   └── cloudConfig.js      # Cloudinary + Multer config
├── models/
│   ├── listing.js          # Listing schema (title, price, image, geometry, reviews[])
│   ├── review.js           # Review schema (rating, comment, author)
│   ├── booking.js          # Booking schema (dates, status, price)
│   └── user.js             # User schema with wishlists array
├── controllers/
│   ├── listings.js         # CRUD + pagination + wishlist + bookings
│   ├── reviews.js          # Review CRUD + rating recalculation
│   └── users.js            # Signup, login, logout
├── routes/
│   ├── listing.js          # Listing routes + wishlist + booking
│   ├── review.js           # Review routes (mergeParams)
│   └── user.js             # Auth routes
├── views/                  # EJS templates
├── public/                 # Static assets (CSS, JS)
├── init/                   # Seed scripts (97 listings, 5 users, 146 reviews)
├── utils/                  # Geocoding & error utilities
└── uploads/                # Local upload fallback (gitignored)
```

---

## API Routes

### Listings
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/listings` | Public | Browse with search/filter/pagination |
| GET | `/listings/new` | Logged in | Create form |
| POST | `/listings` | Logged in | Create listing |
| GET | `/listings/:id` | Public | Listing details |
| GET | `/listings/:id/edit` | Owner | Edit form |
| PUT | `/listings/:id` | Owner | Update listing |
| DELETE | `/listings/:id` | Owner | Delete listing |
| GET | `/listings/my-listings` | Logged in | User's listings |

### Wishlists
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/listings/:id/wishlist` | Logged in | Toggle wishlist |
| GET | `/listings/wishlists` | Logged in | View wishlists |

### Bookings
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/listings/:id/book` | Logged in | Create booking |
| GET | `/listings/my-bookings` | Logged in | View bookings |
| POST | `/listings/bookings/:bookingId/cancel` | Logged in | Cancel booking |

### Reviews
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/listings/:id/reviews` | Logged in | Add review |
| DELETE | `/listings/:id/reviews/:reviewId` | Author | Delete review |

### Users
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/signup` | Public | Signup form |
| POST | `/signup` | Public | Register |
| GET | `/login` | Public | Login form |
| POST | `/login` | Public | Authenticate |
| GET | `/logout` | Logged in | Destroy session |

---

## Run Locally

```bash
git clone https://github.com/mohddaniyal328/Wanderlust.git
cd Wanderlust
npm install

# Create .env with:
# CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET
# SECRET, DB_URL

node init/seed.js
node init/seedReviews.js
set PORT=3030 && node app.js
```

---

## Key Metrics

- **97 listings** across 11 categories (global locations)
- **5 test accounts** with role-based access
- **146 reviews** with denormalized rating cache
- **12+ routes** with authorization middleware
- **3-tier responsive design** (phone, tablet, desktop)
- **Zero paid API dependencies** (free Cloudinary, OSM, Render, MongoDB Atlas)

---

## What I Learned

- Full-stack MVC architecture with Express.js
- MongoDB schema design with relationships and denormalized caching
- Authentication/Authorization with Passport.js
- Cloud file uploads with Cloudinary + Multer
- Geocoding integration with OpenStreetMap
- Server-side pagination and search
- Production deployment on Render
- Security: rate limiting, input validation, injection prevention

---

<div align="center">

**Built with care**

</div>
